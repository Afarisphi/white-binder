<template>
  <div class="flex h-screen">
    <!-- Splash screen with transition -->
    <transition name="fade" appear>
      <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1724]">
        <img src="/White_Binder.png" alt="Loading..."/>
      </div>
    </transition>

    <!-- Main content (tetap di-render, hanya disembunyikan sementara dengan v-show) -->
    <div v-show="!isLoading" class="flex flex-1">
      <Sidebar v-if="!$route.meta.hideSidebar"/>

      <main class="flex-1 text-white p-6 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    const splashAlreadyShown = localStorage.getItem('splashShown')

    if (splashAlreadyShown) {
      this.isLoading = false
    } else {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        localStorage.setItem('splashShown', 'true')
      }, 2000)
    }
  }
}
</script>

<style>
main {
  background-color: #0F1724;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>