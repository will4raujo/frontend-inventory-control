<template>
  <form class="auth-form">
    <legend>Crie sua conta</legend>
    <div>
      <label for="name">Nome</label>
      <input type="text" id="name" />
    </div>

    <div>
      <label for="email">E-mail</label>
      <input type="email" id="email" />
    </div>

    <div>
      <label for="password">Senha</label>
      <input type="password" id="password" />
    </div>

    <div>
      <label for="confirm-password">Confirme sua senha</label>
      <input type="password" id="confirm-password" />
    </div>

    <div>
      <label for="phone">Telefone</label>
      <input type="tel" id="phone" />
    </div>

    <div>
      <label for="type">Tipo de usuário</label>
      <select id="type">
        <option value="admin">Administrador</option>
        <option value="manager">Gerente</option>
        <option value="user">Usuário</option>
      </select>
    </div>
    <button>Criar conta</button>
  </form>
</template>

<script>
export default {
  name: 'SignUp',
};
</script>