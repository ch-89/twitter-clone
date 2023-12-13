<script setup>
import Navbar from './components/Navbar.vue';
import Feed from './components/Feed.vue';
import Sidebar from './components/Sidebar.vue';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const user = ref(null)

const login = e => signInWithPopup(getAuth(), new GoogleAuthProvider)

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <main v-if="user" class="max-w-6xl mx-auto grid h-screen md:grid-cols-7 md:divide-x text-gray-700">
    <Navbar/>
    <Feed/>
    <Sidebar/>
  </main>
  <div v-else class="bg-gray-50 h-screen grid place-items-center">
    <div class="bg-white p-8 w-96 rounded-2xl flex flex-col gap-8 shadow">
      <i class="fa-brands fa-twitter text-6xl text-blue-400 place-self-center"></i>
      <button @click="login" class="bg-blue-400 px-4 py-2 text-white rounded-md text-sm font-semibold">Login</button>
    </div>
  </div>
</template>

<style>
.avatar {
  @apply w-12 aspect-square rounded-full object-cover;
}
</style>