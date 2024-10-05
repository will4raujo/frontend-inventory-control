<template>
  <form class="auth-form">
    <legend>Crie sua conta</legend>
    <InputText id="name" placeholder="Nome" type="text" />
    <InputText id="email" placeholder="E-mail" type="email" />
    <InputText id="password" placeholder="Senha" type="password" />
    <InputText id="confirm-password" placeholder="Confirme sua senha" type="password" />
    <InputText id="phone" placeholder="Telefone" type="tel" />
    <div>
      <label for="type">Tipo de usuário</label>
      <select id="type">
        <option value="admin">Administrador</option>
        <option value="manager">Gerente</option>
        <option value="user">Usuário</option>
      </select>
    </div>
    <Button text="Criar conta" />
    <router-link to="/signin">Já tenho uma conta</router-link>
  </form>
</template>

<script setup>
import InputText from '../components/atoms/InputText.vue';
import Button from '../components/atoms/Button.vue';

</script>

<style scoped>
  select {
   display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 35px;
    padding: 4px 8px;
    border-radius: 5px;
    background-color: #666;
    color: #fff;
    width: 100%;
  }

  select:focus {
    outline: none;
    box-shadow: 0 0 0 2px #555;
  }

  a {
    color: #fff;
    text-decoration: none;
    align-self: center;
  }
</style>