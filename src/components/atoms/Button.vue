<script setup lang="ts">
  interface Props {
    text: string;
    onClick?: () => void;
    styleType?: 'button' | 'submit' | 'ghost';
    loading?: boolean;
  }
  const props = defineProps<Props>();

</script>

<template>
  <button @click="props.onClick" :disabled="props.loading" :class="props.styleType">
    {{ props.text }}
  </button>
</template>

<style scoped>
  button {
    height: 35px;
    padding: 0 1rem;
    background-color: #2a4878;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    background-color: #1e3a6f;
  }

  button:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  button.ghost {
    background-color: transparent;
    color: #444;
    border: 2px solid #444;
  }

  button.ghost:hover {
    background-color: #444;
    color: #fff;
  }
</style>