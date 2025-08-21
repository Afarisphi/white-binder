<template>
  <div
    ref="container"
    class="landing-container h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory overscroll-contain"
  >
    <!-- scroll animation -->
    <div
      v-if="currentSection < sectionEls.length - 1"
      class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-2 text-gray-400"
    >
      <span class="text-xs animate-pulse">Scroll</span>
      <i class="fas fa-angle-down text-xl animate-bounce"></i>
    </div>

    <!-- Hero Section -->
    <section class="h-screen relative flex items-center justify-center text-center px-6 snap-start snap-always">
      <!-- Video Background -->
      <video
        src="/videos/node_background.mp4"
        autoplay
        muted
        loop
        playsinline
        class="absolute inset-0 w-full h-full object-cover z-0"
      ></video>

      <!-- Konten -->
      <div
        :ref="setAnimRefs"
        class="relative z-10 opacity-0 translate-y-10 transition-all duration-700"
      >
        <!-- Title + Icon -->
        <h1 class="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <i class="fas fa-link text-blue-500"></i>
          White Binder
          <i class="fas fa-shield-alt text-green-500"></i>
        </h1>

        <!-- Decorative Divider -->
        <div class="flex items-center justify-center gap-3 text-gray-500 mb-6">
          <span class="h-[1px] w-16 bg-gray-600"></span>
          <i class="fas fa-circle text-[6px]"></i>
          <i class="fas fa-circle text-[6px]"></i>
          <i class="fas fa-circle text-[6px]"></i>
          <span class="h-[1px] w-16 bg-gray-600"></span>
        </div>

        <!-- Description -->
        <p class="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
          <i class="fas fa-search text-blue-400 mr-2"></i>
          <span class="font-semibold">Analyze Wallets:</span>  
          Enter any crypto wallet address and let <span class="text-blue-400 font-medium">White Binder</span>  
          reveal transaction histories, suspicious activities, and potential risks in just seconds.
        </p>

        <!-- CTA Button -->
        <router-link
          to="/home"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl 
                text-lg font-semibold transition flex items-center justify-center gap-2 
                mx-auto w-fit shadow-lg group hover:shadow-blue-600/40 hover:shadow-green-600/40 duration-300"
        >
          <i class="fas fa-rocket group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
          Get Started
        </router-link>
      </div>
    </section>



    <!-- about Section -->
    <section class="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 snap-start snap-always">
      <div class="max-w-6xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6">
    
        <!-- Teks Kiri -->
        <div :ref="setAnimRefs" class="opacity-0 -translate-x-5 transition-all duration-700 max-w-xl">
          <h2 class="text-2xl font-bold mb-6 text-white">Why White Binder?</h2>

          <ul class="space-y-4">
            <li class="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 transition">
              <i class="fas fa-exclamation-triangle text-blue-400 w-5 h-5 mt-1 shrink-0"></i>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-blue-400 leading-snug">Rising Challenge</h3>
                <p class="text-sm text-gray-300 leading-relaxed">
                  The rise of online gambling using cryptocurrencies poses a challenge for regulators and the public.
                </p>
              </div>
            </li>

            <li class="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 transition">
              <i class="fas fa-tools text-green-400 w-5 h-5 mt-1 shrink-0"></i>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-green-400 leading-snug">Limited Tools</h3>
                <p class="text-sm text-gray-300 leading-relaxed">
                  Unfortunately, there are limited open tools to analyze wallet transactions and detect suspicious patterns.
                </p>
              </div>
            </li>

            <li class="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 transition">
              <i class="fas fa-lightbulb text-yellow-400 w-5 h-5 mt-1 shrink-0"></i>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-yellow-400 leading-snug">Our Solution</h3>
                <p class="text-sm text-gray-300 leading-relaxed">
                  White Binder was created to fill this gap by providing a transparent, open-source solution for blockchain investigation.
                </p>
              </div>
            </li>
          </ul>
        </div>


    <!-- Ilustrasi/Ikon Kanan -->
    <div :ref="setAnimRefs" class="opacity-0 translate-x-[20px] transition-all duration-700 flex justify-center">
      <div class="bg-gray-800 rounded-2xl shadow-lg p-8 w-72 h-72 flex flex-col items-center justify-center border border-gray-700">
        <i class="fas fa-network-wired text-6xl text-blue-400 mb-4"></i>
        <p class="text-gray-400 text-center">
          Visualize wallet connections in real time to uncover hidden patterns.
        </p>
      </div>
    </div>

  </div>
</section>


    <!-- Features Section -->
<section class="h-screen flex items-center justify-center text-center px-6 bg-gray-800 snap-start snap-always">
  <div :ref="setAnimRefs" class="w-full max-w-6xl opacity-0 translate-y-10 transition-all duration-700">
    <h2 class="text-3xl font-bold mb-10">Key Features</h2>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      <!-- Wallet Analytics -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-wallet text-4xl text-blue-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Wallet Analytics</h3>
        <p class="text-gray-400 text-sm">Analyze crypto wallets to detect gambling-related activities through transaction patterns.</p>
      </div>

      <!-- Graph Visualization -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-project-diagram text-4xl text-green-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Graph Visualization</h3>
        <p class="text-gray-400 text-sm">Explore wallet interconnections with interactive network graphs and clustering analysis.</p>
      </div>

      <!-- Risk Detection -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Risk Detection</h3>
        <p class="text-gray-400 text-sm">Automatically flag suspicious wallets with risk scoring (low, medium, high).</p>
      </div>

      <!-- Reports -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-file-alt text-4xl text-yellow-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Reports</h3>
        <p class="text-gray-400 text-sm">Generate detailed reports for institutions, regulators, and researchers.</p>
      </div>

      <!-- Modular Design -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-cubes text-4xl text-purple-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Modular Design</h3>
        <p class="text-gray-400 text-sm">Built modularly and ready to integrate real-time data from Ethereum and Tron.</p>
      </div>

      <!-- Open Source -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
        <i class="fas fa-code-branch text-4xl text-teal-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-3">Open Source</h3>
        <p class="text-gray-400 text-sm">Lightweight, customizable, and open for the public, researchers, and regulators.</p>
      </div>
      
    </div>
  </div>
</section>


    <!-- How It Works Section -->
    <section class="h-screen flex items-center justify-center text-center px-6 bg-gray-900 snap-start snap-always">
      <div :ref="setAnimRefs" class="max-w-5xl w-full opacity-0 translate-y-10 transition-all duration-700">
        <h2 class="text-3xl font-bold mb-10">How It Works</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
              1
            </div>
            <h3 class="text-xl font-semibold mb-2">Enter a Wallet</h3>
            <p class="text-gray-400 text-sm">Provide a wallet address to start the analysis process.</p>
          </div>

          <!-- Step 2 -->
          <div class="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
              2
            </div>
            <h3 class="text-xl font-semibold mb-2">Analyze Transactions</h3>
            <p class="text-gray-400 text-sm">Our system scans the wallet’s transactions and patterns.</p>
          </div>

          <!-- Step 3 -->
          <div class="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
              3
            </div>
            <h3 class="text-xl font-semibold mb-2">View Results</h3>
            <p class="text-gray-400 text-sm">Explore the network graph, risk scoring, and detailed reports.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="h-screen flex items-center justify-center text-center px-6 snap-start snap-always">
      <div :ref="setAnimRefs" class="opacity-0 translate-y-10 transition-all duration-700 max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Start Exploring Wallet Networks
        </h2>
        
        <p class="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Join <span class="text-white font-semibold">White Binder</span> and uncover the hidden connections 
          in blockchain transactions. Help build a safer, more transparent crypto ecosystem.
        </p>
        
        <router-link 
          to="/home" 
          class="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl 
                text-lg font-semibold text-white shadow-lg hover:shadow-blue-600/40 transition duration-300 group"
        >
          Get Started Now 
          <i class="fas fa-arrow-right transform transition-transform duration-300 group-hover:translate-x-1"></i>
        </router-link>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: 0,
      animRefs: [],
      sectionEls: [],
      isAnimating: false,
      lockMs: 700,

      // BARU:
      wheelBuffer: 0,          // akumulasi deltaY
      stepThreshold: 120,      // ambang (px) untuk satu langkah
      scrollEndTimer: null     // untuk mendeteksi scroll sudah berhenti
    }
  },
  methods: {
    setAnimRefs(el) { if (el) this.animRefs.push(el) },

    // Normalisasi delta agar konsisten antara mouse vs touchpad
    normalizeWheel(e, container) {
      let dy = e.deltaY
      if (e.deltaMode === 1) {        // by line
        dy *= 16                      // kira-kira 16px per line
      } else if (e.deltaMode === 2) { // by page
        dy *= container.clientHeight
      }
      return dy
    },

    scrollToSection(index) {
      if (index < 0 || index >= this.sectionEls.length) return
      this.currentSection = index
      this.isAnimating = true
      this.sectionEls[index].scrollIntoView({ behavior: 'smooth' })
      // kunci dibuka saat scroll benar-benar selesai (lihat handleContainerScroll)
      this.armScrollEnd()
    },

    // Debounce untuk mendeteksi "scroll end"
    armScrollEnd() {
      clearTimeout(this.scrollEndTimer)
      this.scrollEndTimer = setTimeout(() => {
        this.isAnimating = false
      }, 160) // 120–200ms nyaman; sesuaikan jika perlu
    },

    handleContainerScroll() {
      // setiap ada event scroll, tunda pelepasan kunci
      this.armScrollEnd()
    },

    handleWheel(e) {
      e.preventDefault()
      if (this.isAnimating) return

      const container = this.$refs.container
      const dy = this.normalizeWheel(e, container)
      this.wheelBuffer += dy

      if (Math.abs(this.wheelBuffer) >= this.stepThreshold) {
        const dir = this.wheelBuffer > 0 ? 1 : -1
        this.wheelBuffer = 0 // reset setelah ambang tercapai
        if (dir > 0) this.scrollToSection(this.currentSection + 1)
        else this.scrollToSection(this.currentSection - 1)
      }
    },

    handleKey(e) {
      const nextKeys = ['ArrowDown', 'PageDown', 'Space']
      const prevKeys = ['ArrowUp', 'PageUp']
      if (nextKeys.includes(e.code) || nextKeys.includes(e.key)) {
        e.preventDefault()
        if (!this.isAnimating) this.scrollToSection(this.currentSection + 1)
      } else if (prevKeys.includes(e.code) || prevKeys.includes(e.key) || (e.code === 'Space' && e.shiftKey)) {
        e.preventDefault()
        if (!this.isAnimating) this.scrollToSection(this.currentSection - 1)
      }
    }
  },
mounted() {
  const container = this.$refs.container
  this.sectionEls = Array.from(container.querySelectorAll('section'))

  // Wheel scroll handler
  container.addEventListener('wheel', this.handleWheel, { passive: false })
  container.addEventListener('scroll', this.handleContainerScroll, { passive: true })
  window.addEventListener('keydown', this.handleKey, { passive: false })

  // 👇 Tambahkan observer animasi
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10')
          entry.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    },
    { threshold: 0.2 } // 20% masuk viewport
  )

  this.animRefs.forEach((el) => observer.observe(el))
  },
  beforeUnmount() {
    const container = this.$refs.container
    if (container) {
      container.removeEventListener('wheel', this.handleWheel)
      container.removeEventListener('scroll', this.handleContainerScroll)
    }
    window.removeEventListener('keydown', this.handleKey)
  }
}
</script>

<style scoped>
.landing-container {
  scrollbar-width: none;      /* Firefox */
  -ms-overflow-style: none;   /* IE/Edge */
}
.landing-container::-webkit-scrollbar {
  display: none;              /* Chrome, Safari */
}
</style>
