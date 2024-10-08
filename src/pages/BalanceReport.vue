<script>
  import Button from '../components/atoms/Button.vue';
  import api from '../services/api';
  export default {
    components: {
      Button,
    },
    data() {
      return {
        productsBalance: [],
        productsByCategory: [],
        productsBySupplier: [],
        activeList: 'balance',
      };
    },
    mounted() {
      this.getProductsBalance();
      this.getProductsByCategoryAndSupplier();
    },
    methods: {
      async getProductsBalance() {
        await api.get('/products')
          .then((response) => {
            this.productsBalance = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async getProductsByCategoryAndSupplier() {
        await api.get('/lists/balance')
          .then((response) => {
            this.productsByCategory = response.data.stock_by_category;
            this.productsBySupplier = response.data.stock_by_supplier;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      setActiveList(list) {
        this.activeList = list;
      },
    }
  };
</script>

<template>
  <h1>Relatório de Saldo de Estoque</h1>
  <div class="btn-wrapper">
    <Button type="button" text="Saldo de Estoque" @click="setActiveList('balance')"></Button>
    <Button type="button" text="Por Categoria" @click="setActiveList('category')"></Button>
    <Button type="button" text="Por Fornecedor" @click="setActiveList('supplier')"></Button>
  </div>

  <div v-if="activeList === 'balance'" class="table-wrapper">
    <h3>Saldo de Estoque</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productsBalance.length === 0">
          <td colspan="2">Nenhum produto com saldo de estoque</td>
        </tr>
        <tr v-else v-for="product in productsBalance" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeList === 'category'" class="table-wrapper">
    <h3>Saldo por Categoria</h3>
    <table>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Quantidade Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productsByCategory.length === 0">
          <td colspan="2">Nenhuma categoria encontrada</td>
        </tr>
        <tr v-else v-for="category in productsByCategory" :key="category.category_id">
          <td>{{ category.category_name }}</td>
          <td>{{ category.total_stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="activeList === 'supplier'" class="table-wrapper">
    <h3>Saldo por Fornecedor</h3>
    <table>
      <thead>
        <tr>
          <th>Fornecedor</th>
          <th>Quantidade Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productsBySupplier.length === 0">
          <td colspan="2">Nenhum fornecedor encontrado</td>
        </tr>
        <tr v-else v-for="supplier in productsBySupplier" :key="supplier.supplier_id">
          <td>{{ supplier.supplier_name }}</td>
          <td>{{ supplier.total_stock }}</td>
        </tr>
      </tbody>
    </table>
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