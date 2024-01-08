import { createRouter, createWebHistory } from "vue-router";
import FriendList from "@/components/FriendList.vue";
import LoginUser from "@/components/LoginUser.vue";

const routes = [
  {
    name: 'FriendList',
    component: FriendList,
    path: '/friends',
    meta: { requiresAuth: true },
  },
  {
    name: 'LoginUser',
    component: LoginUser,
    path: '/',
    meta: { requiresGuest: true }, // Add meta information for the login route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      next();
    } else {
      next('/');
    }
  } else if (to.meta.requiresGuest) {
    const authToken = localStorage.getItem('auth-token');
    if (!authToken) {
      next();
    } else {
      next('/friends'); // Redirect to the FriendList page if already logged in
    }
  } else {
    // Route does not require authentication or guest status, proceed
    next();
  }
});

export default router;
