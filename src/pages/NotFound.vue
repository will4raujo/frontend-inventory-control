<template>
  <div class="not-found">
    <Frown :size="64" />
    <h1>404 - Página não encontrada</h1>
  </div>
</template>

<script setup>
import { Frown } from 'lucide-vue-next';
</script>

<style scoped>
  .not-found {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #FFF;
  }
</style>