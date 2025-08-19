<template>
  <div class="fixed inset-0 bg-[#0F1724] overflow-hidden">
    <!-- Canvas background -->
    <canvas ref="canvas" class="absolute inset-0 z-0"></canvas>

    <!-- Form Register -->
    <div class="fixed inset-0 z-10 flex items-center justify-center">
      <div class="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Register</h2>

        <form @submit.prevent="registerUser" class="space-y-4">
          <div class="w-full py-2">
            <label class="block text-sm text-gray-300 mb-1">Username</label>
            <input
              v-model="username"
              type="text"
              class="w-full px-4 py-2 rounded-md bg-gray-700 text-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter username"
            />
          </div>

          <div class="w-full py-2">
            <label class="block text-sm text-gray-300 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-2 rounded-md bg-gray-700 text-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            class="w-full px-4 py-2 text-lg flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white rounded-md font-semibold disabled:opacity-50"
            :disabled="isLoading"
          >
            <i v-if="isLoading" class="fa-solid fa-spinner fa-spin"></i>
            <span>{{ isLoading ? ' Registering...' : ' Register' }}</span>
          </button>
        </form>

        <!-- Feedback -->
        <p v-if="message" class="mt-4 text-sm text-center"
           :class="message.includes('success') ? 'text-gray-300' : 'text-red-400'">
          {{ message }}
        </p>

        <!-- Link ke Login -->
        <p class="mt-4 text-center text-sm text-gray-400">
          Already have an account?
          <router-link to="/login" class="text-blue-400 hover:underline">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import whitebinder from '@/dfinity/whitebinder.js'

const username = ref('')
const password = ref('')
const message = ref('')
const isLoading = ref(false)
const router = useRouter()
const canvas = ref(null)

async function registerUser() {
  if (!username.value || !password.value) {
    message.value = 'Username and password are required!!'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    const result = await whitebinder.register(username.value, password.value)

    if (result.toLowerCase().includes('success')) {
      message.value = 'Registration successful! Redirecting to login...'
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1500)
    } else {
      message.value = result
    }
  } catch (err) {
    console.error('Register Failed:', err)
    message.value = 'An error occurred during register.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  let particlesArray = []
  const mouse = { x: null, y: null, radius: 120 }

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  window.addEventListener('resize', () => {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    init()
  })

  function handleMouseMove(event) {
    mouse.x = event.x
    mouse.y = event.y
  }
  window.addEventListener('mousemove', handleMouseMove)

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x
      this.y = y
      this.dx = dx
      this.dy = dy
      this.size = size
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.fill()
    }
    update() {
      if (this.x > canvas.value.width || this.x < 0) this.dx = -this.dx
      if (this.y > canvas.value.height || this.y < 0) this.dy = -this.dy
      this.x += this.dx
      this.y += this.dy

      let dxMouse = this.x - mouse.x
      let dyMouse = this.y - mouse.y
      let dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
      if (dist < mouse.radius && mouse.x && mouse.y) {
        this.x += (dxMouse / dist) * 3
        this.y += (dyMouse / dist) * 3
      }

      this.draw()
    }
  }

  function init() {
    particlesArray = []
    let numberOfParticles = (canvas.value.width * canvas.value.height) / 9000
    for (let i = 0; i < numberOfParticles; i++) {
      let size = 2
      let x = Math.random() * (canvas.value.width - size * 2)
      let y = Math.random() * (canvas.value.height - size * 2)
      let dx = (Math.random() - 0.5) * 1.5
      let dy = (Math.random() - 0.5) * 1.5
      particlesArray.push(new Particle(x, y, dx, dy, size))
    }
  }

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distX = particlesArray[a].x - particlesArray[b].x
        let distY = particlesArray[a].y - particlesArray[b].y
        let distance = distX * distX + distY * distY
        if (distance < (canvas.value.width / 7) * (canvas.value.height / 7)) {
          ctx.strokeStyle = 'rgba(255,255,255,0.15)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
    }
    connect()
    requestAnimationFrame(animate)
  }

  init()
  animate()

  onBeforeUnmount(() => {
    window.removeEventListener('resize', init)
    window.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>
