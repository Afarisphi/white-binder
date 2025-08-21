<template>
  <div class="p-12 space-y-6">
    <h2 class="text-3xl font-bold text-white">Online Gambling On-Chain Analysis</h2>

    <!-- Info -->
    <section class="max-w-lg mx-auto p-4">
      <p class="text-gray-300 text-sm mb-3 text-center">
        <strong>Note:</strong> This feature is currently under development and does not yet support real e-wallet integration.  
        Try out the sample wallets below to see how it works.
      </p>
      <div class="overflow-x-auto py-2">
        <table class="min-w-full rounded-md overflow-hidden text-sm">
          <thead>
            <tr class="title">
              <th class="px-3 py-2 text-left font-medium">No</th>
              <th class="px-3 py-2 text-left font-medium">Wallet</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">1</td>
              <td class="px-3 py-2">0xMAIN123456789</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">2</td>
              <td class="px-3 py-2">0xABC123456789</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">3</td>
              <td class="px-3 py-2">0xGHI555666777</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">4</td>
              <td class="px-3 py-2">0xJKL111222333</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">5</td>
              <td class="px-3 py-2">0xPQR777888999</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">6</td>
              <td class="px-3 py-2">0xDEF987654321</td>
            </tr>
            <tr class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-3 py-2 font-semibold">7</td>
              <td class="px-3 py-2">0xGHI555666777</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Form input -->
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
        <div class="grid grid-cols-2 sm:grid-cols-4 py-4 gap-4">
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

    <!-- Save -->
    <Transition name="fade-slide">
      <section v-if="summary" class="flex items-center gap-4">
        <button
          @click="saveAnalysis"
          class="px-6 py-2 bg-green-600 hover:bg-green-700 text-sm text-white rounded-md font-semibold flex items-center gap-2"
          :disabled="isSaving || saveSuccess"
        >
          <span v-if="!isSaving && !saveSuccess">SAVE ANALYSIS</span>
          <span v-if="isSaving">Saving...</span>
          <span v-if="!isSaving && saveSuccess">Saved ✔</span>
          <i v-if="isSaving" class="fas fa-spinner fa-spin"></i>
        </button>
      </section>
    </Transition>

    <!-- Chart -->
    <Transition name="fade-slide">
      <section v-if="correlationData.length">
        <h3 class="text-lg font-semibold text-white mb-2">Correlation Score Over Time</h3>
        <LineChart
          :chart-data="chartData"
          :chart-options="chartOptions"
          :key="walletAddress" 
          class="bg-gray-800 p-4 rounded-md"
        />    
      </section>
    </Transition>

    <!-- Network -->
    <Transition name="fade-slide">
      <section> 
        <h3 class="text-lg font-semibold text-white mb-2">Wallet Flow Network</h3>
        <div 
          v-show="hasNetwork" 
          ref="networkContainer" 
          class="w-full h-96 bg-gray-800 rounded-md p-4"
        ></div>
        <div v-if="!hasNetwork" class="text-gray-500 text-center py-8 text-base">
          Please analyze wallet to view chart.
        </div>
      </section>
    </Transition>

    <!-- Reports -->
    <Transition name="fade-slide">
      <section>
        <h3 class="text-lg font-semibold text-white mb-2">Detection & Reporting</h3>
        <div class="overflow-x-auto">
          <table v-if="reports.length" class="min-w-full rounded-md overflow-hidden">
            <thead>
              <tr class="title">
                <th class="px-6 py-3 text-left text-base">ID</th>
                <th class="px-6 py-3 text-left text-base">From</th>
                <th class="px-6 py-3 text-left text-base">To</th>
                <th class="px-6 py-3 text-left text-base">Amount</th>
                <th class="px-6 py-3 text-left text-base">Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in reports" :key="i" class="border-t border-gray-700 hover:bg-gray-700">
                <td class="px-6 py-3 text-sm font-semibold">{{ r.id }}</td>
                <td class="px-6 py-3 text-sm">
                  <router-link 
                    v-if="r.from !== walletAddress" 
                    :to="{ name: 'WalletDetail', params: { address: r.from } }" 
                    class="text-gray-300 hover:text-blue-400 hover:underline transition"
                  >
                    {{ r.from }}
                  </router-link>
                  <span v-else class="text-blue-400 font-semibold">
                    {{ r.from }}
                  </span>
                </td>

                <td class="px-6 py-3 text-sm">
                  <router-link 
                    v-if="r.to !== walletAddress" 
                    :to="{ name: 'WalletDetail', params: { address: r.to } }" 
                    class="text-gray-300 hover:text-blue-400 hover:underline transition"
                  >
                    {{ r.to }}
                  </router-link>
                  <span v-else class="text-blue-400 font-semibold">
                    {{ r.to }}
                  </span>
                </td>
                <td class="px-6 py-3 text-sm">{{ r.amount }}</td>
                <td :class="['px-6 py-3 text-sm font-semibold', riskColor(r.risk)]">
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
  LinearScale,
} from 'chart.js'

import whitebinder from '../../dfinity/whitebinder.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

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

const walletAddress = ref('')
const reports = ref([])
const summary = ref(null)
const correlationData = ref([])
const hasNetwork = ref(false)

const addressMap = ref({}) // alamat → id report
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
    legend: { labels: { color: '#fff' } }
  },
  scales: {
    x: { ticks: { color: '#fff' } },
    y: { ticks: { color: '#fff' }, min: 0, max: 1 }
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
      alert('Wallet not found in database.')
      reports.value = []
      summary.value = null
      correlationData.value = []
      if (chartInstance.value) chartInstance.value.destroy()
      hasNetwork.value = false;
      return
    }

    // reset mapping
    addressMap.value = {}
    hasNetwork.value = true;

    // update network pakai history.id
    await updateNetwork(result.history, result.address)

    // isi laporan
    reports.value = result.history.map(tx => ({
      id: tx.id,
      from: tx.from,
      to: tx.to,
      amount: tx.amount,
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

  const nodesSet = new Set([mainAddress, ...history.map(tx => tx.from), ...history.map(tx => tx.to)])

  function shorten(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4)
  }

  // mapping address → riskLevel tertinggi
  const addressRisk = {}
  history.forEach(tx => {
    ;[tx.from, tx.to].forEach(addr => {
      if (!addressRisk[addr]) {
        addressRisk[addr] = tx.riskLevel
      } else {
        // prioritas warna: High > Medium > Low
        const order = { High: 3, Medium: 2, Low: 1 }
        if (order[tx.riskLevel] > order[addressRisk[addr]]) {
          addressRisk[addr] = tx.riskLevel
        }
      }
    })
  })

  // mapping riskLevel → warna
  function getColor(riskLevel) {
    if (riskLevel === "High") return "#ef4444"   // merah
    if (riskLevel === "Medium") return "#facc15" // kuning
    return "#10b981"                             // hijau (Low/default)
  }

  const nodes = Array.from(nodesSet).map(addr => {
    const risk = addressRisk[addr] || "Low"
    return {
      id: addr,
      label: addr === mainAddress 
        ? `${shorten(addr)}\n(Main)` 
        : shorten(addr),
      title: addr,
      color: getColor(risk),
      shape: "circle",
      font: { color: "white" } // 🔥 teks putih
    }
  })

  const edges = history.map(tx => ({
    from: tx.from,
    to: tx.to,
    label: `${tx.amount}`,
    length: 300,
    color: tx.riskLevel === "High"
      ? { color: "#ef4444" }
      : tx.riskLevel === "Medium"
      ? { color: "#facc15" }
      : { color: "#10b981" },
    arrows: { to: { enabled: true, scaleFactor: 1.2 } },
    font: {
    color: "white",
    strokeWidth: 0 
  }
  }))

  const data = { nodes, edges }
  const options = {
    physics: {
      enabled: true,
      repulsion: { nodeDistance: 250, springLength: 200 }
    },
    edges: { smooth: false }
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

    const toSafe = (val) => (typeof val === "bigint" ? val.toString() : val)

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
