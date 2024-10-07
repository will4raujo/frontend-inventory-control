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
        user: [],
        showModal: false,
        isVisible: false,
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
      this.getUser();
      this.getStockMovements();  
    },
    methods: {
      async getUser() {
        await api.get('/users/profile')
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
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
      async getStockMovements() {
        await api.get('/movements')
        .then((response) => {
            this.stockMovements = response.data.map(movement => {
                const product = this.products.find(product => product.id === movement.product_id);
                return {
                    ...movement,
                    created_at: new Date(movement.created_at).toLocaleDateString(),
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

        this.formData.user_id = this.user.id;

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
        </div>
    </div>
    <div class="table-wrapper">
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
        <Button text="Salvar" type="submit" @click="handleAddStockMovement" /> 
      </div>
    </form>
  </Modal>
</template>
