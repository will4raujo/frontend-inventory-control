<script setup>
import { ref } from 'vue';
import InputText from '../components/atoms/InputText.vue';
import Button from '../components/atoms/Button.vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const formData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  role_id: 1,
});

const errors = ref({
  name: '',
  email: '',
  password: '',
});

const router = useRouter();

const validateForm = () => {
  let valid = true;
  if (!formData.value.name) {
    errors.value.name = 'Nome é obrigatório.';
    valid = false;
  }
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
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Senha deve ter no mínimo 8 caracteres.';
    valid = false;
  } else if (formData.value.password !== formData.value.password_confirmation) {
    errors.value.password = 'Senhas não conferem.';
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
    return;
  }

  try {
    const response = await api.post('/register', formData.value);
    
    if (response.status === 200 || response.status === 201) {
      alert('Usuário criado com sucesso!');
      router.push('/signin');
    } else {
      alert('Erro ao criar usuário! Verifique os dados e tente novamente.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao criar usuário! Verifique sua conexão e tente novamente.');
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <legend>Crie sua conta</legend>
    <InputText v-model="formData.name" id="name" placeholder="Nome" type="text"  />
    <InputText v-model="formData.email" id="email" placeholder="E-mail" type="email" />
    <InputText v-model="formData.password" id="password" placeholder="Senha" type="password" />
    <InputText v-model="formData.password_confirmation" id="password_confirmation" placeholder="Confirme sua senha" type="password" />
    <InputText v-model="formData.phone" id="phone" placeholder="Telefone" type="tel" />
    <div>
      <label for="role_id">Tipo de usuário</label>
      <select v-model="formData.role_id" id="role_id">
        <option value="1">Administrador</option>
        <option value="2">Gerente</option>
        <option value="3">Usuário</option>
      </select>
    </div>
    <Button type="submit" text="Criar conta" />
    <router-link to="/signin">Já tenho uma conta</router-link>
  </form>
</template>

<style scoped>
  a {
    color: #fff;
    text-decoration: none;
    align-self: center;
  }
</style>
