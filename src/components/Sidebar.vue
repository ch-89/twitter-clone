<script setup>
import { ref } from 'vue';

const users = ref([
    { displayName: "Sailor Moon", photoURL: "/images/sailor.png" },
    { displayName: "Zelda", photoURL: "/images/zelda.png" },
    { displayName: "Harry Potter", photoURL: "/images/harry.png" },
])
</script>

<template>
    <div class="col-span-2 p-4 hidden md:flex flex-col gap-4">
        <div class="bg-gray-100 px-4 py-3 rounded-full text-gray-400 flex items-center gap-2">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search Twitter" class="flex-1 bg-transparent outline-none">
        </div>
        <div class="bg-gray-50 rounded-2xl">
            <header class="p-4 flex items-center justify-between">
                <h3 class="font-semibold">Trends for you</h3>
                <i class="fa-solid fa-gear text-blue-400"></i>
            </header>
            <div v-for="trend in ['Kalmar Slott', 'Ironman', 'Shopping']" class="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
                <div>
                    <p class="text-sm text-gray-400">Trending in Kalmar</p>
                    <h3 class="font-semibold">{{ trend }}</h3>
                </div>
                <button>
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <footer class="p-4 text-sm text-blue-400">Show more</footer>
        </div>
        <div class="bg-gray-50 rounded-2xl">
            <header class="p-4 font-semibold">Who to follow</header>
            <div v-for="{ displayName, photoURL } in users" :key="displayName" class="p-4 flex items-center gap-4">
                <img :src="photoURL" class="avatar">
                <div>
                    <h3 class="font-semibold">{{ displayName }}</h3>
                    <p class="text-sm text-gray-400">@handle</p>
                </div>
                <button class="bg-blue-400 text-white px-4 py-2 rounded-full text-xs font-semibold ml-auto">Follow</button>
            </div>
            <footer class="p-4 text-sm text-blue-400">Show more</footer>
        </div>
    </div>
</template>