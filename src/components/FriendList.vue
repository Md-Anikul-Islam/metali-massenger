<template>
  <div class="friend-list-container">
    <div class="friend-list">
      <h1>Friend List</h1>
      <ul>
        <li v-for="friend in friends" :key="friend.id" @click="startChat(friend)">
          {{ friend.first_name }}
        </li>
      </ul>
      <p v-if="serverStatus === 'offline'" class="server-off-message">Server is currently offline.</p>
    </div>
    <chat-panel v-if="selectedFriend" :selectedFriend="selectedFriend" />
  </div>
</template>

<script>
import axios from 'axios';
import ChatPanel from './ChatPanel.vue';

export default {
  name: "FriendList",
  components: {
    ChatPanel,
  },
  data() {
    return {
      friends: [],
      selectedFriend: null,
      serverStatus: 'online', // Default to online
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    fetchFriends() {
      const baseURL = process.env.VUE_APP_API_BASE_URL;
      const friendsURL = `${baseURL}/friends`;
      axios.get(friendsURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      })
      .then(response => {
        this.friends = response.data.friends;
        this.serverStatus = 'online';
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
        this.serverStatus = 'offline';
      });
    },
    startChat(friend) {
      console.log(friend);
      this.selectedFriend = friend;
    },
  },
};
</script>

<style scoped>
.friend-list-container {
  display: flex;
}
.friend-list {
  width: 30%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  cursor: pointer;
}
li:hover {
  cursor: pointer;
}
.server-off-message {
  color: red;
  margin-top: 10px;
}
</style>
