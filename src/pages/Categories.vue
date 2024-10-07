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
        categories: [],
        showModal: false,
        isVisible: false,
        isEditing: false,
        currentCategoryId: null,
        formData: {
          name: '',
        }
      };
    },
    mounted() {
      this.getCategories();
    },
    methods: {
      async getCategories() {
        await api.get('/categories')
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async handleAddCategory(id) {
        if (this.isEditing) {
        await api.put(`/categories/${this.currentCategoryId}`, this.formData)
        .then((response) => {
            this.getCategories();
            this.showModal = false;
            alert('Categoria editada com sucesso!');
            this.clearForm();
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          await api.post('/categories', this.formData)
            .then((response) => {
              this.getCategories();
              this.showModal = false;
              alert('Categoria cadastrada com sucesso!');
              this.clearForm();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
      async handleEditCategory(id) {
        this.isEditing = true;
        this.currentCategoryId = id;
        await api.get(`/categories/${id}`)
          .then((response) => {
            this.formData = response.data;
            this.showModal = true;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      async handleDeleteCategory(id) {
        confirm('Deseja excluir a Categoria?') && (
          await api.delete(`/categories/${id}`)
            .then((response) => {
              this.getCategories();
              alert('Categoria excluída com sucesso!');
            })
            .catch((error) => {
              console.error(error);
            })
        );
      },
      clearForm() {
        this.formData = {
          name: '',
        };
        this.isEditing; 
        this.currentCategoryId = null;
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
  <h1>Categorias</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <div class="btn-wrapper">
          <Button text="Criar categoria" @click="showModal = true" />
        </div>
      </div>
    </div>
    
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categories.length === 0">
            <td colspan="2" style="text-align: center;">Nenhuma categoria encontrada.</td>
          </tr>
          <tr v-else v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>
              <div>
                <IconButton iconType="pen" @click="handleEditCategory(category.id)" />
                <IconButton iconType="trash" @click="handleDeleteCategory(category.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :isVisible="showModal" @close="showModal = false">
    <h2>{{ isEditing ? 'Editar' : 'Criar' }} Categoria</h2>
    <form @submit.prevent="handleAddCategory" class="form-content">
      <div class="inputs-container">
        <InputText v-model="formData.name" label="Nome" placeholder="Nome" type="text" />
      </div>
      <div class="btn-wrapper">
          <Button text="Cancelar" @click="handleCancel" />
          <Button text="Salvar" type="submit" @click="handleAddCategory" />
      </div>
    </form>
  </Modal>
</template>