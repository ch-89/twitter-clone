<script setup>
import { getAuth, signOut } from 'firebase/auth';

const links = [
    { path: "/", title: "Home", icon: "fa-solid fa-home" },
    { path: "/", title: "Explore", icon: "fa-solid fa-hashtag" },
    { path: "/", title: "Notifications", icon: "fa-regular fa-bell" },
    { path: "/", title: "Messages", icon: "fa-regular fa-envelope" },
    { path: "/", title: "Bookmarks", icon: "fa-regular fa-bookmark" },
    { path: "/", title: "Lists", icon: "fa-solid fa-clipboard-list" },
    { path: "/profile", title: "Profile", icon: "fa-regular fa-user" },
    { path: "/", title: "More", icon: "fa-solid fa-ellipsis" },
]

const { displayName, photoURL } = getAuth().currentUser
</script>

<template>
    <div class="col-span-2 p-4 hidden md:flex flex-col gap-4">
        <i class="fa-brands fa-twitter text-3xl text-blue-400 ml-3"></i>
        <nav>
            <a href="#" v-for="{ title, icon } in links" class="flex items-center gap-4 p-3 rounded-full hover:bg-gray-100 transition-colors">
                <i :class="icon" class="text-2xl fa-fw"></i>
                <p class="text-lg font-semibold">{{ title }}</p>
            </a>
        </nav>
        <button class="bg-blue-400 text-white p-3 rounded-full font-semibold">Tweet</button>
        <button @click="signOut(getAuth())" class="flex items-center gap-4 p-3 rounded-full hover:bg-gray-100 transition-colors mt-auto text-left">
            <img :src="photoURL" class="w-12 aspect-square rounded-full object-cover">
            <div>
                <h3 class="font-semibold">{{ displayName }}</h3>
                <p class="text-sm text-gray-400">@handle</p>
            </div>
            <i class="fa-solid fa-ellipsis ml-auto"></i>
        </button>
    </div>
</template>