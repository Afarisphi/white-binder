<template>
  <div id="splash">
    <img src="/White_Binder.png" alt="Loading..." />
  </div>
</template>

<style scoped>
#splash {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background-color: #0F1724;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease;
}

#splash img {
    width: 300px;
}
</style>