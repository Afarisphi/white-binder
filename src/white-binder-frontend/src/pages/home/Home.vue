<template>
  <div class="p-6 space-y-6">
    <h2 class="text-3xl font-bold text-white">Online Gambling On-Chain Analysis</h2>

    <!-- Form input wallet -->
    <section>
      <form @submit.prevent="analyzeWallet" class="flex flex-col sm:flex-row items-left gap-4">
        <input
          v-model="walletAddress"
          type="text"
          placeholder="Input wallet address"
          class="flex-1 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        />
        <button
            type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-base flex items-center justify-center gap-2"
            :disabled="isLoading"
          >
            <span>ANALYZE</span>
            <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
      </button>
      </form>
    </section>

    <!-- Summary -->
    <Transition name="fade-slide">

      <section v-if="summary">
        <h3 class="text-lg font-semibold text-white mb-2">Summary</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-gray-800 p-4 rounded-lg text-center">
            <p class="text-gray-400 text-sm">Total Volume</p>
            <p class="text-white text-xl font-bold">{{ summary.totalVolume }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg text-center">
            <p class="text-gray-400 text-sm">Transactions</p>
            <p class="text-white text-xl font-bold">{{ summary.totalTransactions }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg text-center">
            <p class="text-gray-400 text-sm">Low Risk</p>
            <p class="text-green-400 text-xl font-bold">{{ summary.lowRiskCount }}</p>
          </div>
          <div class="bg-gray-800 p-4 rounded-lg text-center">
            <p class="text-gray-400 text-sm">High Risk</p>
            <p class="text-red-400 text-xl font-bold">{{ summary.highRiskCount }}</p>
          </div>
        </div>
      </section>
      </Transition>
          <Transition name="fade-slide">

      <section v-if="summary" class="flex items-center gap-4">
        <button
          @click="saveAnalysis"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold text-base flex items-center gap-2"
          :disabled="isSaving || saveSuccess"
        >
          <span v-if="!isSaving && !saveSuccess">SAVE ANALYSIS</span>
          <span v-if="isSaving">Saving...</span>
          <span v-if="!isSaving && saveSuccess">Saved ✔</span>
          <i v-if="isSaving" class="fas fa-spinner fa-spin"></i>
        </button>
      </section>
    </Transition>

    <!-- Correlation Chart -->
     <Transition name="fade-slide">
        <section v-if="correlationData.length">
          <h3 class="text-lg font-semibold text-white mb-2">Correlation Score Over Time</h3>
          <LineChart
            :chart-data="chartData"
            :chart-options="chartOptions"
            :key="walletAddress" 
            class="bg-white p-4 rounded-md"
          />    
        </section>
     </Transition>

    <!-- Chart visualisasi -->
     <Transition name="fade-slide">
       <section> 
         <h3 class="text-lg font-semibold text-white mb-2">Wallet Flow Network</h3>
         <div v-show="hasNetwork" ref="networkContainer" class="w-full h-96 bg-white rounded-md p-4"></div>
         <div v-if="!hasNetwork" class="text-gray-500 text-center py-8 text-base">
           Please analyze wallet to view chart.
         </div>
   
       </section>
     </Transition>

    <!-- Tabel reporting -->
     <Transition name="fade-slide">
       <section>
         <h3 class="text-lg font-semibold text-white mb-2">Detection & Reporting</h3>
         <div class="overflow-x-auto">
           <table v-if="reports.length" class="min-w-full rounded-md overflow-hidden">
             <thead>
               <tr class="title">
                 <th class="px-6 py-3 text-left text-lg">ID</th>
                 <th class="px-6 py-3 text-left text-lg">Wallet</th>
                 <th class="px-6 py-3 text-left text-lg">Transactions</th>
                 <th class="px-6 py-3 text-left text-lg">Risk</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(r, i) in reports" :key="i" class="border-t border-gray-700 hover:bg-gray-700">
                 <td class="px-6 py-3 text-base font-semibold">{{ r.id }}</td>
                 <td class="px-6 py-3 text-base">{{ r.wallet }}</td>
                 <td class="px-6 py-3 text-base">{{ r.txCount }}</td>
                 <td :class="['px-6 py-3 text-base font-semibold', riskColor(r.risk)]">
                   {{ r.risk }}
                 </td>
               </tr>
             </tbody>
   
           </table>
           <div v-else class="text-gray-500 text-center py-8 text-base">
             No report available yet.
           </div>
         </div>
       </section>
     </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, defineComponent, h } from 'vue'
import { Network } from "vis-network"
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import whitebinder from '../../dfinity/whitebinder.js'

// register chart.js modules
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// component chart
const LineChart = defineComponent({
  name: 'LineChart',
  components: { Line },
  props: {
    chartData: { type: Object, required: true },
    chartOptions: { type: Object, required: true }
  },
  setup(props) {
    return () => h(Line, { data: props.chartData, options: props.chartOptions })
  }
})

// state
const walletAddress = ref('')
const reports = ref([])
const summary = ref(null)
const correlationData = ref([])
const hasNetwork = ref(false)

// mapping global wallet → ID
const addressMap = ref({})
let counter = 1

// chart state
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Correlation Score',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: '#93c5fd',
      fill: true
    }
  ]
})
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: '#000' } }
  },
  scales: {
    x: { ticks: { color: '#000' } },
    y: { ticks: { color: '#000' }, min: 0, max: 1 }
  }
}

const chartInstance = ref(null)
const networkContainer = ref(null)

function riskColor(risk) {
  return risk === 'High'
    ? 'text-red-500'
    : risk === 'Medium'
    ? 'text-yellow-400'
    : 'text-green-400'
}

const isLoading = ref(false)

async function analyzeWallet() {
  if (!walletAddress.value) return;

  isLoading.value = true
  try {
    const result = await whitebinder.scanWallet(walletAddress.value)

    if (!result || !result.history || !result.history.length) {
      alert('Wallet tidak ditemukan dalam database.')
      reports.value = []
      summary.value = null
      correlationData.value = []
      if (chartInstance.value) chartInstance.value.destroy()
      hasNetwork.value = false;
      return
    }

    // reset mapping
    addressMap.value = {}
    counter = 1
    hasNetwork.value = true;

    // update network dulu → isi addressMap
    await updateNetwork(result.history, result.address)

    // isi laporan dengan ID mapping
    reports.value = result.history.map(tx => ({
      id: addressMap.value[tx.to] || tx.to, // A1, A2, dst
      wallet: tx.to,                        // alamat asli
      txCount: tx.amount,
      risk: tx.riskLevel
    }))


    const analytics = await whitebinder.getAnalytics(walletAddress.value)
    summary.value = analytics.summary
    correlationData.value = analytics.correlationData

    chartData.value = {
      labels: correlationData.value.map(c => c.date),
      datasets: [
        {
          label: 'Correlation Score',
          data: correlationData.value.map(c => c.score),
          borderColor: '#3b82f6',
          backgroundColor: '#93c5fd',
          fill: true
        }
      ]
    }

  } catch (e) {
    console.error('Gagal analisa wallet:', e)
  } finally {
    isLoading.value = false
  }
}

async function updateNetwork(history, mainAddress) {
  await nextTick()

  const nodesSet = new Set([mainAddress])
  history.forEach(tx => {
    nodesSet.add(tx.from)
    nodesSet.add(tx.to)
  })

  const nodes = Array.from(nodesSet).map(addr => {
    if (!addressMap.value[addr]) {
      addressMap.value[addr] = `A${counter++}`
    }
    return {
      id: addr,
      label: addr === mainAddress ? `${addressMap.value[addr]} (Main)` : addressMap.value[addr],
      title: addr, // tooltip = alamat asli
      color: addr === mainAddress ? '#3b82f6' : '#10b981'
    }
  })

  const edges = history.map(tx => ({
    from: tx.from,
    to: tx.to,
    label: `${tx.amount}`,
    color: tx.riskLevel === 'High'
      ? { color: '#ef4444' }
      : tx.riskLevel === 'Medium'
      ? { color: '#facc15' }
      : { color: '#10b981' }
  }))

  const data = { nodes, edges }
  const options = {
    physics: { enabled: true },
    edges: { arrows: 'to' }
  }

  if (chartInstance.value) chartInstance.value.destroy()
  chartInstance.value = new Network(networkContainer.value, data, options)
}

const isSaving = ref(false)
const saveSuccess = ref(false)

function saveAnalysis() {
  if (!walletAddress.value || !summary.value) return;

  isSaving.value = true
  saveSuccess.value = false

  setTimeout(() => {
    let saved = {}
    try {
      saved = JSON.parse(localStorage.getItem('walletAnalysis')) || {}
    } catch (e) {
      console.warn("Data di localStorage corrupt, reset ulang.", e)
      saved = {}
    }

    // helper untuk amanin BigInt → string
    const toSafe = (val) => (typeof val === "bigint" ? val.toString() : val)

    // Simpan data baru
    saved[walletAddress.value] = {
      wallet: walletAddress.value,
      totalVolume: toSafe(summary.value.totalVolume),
      totalTransactions: toSafe(summary.value.totalTransactions),
      lowRiskCount: toSafe(summary.value.lowRiskCount),
      mediumRiskCount: toSafe(summary.value.mediumRiskCount || 0),
      highRiskCount: toSafe(summary.value.highRiskCount)
    };

    localStorage.setItem('walletAnalysis', JSON.stringify(saved));

    isSaving.value = false
    saveSuccess.value = true
  }, 1000)
}


</script>


<style scoped>
section {
  padding-block: 20px;
}
input {
  background-color: #172433;
}
.title {
  background-color: #172433;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
