<script setup lang="ts">
  import { PenLine, Trash2 } from 'lucide-vue-next';
  
  interface Props {
    onClick?: () => void;
    iconType?: 'pen' | 'trash';
    loading?: boolean;
  }
  
  const props = defineProps<Props>();

</script>

<template>
  <button @click="props.onClick" :disabled="props.loading" :class="props.iconType">
    <component :is="props.iconType === 'pen' ? PenLine : Trash2" :size="17" />
  </button>
</template>

<style scoped>
  button {
    height: 35px;
    padding: .4rem;
    background-color: #2a4878;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #1e3a6f;
  }

  button:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
</style>