<template>
  <transition name="fade">
    <section class="h-screen w-full relative flex justify-center items-center">

      <!-- Overlay transparan -->
      <div class="absolute inset-0 z-0 bg-black/10"></div>

      <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-bold z-10 text-center">
        <span class="text-gray-300">Setting [The feature is not available yet]</span>
      </p>

      <!-- Elemen disable -->
      <div class="relative z-5 flex flex-col gap-4 w-64 opacity-50 pointer-events-none">

        <!-- Profile placeholder -->
        <div class="flex items-center gap-2 bg-gray-200 p-2 rounded-lg">
          <i class="fas fa-user-circle text-2xl text-gray-400"></i>
          <div class="flex flex-col">
            <span class="font-semibold text-gray-500 text-sm">John Doe</span>
            <span class="text-xs text-gray-400">johndoe@example.com</span>
          </div>
        </div>

        <!-- Form fields -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 bg-gray-200 p-1.5 rounded-lg">
            <i class="fas fa-user text-gray-400 text-sm"></i>
            <input type="text" placeholder="Username" class="w-full bg-transparent border-none text-sm text-gray-500" disabled/>
          </div>
          <div class="flex items-center gap-2 bg-gray-200 p-1.5 rounded-lg">
            <i class="fas fa-envelope text-gray-400 text-sm"></i>
            <input type="email" placeholder="Email" class="w-full bg-transparent border-none text-sm text-gray-500" disabled/>
          </div>
          <div class="flex items-center gap-2 bg-gray-200 p-1.5 rounded-lg">
            <i class="fas fa-palette text-gray-400 text-sm"></i>
            <select class="w-full bg-transparent border-none text-sm text-gray-500" disabled>
              <option>Theme</option>
            </select>
          </div>
        </div>

        <!-- Save button -->
        <button class="w-full p-1.5 rounded-lg bg-blue-400 text-white text-sm cursor-not-allowed" disabled>
          <i class="fas fa-save mr-1"></i> Save Changes
        </button>

      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Setting',
}
</script>

<style>
/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
