<script setup lang="ts">
  interface Props {
    placeholder: string;
    type: string;
    id: string;
  }
  const props = defineProps<Props>();
</script> 

<template>
  <div class="input-wrapper">
    <label for="props.id">{{ props.placeholder }}</label>
    <input :id="props.id" :type="props.type" />
  </div>
</template>

<style scoped>

  input {
    height: 35px;
    padding-left: 1rem;
    background-color: #666;
    color: #fff;
    border: none;
    border-radius: 5px;
    width: 100%;
  }

  input::placeholder {
    color: #fff;
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #555;
  }

</style>