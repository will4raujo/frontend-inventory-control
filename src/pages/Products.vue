<script>
  import Button from '../components/atoms/Button.vue';
  import IconButton from '../components/atoms/IconButton.vue';
  import InputText from '../components/atoms/InputText.vue';
  import Modal from '../components/atoms/Modal.vue';
  import api from '../services/api';
  import { useUserStore } from '../stores/user';
  
  export default {
    components: {
      Button,
      IconButton,
      Modal,
      InputText
    },
    data() {
      return {
        products: [],
        categories: [],
        suppliers: [],
        showModal: false,
        isVisible: false,
        isEditing: false,
        currentProductId: null,
        authenticatedUser: null,
        categoryFilter: '', 
        supplierFilter: '',
        search: '',
        formData: {
          name: '',
          code: '',
          description: '',
          category_id: '',
          supplier_id: '',
          cost_price: '',
          sale_price: '',
          stock: '',
          min_stock: '',
          max_stock: '',
          expiration_date: '',
        }
      };
    },
    computed: {
      filteredProducts() {
          return this.products.filter(product => {
            return (!this.categoryFilter || product.category_id === this.categoryFilter) &&
                    (!this.supplierFilter || product.supplier_id === this.supplierFilter);
          });
      }
    },
    mounted() {
      this.handleGetUser();
      this.getProducts();
      this.getCategories();
      this.getSuppliers();
    },
    watch: {
      search(newSearch) {
        this.getProducts(newSearch);
      },
    },
    methods: {
      async handleGetUser() {
        const userStore = useUserStore();
        await userStore.fetchUser();
        this.authenticatedUser = userStore.user;
      },
      async getProducts(search = '') {
        let url = '/products';
        if (search) {
          url += `?name=${search}`;
        }
        await api.get(url)
          .then((response) => {
            response.data.forEach(product => {
              product.sale_price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.sale_price);
            });
            this.products = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async getCategories() {
        await api.get('/categories')
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async getSuppliers() {
        await api.get('/suppliers')
          .then((response) => {
            this.suppliers = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async handleAddProduct(id) {
        if (this.isEditing) {
        await api.put(`/products/${this.currentProductId}`, this.formData)
        .then((response) => {
            this.getProducts();
            alert('Produto editado com sucesso!');
            this.showModal = false;
            this.clearForm();
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          await api.post('/products', this.formData)
            .then((response) => {
              this.getProducts();
              alert('Produto cadastrado com sucesso!');
              this.clearForm();
              this.showModal = false;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
      async handleEditProduct(id) {
        this.isEditing = true;
        this.currentProductId = id;
        await api.get(`/products/${id}`)
          .then((response) => {
            this.formData = response.data;
            this.showModal = true;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      async handleDeleteProduct(id) {
        confirm('Deseja excluir o Produto?') && (
          await api.delete(`/products/${id}`)
            .then((response) => {
              this.getProducts();
              alert('Produto excluído com sucesso!');
            })
            .catch((error) => {
              console.error(error);
            })
        );
      },
      clearForm() {
        this.formData = {
          name: '',
          code: '',
          description: '',
          category_id: '',
          supplier_id: '',
          cost_price: '',
          sale_price: '',
          stock: '',
          min_stock: '',
          max_stock: '',
          expiration_date: ''
        };
        this.isEditing; 
        this.currentProductId = null;
      },
      handleCancel() {
        confirm('Deseja cancelar?') && (
          this.showModal = false,
          this.clearForm()
        );
      }
    },
  };
</script>

<template>
  <h1>Produtos</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <div class="btn-wrapper" v-if="authenticatedUser && authenticatedUser.role_id !== 3">  
          <Button text="Novo produto" @click="showModal = true" />
        </div>
      </div>
    </div>
    <div class="filters">
      <InputText v-model="search" label="Pesquisar" id="search" placeholder="Pesquisar produto" type="text" />
      <div class="select-wrapper">
        <label for="category">Categoria</label>
        <select v-model="categoryFilter" label="Categoria" id="category">
          <option value="">Todas as categorias</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="select-wrapper">
        <label for="supplier">Fornecedor</label>
        <select v-model="supplierFilter" label="Fornecedor" id="supplier">
          <option value="">Todos os fornecedores</option>
          <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
        </select>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Quantidade</th>
            <th>Preço de venda</th>
            <th v-if="authenticatedUser && authenticatedUser.role_id !== 3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="5" style="text-align: center;">Nenhum produto cadastrado</td>
          </tr>
          <tr v-else v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.code }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.sale_price }}</td>
            <td v-if="authenticatedUser && authenticatedUser.role_id !== 3">
              <div>
                <IconButton iconType="pen" @click="handleEditProduct(product.id)" />
                <IconButton iconType="trash" @click="handleDeleteProduct(product.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :isVisible="showModal" @close="handleCancel">
    <h2>{{ isEditing ? 'Editar produto' : 'Novo produto' }}</h2>
    <form class="form-content" @submit.prevent="handleAddProduct">
      <div class="input-wrapper">
        <div class="inputs-container">
          <InputText v-model="formData.name" label="Nome" id="name" placeholder="Nome do produto" type="text" />
          <InputText v-model="formData.code" label="Código" id="code" placeholder="Código do produto" type="text" />
        </div>
        <div class="inputs-container">
          <div class="select-wrapper">
          <label for="category">Categoria</label>
          <select v-model="formData.category_id" label="Categoria" id="category">
            <option value="" disabled selected>Selecione uma categoria</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="select-wrapper">
          <label for="supplier">Fornecedor</label>
          <select v-model="formData.supplier_id" label="Fornecedor" id="supplier">
            <option value="" disabled selected>Selecione um fornecedor</option>
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
          </select>
        </div>
      </div>
      <div class="inputs-container">  
        <InputText v-model="formData.cost_price" label="Preço de custo" id="costPrice" type="number" placeholder="Preço de custo" />
        <InputText v-model="formData.sale_price" label="Preço de venda" id="salePrice" type="number" placeholder="Preço de venda" />
      </div>
      <div class="inputs-container">
        <InputText v-model="formData.stock" label="Quantidade" id="stock" type="number" placeholder="Quantidade" />
        <InputText v-model="formData.min_stock" label="Estoque mínimo" id="minStock" type="number" placeholder="Estoque mínimo" />
        <InputText v-model="formData.max_stock" label="Estoque máximo" id="maxStock" type="number" placeholder="Estoque máximo" />
      </div>
      <InputText v-model="formData.expiration_date" label="Data de validade" id="expirationDate" type="date" placeholder="Data de validade" />
      <textarea v-model="formData.description" label="Descrição" id="description" placeholder="Descrição do produto" class="textarea"></textarea>
      </div>
      
      <div class="btn-wrapper">
        <Button text="Cancelar" styleType="ghost" @click="handleCancel" />
        <Button text="Salvar" @click="addProduct" />
      </div>
    </form>
  </Modal>
</template>

<style scoped>
  .textarea {
    height: 100px;
    width: 100%;
    margin-top: 1rem;
    background-color: #555;
    border-radius: 5px;
    border: none;
    padding: .8rem;
    color: #fff;

    resize: none;
    box-sizing: border-box;
  }
  .textarea::placeholder {
    color: #ccc;
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
</style>