<script setup lang="ts">
import { computed } from 'vue';
import { House, Users, Barcode, ChartBarStacked, Truck, LogOut, Blocks, ArrowRightLeft, ChartColumn } from 'lucide-vue-next';

const props = defineProps<{ to: string, label: string }>();

const IconComponent = computed(() => {
  switch (props.to) {
    case '/':
      return House;
    case '/users':
      return Users;
    case '/products':
      return Barcode;
    case '/categories':
      return ChartBarStacked;
    case '/suppliers':
      return Truck;
    case '/logout':
      return LogOut;
    case '/stock-movements':
      return Blocks;
    case '/reports/balance':
      return ChartColumn;
    case '/reports/movements':
      return ArrowRightLeft;
    default:
      return House;
  }
});
</script>

<template>
  <li>
    <component :is="IconComponent" :size="20"  class="li-icon" />
    <router-link :to="props.to">
      {{ props.label }}
    </router-link>
  </li>
</template>

<style scoped>
  li {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 40px;
  }

  li:hover {
    background-color: #444;
  }

  .li-icon {
    position: absolute;
    left: 1.5rem;
  }

  li a {
    position: absolute;
    color: #fff;
    text-decoration: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding-left: 3rem;
    padding-top: 8px;
  }

</style>