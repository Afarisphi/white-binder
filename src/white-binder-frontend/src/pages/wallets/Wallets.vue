<template>
  <section class="text-white p-6">
    <h2 class="text-xl font-bold mb-6">Riwayat Analisis Wallet</h2>

    <div class="mb-6">
      <label class="block text-lg mb-2">Pilih Wallet:</label>
      <select v-model="selectedWallet" class="w-full px-4 py-2 rounded text-sm bg-white text-black">
        <option disabled value="">-- Pilih Wallet --</option>
        <option v-for="wallet in wallets" :key="wallet.address" :value="wallet.address">
          {{ wallet.address }}
        </option>
      </select>
    </div>

    <!-- Tambahkan transition -->
<transition name="fade-slide" mode="out-in">
  <div v-if="transactionHistory.length" :key="selectedWallet" class="overflow-x-auto">
    <table class="min-w-full table-auto bg-gray-800 rounded-md text-sm">
      <thead class="title">
        <tr>
          <th class="px-4 py-2 text-left">Wallet</th>
          <th class="px-4 py-2 text-center">Total Volume</th>
          <th class="px-4 py-2 text-center">Transactions</th>
          <th class="px-4 py-2 text-center">Low Risk</th>
          <!-- <th class="px-4 py-2 text-center">Medium Risk</th> -->
          <th class="px-4 py-2 text-center">High Risk</th>
          <th class="px-4 py-2 text-center">Detail</th>
          <th class="px-4 py-2 text-center">Hapus</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tx, i) in transactionHistory"
          :key="i"
          class="border-t border-gray-700 bg-gray-900 hover:bg-gray-700"
        >
          <td class="px-4 py-2 text-left">{{ tx.wallet }}</td>
          <td class="px-4 py-2 text-center">{{ tx.totalVolume }}</td>
          <td class="px-4 py-2 text-center">{{ tx.totalTransactions }}</td>
          <td class="px-4 py-2 text-center">{{ tx.lowRisk }}</td>
          <!-- <td class="px-4 py-2 text-center">{{ tx.mediumRisk }}</td> -->
          <td class="px-4 py-2 text-center">{{ tx.highRisk }}</td>

          <!-- Tombol Detail -->
          <td class="px-4 py-2 text-center">
            <button
              @click="showDetail(tx.wallet)"
              class="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              <i class="fa-solid fa-info" style="color: #ffffff;"></i>
            </button>
          </td>

          <!-- Tombol Hapus -->
          <td class="px-4 py-2 text-center">
            <button
              @click="deleteWallet(tx.wallet)"
              class="text-red-500 hover:text-red-700"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- beri key berbeda untuk smooth switch -->
  <p v-else key="empty" class="text-gray-400 text-sm">
    History wallet tidak tersedia.
  </p>
</transition>

  
  </section>

</template>

<script>
export default {
  name: "Wallets",
  data() {
    return {
      selectedWallet: "",
      wallets: [], // dari LocalStorage
      analysisData: {}, // mapping wallet → data analisis
    };
  },
  computed: {
    transactionHistory() {
      if (!this.selectedWallet || !this.analysisData[this.selectedWallet]) {
        return [];
      }
      const d = this.analysisData[this.selectedWallet];
      return [
        {
          wallet: d.wallet,
          totalVolume: d.totalVolume,
          totalTransactions: d.totalTransactions,
          lowRisk: d.lowRiskCount,
          // mediumRisk: d.mediumRiskCount,
          highRisk: d.highRiskCount,
        },
      ];
    },
  },
  mounted() {
    const saved = JSON.parse(localStorage.getItem("walletAnalysis") || "{}");
    this.analysisData = saved;
    this.wallets = Object.keys(saved).map((w) => ({ address: w }));
  },
  methods: {
    showDetail(wallet) {
      alert(`Detail wallet: ${wallet}`);
    },
    deleteWallet(wallet) {
      if (!confirm(`Hapus data wallet ${wallet}?`)) return;
      const saved = JSON.parse(localStorage.getItem("walletAnalysis") || "{}");
      delete saved[wallet];
      localStorage.setItem("walletAnalysis", JSON.stringify(saved));
      this.analysisData = saved;
      this.wallets = Object.keys(saved).map((w) => ({ address: w }));
      if (this.selectedWallet === wallet) {
        this.selectedWallet = "";
      }
    },
  },
};
</script>

<style scoped>
.title {
  background-color: #172433;
  font-size: 0.875rem;
}

button i {
  font-size: 1rem;
}

/* Animasi tabel muncul */
.fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
