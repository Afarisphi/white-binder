<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')   // hapus token auth
  router.push({ name: 'login' })     // redirect ke login
}
</script>

<template>
  <aside class="w-64 text-white p-4">
    <nav class="mt-4 space-y-2">
      <h1 class="px-4 py-2 text-base"><strong>White Binder</strong></h1>
      
      <router-link to="/" class="flex items-center px-2 py-1 text-base rounded">
        <i class="fa-solid fa-gauge text-white"></i>
        <span class="ml-2">Dashboard</span>
      </router-link>

      <router-link to="/wallets" class="flex items-center px-2 py-1 text-base rounded">
        <i class="fa-solid fa-wallet text-white"></i>
        <span class="ml-2">Wallets</span>
      </router-link>

      <router-link to="/summary" class="flex items-center px-2 py-1 text-base rounded">
        <i class="fa-solid fa-clipboard-list text-white"></i>
        <span class="ml-2">Summary</span>
      </router-link>

      <router-link to="/setting" class="flex items-center px-2 py-1 text-base rounded">
        <i class="fa-solid fa-gear text-white"></i>
        <span class="ml-2">Settings</span>
      </router-link>

      <!-- Tombol Logout -->
      <button
        @click="logout"
        class="flex items-center w-full text-left px-2 py-1 text-base rounded hover:bg-red-600 mt-4"
      >
        <i class="fa-solid fa-right-from-bracket text-white"></i>
        <span class="ml-2">Logout</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  background-color: #0F1724;
}
.active-link {
  background-color: #21334A; /* warna biru gelap */
  color: white;
}
i {
  padding-inline: 20px;
}
</style>
