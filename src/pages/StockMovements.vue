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
        stockMovements: [],
        products: [],
        authenticatedUser: null,
        showModal: false,
        isVisible: false,
        productFilter: '',
        formData: {
          product_id: '',
          name: '',
          quantity: '',
          type: '',
          created_at: '',
          user_id: ''
        }
      };
    },
    mounted() {
      this.getProduts();
      this.handleGetUser();
      this.getStockMovements();  
    },
    methods: {
      async handleGetUser() {
        const userStore = useUserStore();
        await userStore.fetchUser();
        this.authenticatedUser = userStore.user;
      },
      async getProduts() {
        await api.get('/products')
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      async getStockMovements(name = '') {
        let url = '/movements';
        if (name) {
          url += `?name=${name}`;
        }
        await api.get(url)
        .then((response) => {
            this.stockMovements = response.data.map(movement => {
                const product = this.products.find(product => product.id === movement.product_id);
                return {
                    ...movement,
                    created_at: new Date(movement.created_at).toLocaleDateString(),
                    type: movement.type === 'input' ? 'Entrada' : movement.type === 'output' ? 'Saída' : movement.type === 'return' ? 'Devolução' : movement.type === 'adjustment' ? 'Ajuste Manual' : movement.type === 'loss' ? 'Perda' : 'Não definido',
                    name: product ? product.name : 'Produto não encontrado'
                };
            });
        })
        .catch((error) => {
            console.error(error);
        });       
      },
      async handleAddStockMovement() {
        if (!this.formData.product_id || !this.formData.quantity || !this.formData.type) {
            alert('Preencha todos os campos!');
            return;
        }

        this.formData.user_id = this.authenticatedUser.id;

        try {
            await api.post('/movements', this.formData);
            this.getStockMovements();
            alert('Movimentação cadastrada com sucesso!');
            this.clearForm();
            this.showModal = false;
        } catch (error) {
            console.error(error);
        }
      },
      clearForm() {
        this.formData = {
          product_id: '',
          name: '',
          quantity: '',
          type: '',
        };
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
  <h1>Movimentações de estoque</h1>
  <div>
    <div class="first-row">
        <div class="inputs-container">
          <div class="btn-wrapper">
            <Button text="Novo registro" @click="showModal = true" />
          </div>
          <div class="select-wrapper">
            <label for="product">Filtrar por</label>
            <select v-model="productFilter" @change="getStockMovements(productFilter)" id="product">
              <option value="">Todos</option>
              <option v-for="product in products" :key="product.id" :value="product.name">{{ product.name }}</option>
            </select>
          </div>
        </div>
    </div>
    <div class="table-wrapper" v-if="authenticatedUser && authenticatedUser.role_id !== 3">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="stockMovements.length === 0">
            <td colspan="4">Nenhum registro encontrado</td>
          </tr>
          <tr v-for="movement in stockMovements" :key="movement.id">
            <td>{{ movement.name }}</td>
            <td>{{ movement.quantity }}</td>
            <td>{{ movement.type }}</td>
            <td>{{ movement.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :isVisible="showModal" @close="handleCancel">
    <h2>Nova movimentação de estoque</h2>
    <form @submit.prevent="handleAddStockMovement" class="form-content">
      <div class="select-wrapper">
        <label for="product">Produto</label>
        <select v-model="formData.product_id" label="Produto" id="product">
          <option value="" disabled selected>Selecione um produto</option>
          <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
        </select>
      </div>
      <div class="inputs-container">
        <InputText v-model.number="formData.quantity" label="Quantidade" id="quantity" type="number" placeholder="Quantidade" />
        <div class="select-wrapper">
          <label for="type">Tipo</label>
          <select v-model="formData.type" label="Tipo" id="type">
            <option value="">Selecione um tipo</option>
            <option value="input">Entrada</option>
            <option value="output">Saída</option>
            <option value="return">Devolução</option>
            <option value="adjustment">Ajuste Manual</option>
            <option value="loss">Perda</option>
          </select>
        </div>
      </div>
      <div class="inputs-container">
        <Button text="Cancelar" @click="handleCancel" styleType="ghost"/>
        <Button text="Salvar" type="submit"/> 
      </div>
    </form>
  </Modal>
</template>
