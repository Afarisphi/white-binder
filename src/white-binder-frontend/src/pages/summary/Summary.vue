<template>
  <transition name="fade">
    <section class="h-screen flex justify-center items-center">
        <div class="summary text-lg p-20">
            <img src="/White_Binder.png" alt="White Binder Logo" />

            <h2 class="text-xl">White Binder</h2>
            <p>
                <strong>White Binder</strong> adalah platform investigasi aktivitas judi online berbasis analisis transaksi wallet kripto. Platform ini hadir sebagai solusi atas minimnya alat bantu terbuka untuk menganalisis keterkaitan antar wallet dan mendeteksi pola transaksi mencurigakan pada blockchain.
            </p>
            <p>
                Menggunakan pendekatan visualisasi graph dan analisis jaringan (seperti <em>node centrality</em>, <em>path tracing</em>, dan <em>clustering</em>), White Binder mampu mengidentifikasi koneksi antara wallet dan kontrak yang terindikasi aktivitas perjudian.
            </p>
            <p>
                MVP dibangun menggunakan data simulasi (<em>off-chain</em>), namun sistem dirancang modular dan siap diperluas ke integrasi data real-time dari jaringan publik seperti Ethereum dan Tron.
            </p>
            <p>
                <strong>Open-source</strong>, ringan, dan dapat dikustomisasi, White Binder menjadi alat yang fleksibel untuk publik, peneliti, dan lembaga seperti OJK dan BI. Solusi ini mendukung penguatan regulasi aset digital dan membangun ekosistem kripto Indonesia yang sehat dan berintegritas.
            </p>
        </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Summary',
}
</script>

<style scoped>
h2, p {
    padding-block: 20px;
}

p {
    font-size: 1rem;
}

img {
    width: 300px;
}
</style>