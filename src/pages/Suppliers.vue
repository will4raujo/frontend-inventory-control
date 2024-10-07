<script>
  import Button from '../components/atoms/Button.vue';
  import IconButton from '../components/atoms/IconButton.vue';
  import Modal from '../components/atoms/Modal.vue';
  import InputText from '../components/atoms/InputText.vue';
  import api from '../services/api';

  export default {
      components: {
        Button,
        IconButton,
        Modal,
        InputText
      },
      data() {
        return {
          suppliers: [],
          showModal: false,
          isVisible: false,
          isEditing: false,
          currentSupplierId: null,
          formData: {
            name: '',
            cnpj: '',
            contact: '',
          }
        };
      },
      mounted() {
        this.getSuppliers();
      },
      methods: {
        async getSuppliers() {
          await api.get('/suppliers')
            .then((response) => {
              this.suppliers = response.data;
              console.log(this.suppliers);
            })
            .catch((error) => {
              console.error(error);
            });        
        },
        async handleAddSupplier(id) {
          if (this.isEditing) {
          await api.put(`/suppliers/${this.currentSupplierId}`, this.formData)
          .then((response) => {
              this.getSuppliers();
              this.showModal = false;
              alert('Fornecedor editado com sucesso!');
              this.clearForm();
            })
            .catch((error) => {
              console.error(error);
            });
          } else {
            await api.post('/suppliers', this.formData)
              .then((response) => {
                this.getSuppliers();
                this.showModal = false;
                alert('Fornecedor cadastrado com sucesso!');
                this.clearForm();
              })
              .catch((error) => {
                console.error(error);
              });
          }
        },
        async handleEditSupplier(id) {
          this.isEditing = true;
          this.currentSupplierId = id;
          await api.get(`/suppliers/${id}`)
            .then((response) => {
              this.formData = response.data;
              this.showModal = true;
            })
            .catch((error) => {
              console.error(error);
            });
        },
        async handleDeleteSupplier(id) {
          confirm('Deseja excluir o fornecedor?') && (
            await api.delete(`/suppliers/${id}`)
              .then((response) => {
                this.getSuppliers();
                alert('Fornecedor excluído com sucesso!');
              })
              .catch((error) => {
                console.error(error);
              })
          );
        },
        clearForm() {
          this.formData = {
            name: '',
            cnpj: '',
            contact: '',  
          };
          this.isEditing; 
          this.currentUserId = null;
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
  <h1>Fornecedores</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <div class="btn-wrapper">
          <Button text="Novo fornecedor" @click="showModal = true" />
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cnpj</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="suppliers.length === 0">
            <td colspan="4" style="text-align: center;">Nenhum fornecedor encontrado.</td>
          </tr>
          <tr v-else v-for="supplier in suppliers" :key="supplier.id">
            <td>{{ supplier.name }}</td>
            <td>{{ supplier.cnpj }}</td>
            <td>{{ supplier.contact }}</td>
            <td>
              <div>
                <IconButton iconType="pen" @click="handleEditSupplier(supplier.id)" />
                <IconButton iconType="trash" @click="handleDeleteSupplier(supplier.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :isVisible="showModal" @close="showModal = false">
      <h2>{{ isEditing ? 'Editar' : 'Cadastrar' }} fornecedor</h2>
      <form @submit.prevent="handleAddSupplier" class="form-content">
        <div class="inputs-container">
          <InputText v-model="formData.name" label="Nome" placeholder="Nome" type="text" />
          <InputText v-model="formData.cnpj" label="Cnpj" placeholder="Cnpj" type="text" />
        </div>
        <InputText v-model="formData.contact" label="Contato" placeholder="Contato" type="text" />
        <div class="btn-wrapper">
          <Button text="Cancelar" @click="handleCancel" />
          <Button text="Salvar" @click="handleAddSupplier" />
        </div>
      </form>
  </Modal>
</template>
