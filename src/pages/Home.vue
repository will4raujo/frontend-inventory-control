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
        await api.get('/products/lists')
          .then((response) => {
            this.productsWithLowStock = response.data.productsWithLowStock;
            this.productsNearExpiration = response.data.productsNearExpiration;
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
    <table>
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
        <tr v-for="product in productsWithLowStock" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.min_stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h3>Produtos próximo do vencimento</h3>
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Vencimento</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Produto 1</td>
          <td>10/10/2021</td>
        </tr>
        <tr>
          <td>Produto 2</td>
          <td>15/10/2021</td>
        </tr>
        <tr>
          <td>Produto 3</td>
          <td>20/10/2021</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>



<style scoped>
  .tables-wrapper {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    margin: 2rem 0;
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
    border: 1px solid #333;
    padding: 0.5rem;
  }

  tr:nth-child(even) {
    background-color: #444;
  }

  tr:hover {
    background-color: #555;
  }

  h3 {
    margin-bottom: 1rem;
  }
</style>