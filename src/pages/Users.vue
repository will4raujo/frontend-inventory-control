<script>
  import Button from '../components/atoms/Button.vue';
  import IconButton from '../components/atoms/IconButton.vue';
  import api from '../services/api';

  export default {
    components: {
      Button,
      IconButton,
    },
    data() {
      return {
        users: [], 
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        api.get('/users')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error);
          });        
      }
    }
  };
</script>

<template>
  <h1>Usuários</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <div class="btn-wrapper">
          <Button text="Novo usuário" />
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td> 
            <td>{{ user.email }}</td>
            <td>
              <div>
                <IconButton iconType="pen" />
                <IconButton iconType="trash" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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

  .btn-wrapper {
    max-width: 220px;
  }
</style>
