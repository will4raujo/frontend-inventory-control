<template>
  <main class="auth-container">
    <div class="logo-container">
      <Sticker :size="80" />
      <h2>Inventory Control</h2>
    </div>
    <div class="form-container">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { Sticker } from 'lucide-vue-next';
</script>

<style>
  .auth-container {
    height: 100vh;
    width: 100vw;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-container {
    max-width: 400px;
    margin: 0;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-form > legend {
    font-size: 1.5rem;
    align-self: center;
  }

@media (min-width: 768px) {
  .auth-container {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10rem;
  }
}
</style>