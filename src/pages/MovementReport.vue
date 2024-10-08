<script>
import Button from '../components/atoms/Button.vue';
import api from '../services/api';
import { useUserStore } from '../stores/user';

export default {
  components: {
    Button,
  },
  data() {
    return {
      movements: [],
      activeList: 'all',
      authenticatedUser: null,
    };
  },
  mounted() {
    this.getProductsBalance();
    this.handleGetUser();
  },
  methods: {
    async handleGetUser() {
        const userStore = useUserStore();
        await userStore.fetchUser();
        this.authenticatedUser = userStore.user;
      },
    async getProductsBalance(type = '') {
      let url = '/lists/movements';
      if (type && type !== 'all') {
        url += `?type=${type}`;
      }

      await api.get(url)
        .then((response) => {
          this.movements = response.data.map((movement) => {
            return {
              ...movement,
              type: movement.type === 'input' ? 'Entrada' : movement.type === 'output' ? 'Saída' : movement.type === 'return' ? 'Devolução' : movement.type === 'adjustment' ? 'Ajuste Manual' : movement.type === 'loss' ? 'Perda' : 'Não definido',
              created_at: new Date(movement.created_at).toLocaleDateString(),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setActiveList(type) {
      this.activeList = type;
      this.getProductsBalance(type);
    },
  },
};
</script>

<template>
  <h1>Relatório de movimentação de estoque</h1>
  <div class="first-row">

    <select @change="setActiveList($event.target.value)" v-if="authenticatedUser?.role_id === 1">
      <option value="all">Todas as movimentações</option>
      <option value="input">Entradas</option>
      <option value="output">Saídas</option>
      <option value="loss">Perdas</option>
      <option value="adjustment">Ajustes</option>
      <option value="my-movements">Minhas movimentações</option>
    </select>
    <select @change="setActiveList($event.target.value)" v-else>
      <option value="my-movements">Minhas movimentações</option>
    </select>
  </div>
  <div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="movements.length === 0">
            <td colspan="4">Nenhuma movimentação encontrada</td>
          </tr>
          <tr v-else v-for="movement in movements" :key="movement.id">
            <td>{{ movement.product_name }}</td>
            <td>{{ movement.quantity }}</td>
            <td>{{ movement.type }}</td>
            <td>{{ movement.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 2rem;
  }

  h3 {
    margin: 2rem 0 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
  }

  td {
    border-bottom: 1px solid #666;
    padding: 0.5rem;
  }

  th:last-child, tr {
    text-align: center;
  }

  tr:hover {
    background-color: #555;
  }
</style>
