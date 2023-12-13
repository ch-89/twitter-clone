<script setup>
import { getAuth } from 'firebase/auth';
import Tweet from './Tweet.vue';
import { ref } from 'vue';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, setDoc, where } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";

const { displayName, photoURL, uid } = getAuth().currentUser
const tweets = ref([])
const message = ref("")
const loading = ref(false)
const photo = ref(null)

const reader = new FileReader
reader.addEventListener("load", e => photo.value = reader.result)
const preview = e => reader.readAsDataURL(e.target.files[0])

const add = async e => {
    loading.value = true

    const docRef = doc(collection(getFirestore(), "tweets"))
    const photoRef = storageRef(getStorage(), docRef.id)

    await uploadString(photoRef, photo.value, "data_url")

    await setDoc(docRef, {
        uid,
        displayName,
        photoURL,
        message: message.value,
        photo: await getDownloadURL(photoRef),
        likes: [],
        timestamp: serverTimestamp()
    })

    message.value = ""
    photo.value = null
    loading.value = false
}

onSnapshot(
    query(
        collection(getFirestore(), "tweets"),
        orderBy("timestamp", "desc"),
        // where("uid", "==", uid)
    ),
    snapshot => tweets.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)
</script>

<template>
    <div class="md:col-span-3 overflow-auto scrollbar-hide">
        <header class="border-b p-4 flex items-center justify-between sticky top-0 z-10 bg-white/50 backdrop-blur-sm">
            <h3 class="font-semibold">Home</h3>
            <i class="fa-regular fa-star"></i>
        </header>
        <form @submit.prevent="add" class="border-b p-4 grid grid-cols-[auto_1fr] gap-4">
            <img :src="photoURL" class="avatar">
            <input v-model.trim="message" required placeholder="What's happening?" class="outline-none">
            <img :src="photo" v-if="photo" @click="photo = null" class="col-start-2 w-24 rounded-xl cursor-pointer">
            <div class="col-start-2 flex items-center gap-4 text-blue-400">
                <label class="cursor-pointer">
                    <i class="fa-regular fa-image"></i>
                    <input type="file" hidden required accept="image/*" @change="preview">
                </label>
                <button type="button">
                    <i class="fa-solid fa-film"></i>
                </button>
                <button type="button">
                    <i class="fa-regular fa-chart-bar"></i>
                </button>
                <button type="button">
                    <i class="fa-regular fa-smile"></i>
                </button>
                <button type="button">
                    <i class="fa-regular fa-calendar-alt"></i>
                </button>
                <button type="button">
                    <i class="fa-solid fa-location-dot"></i>
                </button>
                <button type="submit" :disabled="loading" :class="{ loading }" class="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold ml-auto">Tweet</button>
            </div>
        </form>
        <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </div>
</template>

<style scoped>
.loading {
    @apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
}
</style>