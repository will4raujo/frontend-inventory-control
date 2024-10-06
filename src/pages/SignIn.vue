<script setup>
  import Button from '../components/atoms/Button.vue';
  import InputText from '../components/atoms/InputText.vue';
  import { ref } from 'vue';
  import api from '../services/api';
  import { useRouter } from 'vue-router';

  const formData = ref({
    email: '',
    password: '',
  });

  const errors = ref({
    email: '',
    password: '',
  });

  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    if (!formData.value.email) {
      errors.value.email = 'E-mail é obrigatório.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
      errors.value.email = 'E-mail inválido.';
      valid = false;
    }

    if (!formData.value.password) {
      errors.value.password = 'Senha é obrigatória.';
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      const errorMessages = Object.values(errors.value)
        .filter((error) => error !== '')
        .join('\n');
      alert(errorMessages);
    }

    try {
      const response = await api.post('/login', formData.value);
      localStorage.setItem('@inventorycontrol:user', response.data.token);
      router.push('/');
    } catch (error) {
      alert('E-mail ou senha inválidos.');
    }
  };

</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <legend>Faça login</legend>
    <InputText v-model="formData.email" id="email" placeholder="E-mail" type="email" />
    <InputText v-model="formData.password" id="password" placeholder="Senha" type="password" />
    <Button text="Entrar" type="submit" />
    <router-link to="/signup">Não tenho uma conta</router-link>
  </form>
</template>

<style scoped>
  a {
    color: #fff;
    text-decoration: none;
    align-self: center;
  }
</style>