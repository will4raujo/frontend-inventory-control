<template>
  <form class="auth-form">
    <legend>Faça seu login</legend>
    <div>
      <label for="email">E-mail</label>
      <input type="email" id="email" />
    </div>
    <div>
      <label for="password">Senha</label>
      <input type="password" id="password" />
    </div>
    <button>Entrar</button>
  </form>
</template>

<script>
export default {
  name: 'SignIn',
};
</script>