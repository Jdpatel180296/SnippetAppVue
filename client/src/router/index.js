import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import addSnippet from "../components/addSnippet.vue";

const routes = [
  { path: "/", component: Register },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/profile/:id", component: Profile },
  { path: "/addSnippet", component: addSnippet },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
