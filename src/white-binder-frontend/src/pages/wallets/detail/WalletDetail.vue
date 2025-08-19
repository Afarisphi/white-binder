<template>
  <div class="p-6 space-y-6">
    <h2 class="text-3xl font-bold text-white mb-2">Wallet Detail</h2>
    <p class="text-gray-400 mb-6">
      Address: <span class="font-mono text-blue-400">{{ walletAddress }}</span>
    </p>

    <!-- Summary -->
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

    <!-- Chart -->
    <section v-if="correlationData.length">
      <h3 class="text-lg font-semibold text-white mb-2">Correlation Score Over Time</h3>
      <LineChart
        :chart-data="chartData"
        :chart-options="chartOptions"
        class="bg-gray-800 p-4 rounded-md"
      />
    </section>

    <!-- Network -->
    <section>
      <h3 class="text-lg font-semibold text-white mb-2">Wallet Flow Network</h3>
      <div v-show="hasNetwork" ref="networkContainer" class="w-full h-96 bg-gray-800 rounded-md p-4"></div>
      <div v-if="!hasNetwork" class="text-gray-500 text-center py-8 text-base">
        No network data available.
      </div>
    </section>

    <!-- Reports -->
    <section>
      <h3 class="text-lg font-semibold text-white mb-2">Detection & Reporting</h3>
      <div class="overflow-x-auto">
        <table v-if="reports.length" class="min-w-full rounded-md overflow-hidden">
          <thead>
            <tr class="title">
              <th class="px-6 py-3 text-left text-lg">ID</th>
              <th class="px-6 py-3 text-left text-lg">From</th>
              <th class="px-6 py-3 text-left text-lg">To</th>
              <th class="px-6 py-3 text-left text-lg">Amount</th>
              <th class="px-6 py-3 text-left text-lg">Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in reports" :key="i" class="border-t border-gray-700 hover:bg-gray-700">
              <td class="px-6 py-3 text-base font-semibold">{{ r.id }}</td>
              <td class="px-6 py-3 text-base">{{ r.from }}</td>
              <td class="px-6 py-3 text-base">{{ r.to }}</td>
              <td class="px-6 py-3 text-base">{{ r.amount }}</td>
              <td :class="['px-6 py-3 text-base font-semibold', riskColor(r.risk)]">{{ r.risk }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-gray-500 text-center py-8 text-base">
          No report available.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick, defineComponent, h, onMounted } from 'vue'
import { useRoute } from "vue-router" 
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

import whitebinder from '../../../dfinity/whitebinder.js'

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

const route = useRoute()
const walletAddress = ref('')
const reports = ref([])
const summary = ref(null)
const correlationData = ref([])
const hasNetwork = ref(false)

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

const networkContainer = ref(null)
let networkInstance = null

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
      hasNetwork.value = false
      return
    }

    hasNetwork.value = true
    await updateNetwork(result.history, result.address)

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

  const addressRisk = {}
  history.forEach(tx => {
    ;[tx.from, tx.to].forEach(addr => {
      if (!addressRisk[addr]) {
        addressRisk[addr] = tx.riskLevel
      } else {
        const order = { High: 3, Medium: 2, Low: 1 }
        if (order[tx.riskLevel] > order[addressRisk[addr]]) {
          addressRisk[addr] = tx.riskLevel
        }
      }
    })
  })

  function getColor(riskLevel) {
    if (riskLevel === "High") return "#ef4444"
    if (riskLevel === "Medium") return "#facc15"
    return "#10b981"
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
      font: { color: "white" }
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
    font: { color: "white", strokeWidth: 0 }
  }))

  const data = { nodes, edges }
  const options = {
    physics: { enabled: true, repulsion: { nodeDistance: 250, springLength: 200 } },
    edges: { smooth: false }
  }

  if (networkInstance) networkInstance.destroy()
  networkInstance = new Network(networkContainer.value, data, options)
}

onMounted(() => {
  walletAddress.value = route.params.address
  analyzeWallet()
})
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
