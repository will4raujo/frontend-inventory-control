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
        users: [],
        showModal: false,
        isVisible: false,
        isEditing: false,
        currentUserId: null,
        formData: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role_id: '',
          phone: ''
        }
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      async getUsers() {
        await api.get('/users')
          .then((response) => {
            function handleRole(role_id) {
              switch (role_id) {
                case 1:
                  return 'Administrador';
                case 2:
                  return 'Gerente';
                case 3:
                  return 'Usuário';
                default:
                  return 'Não definido';
              }
            }
            response.data.forEach((user) => {
              user.role_id = handleRole(user.role_id);
            });
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      },
      async handleAddUser(id) {
        if (this.isEditing) {
        await api.put(`/users/${this.currentUserId}`, this.formData)
        .then((response) => {
            this.getUsers();
            this.showModal = false;
            alert('Usuário editado com sucesso!');
            this.clearForm();
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          await api.post('/register', this.formData)
            .then((response) => {
              this.getUsers();
              this.showModal = false;
              alert('Usuário cadastrado com sucesso!');
              this.clearForm();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
      async handleEditUser(id) {
        this.isEditing = true;
        this.currentUserId = id;
        await api.get(`/users/${id}`)
          .then((response) => {
            this.formData = response.data;
            this.showModal = true;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      async handleDeleteUser(id) {
        confirm('Deseja excluir o usuário?') && (
          await api.delete(`/users/${id}`)
            .then((response) => {
              this.getUsers();
              alert('Usuário excluído com sucesso!');
            })
            .catch((error) => {
              console.error(error);
            })
        );
      },
      clearForm() {
        this.formData = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role_id: '',
          phone: ''
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
  <h1>Usuários</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <div class="btn-wrapper">
          <Button text="Novo usuário" @click="showModal = true" />
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td> 
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role_id }}</td>
            <td>
              <div>
                <IconButton iconType="pen" @click="handleEditUser(user.id)" />
                <IconButton iconType="trash" @click="handleDeleteUser(user.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal :isVisible="showModal" @close="showModal = false">
    <h2>{{ isEditing ? 'Editar usuário' : 'Novo usuário' }}</h2>
    <form @submit.prevent="handleAddUser" class="form-content">
      <div class="inputs-container">
        <InputText v-model="formData.name" label="Nome" id="name" placeholder="Nome do usuário" type="text" />
        <InputText v-model="formData.email" label="E-mail" id="email" type="email" placeholder="E-mail" />
      </div>
      <div class="inputs-container">
        <InputText v-model="formData.password" label="Senha" id="password" type="password" placeholder="Senha" />
        <InputText v-model="formData.password_confirmation" label="Senha" id="password_confirmation" type="password" placeholder="Senha" />
      </div>
      <div class="inputs-container">
      <div>
        <label for="role_id">Tipo de usuário</label>
        <select v-model="formData.role_id" id="role_id">
          <option value="1">Administrador</option>
          <option value="2">Gerente</option>
          <option value="3">Usuário</option>
        </select>
      </div>
        <InputText v-model="formData.phone" label="Telefone" id="phone" type="tel" placeholder="Telefone" />
      </div> 
      <div class="btn-wrapper">
        <Button text="Cancelar" styleType="ghost" @click="handleCancel" />
        <Button text="Salvar" @click="handleAddUser" />
      </div>
    </form>
  </Modal>
</template>

<style scoped>
  .first-row {
    margin: 2rem 0;
  }

  .inputs-container {
    display: flex;
    align-items: end;
    gap: 1rem;
  }
</style>
