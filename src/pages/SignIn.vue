<template>
  <form class="auth-form">
    <legend>Faça login</legend>
    <InputText id="email" placeholder="E-mail" type="email" />
    <InputText id="password" placeholder="Senha" type="password" />
    <Button text="Entrar" />
    <router-link to="/signup">Não tenho uma conta</router-link>
  </form>
</template>

<script setup>
  import Button from '../components/atoms/Button.vue';
  import InputText from '../components/atoms/InputText.vue';

</script>

<style scoped>
  a {
    color: #fff;
    text-decoration: none;
    align-self: center;
  }
</style>