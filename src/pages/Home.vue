<script>
  import api from '../services/api';
  export default {
    data() {
      return {
        productsWithLowStock: [],
        productsNearExpiration: [],
      };
    },
    mounted() {
      this.getProductsLists();
    },
    methods: {
      async getProductsLists() {
        await api.get('/lists/home')
          .then((response) => {
            this.productsWithLowStock = response.data.low_stock_products;
            this.productsNearExpiration = response.data.soon_to_expire_products.map(product => {
              product.expiration_date = new Date(product.expiration_date).toLocaleDateString();
              return product;
            });
            this.productsNearExpiration = response.data.soon_to_expire_products;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
    }
  };
</script>

<template>
  <h1>Home</h1>
  <div class="tables-wrapper">
    <div>
      <h3>Produtos com estoque baixo</h3>
    <table class="crud-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Estoque</th>
          <th>Quantidade mínima</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productsWithLowStock.length === 0">
          <td colspan="3">Nenhum produto com estoque baixo</td>
        </tr>
        <tr v-else v-for="product in productsWithLowStock" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.min_stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h3>Produtos próximo do vencimento</h3>
    <table class="crud-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Vencimento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="productsNearExpiration.length === 0">
          <td colspan="2">Nenhum produto próximo do vencimento (30 dias)</td>
        </tr>
        <tr v-else v-for="product in productsNearExpiration" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.expiration_date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>



<style scoped>
  .tables-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 1024px;
    gap: 2rem;
    margin: 2rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }


  td {
    border: 1px solid #333;
    padding: 0.5rem;
  }

  h3 {
    margin-bottom: 1rem;
  }
</style>