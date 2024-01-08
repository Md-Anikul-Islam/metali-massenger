<template>
  <div class="chat-panel">
    <div class="header">
      <h2>{{ selectedFriend.first_name }}</h2>
    </div>
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message">
        <span class="message-sender">{{ message.sender }}</span>
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div class="message-input">
      <input v-model="newMessage" placeholder="Type your message..." />
      <button @click="sendMessage" :disabled="newMessage === ''">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedFriend: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messages: [], // Assuming you have a data structure for messages
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      // Assuming you have a method to send messages
      // Update this method based on your actual implementation
      const newMessageObj = {
        id: Date.now(),
        sender: 'You', // or the user's name
        content: this.newMessage,
      };
      this.messages.push(newMessageObj);
      this.newMessage = '';

      // Here you can send the message to your backend or perform any other actions
    },
  },
};
</script>

<style scoped>
.chat-panel {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.messages {
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.message-sender {
  font-weight: bold;
  margin-right: 5px;
}

.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
