<template>
  <transition name="fade">
    <section class="h-screen flex p-6 justify-center items-center">
        <div class="summary text-lg p-20">
            <img src="/White_Binder.png" alt="White Binder Logo" />

            <h2 class="text-xl"><Strong>White Binder</Strong></h2>
            <p>
            <strong>White Binder</strong> is a platform for investigating online gambling activities based on crypto wallet transaction analysis. This platform emerges as a solution to the lack of open tools for analyzing wallet interconnections and detecting suspicious transaction patterns on the blockchain.
            </p>
            <p>
            By leveraging graph visualization and network analysis (such as <em>node centrality</em>, <em>path tracing</em>, and <em>clustering</em>), White Binder is capable of identifying connections between wallets and contracts that indicate potential gambling activities.
            </p>
            <p>
            The MVP is built using simulated data (<em>off-chain</em>), but the system is designed modular and ready to be extended for real-time data integration from public networks such as Ethereum and Tron.
            </p>
            <p>
            <strong>Open-source</strong>, lightweight, and customizable, White Binder is a flexible tool for the public, researchers, and institutions such as the OJK and BI. This solution supports strengthening digital asset regulations and building a healthy, trustworthy crypto ecosystem in Indonesia.
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