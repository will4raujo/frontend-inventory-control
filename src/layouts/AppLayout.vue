<template>
  <div class="app-container">
    <aside class="menu-aside">
      <nav>
        <ul>
          <Li to="/" label="Home" />
          <Li to="/products" label="Produtos" />
          <Li to="/categories" label="Categorias" />
          <Li to="/users" label="Usuários" />
          <Li to="/suppliers" label="Fornecedores" />
        </ul>

        <button class="logout-button">
          <LogOut :size="20" />
          Sair
        </button>
      </nav>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>

  import { House, Users, Barcode, ChartBarStacked, Truck, LogOut } from 'lucide-vue-next';
  import Li from '../components/atoms/li.vue';

</script>

<style>
  .app-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    min-height: 100vh;
    width: 100vw;
    margin: 0 auto;
    position: relative;
  }

  .menu-aside {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    height: 100vh;
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.3s;
    padding: 1.5rem 0;
  }

  .menu-aside nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .main-content {
    position: relative;
    padding: 1rem;
    margin-left: 190px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .logout-button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-right: 6rem;
  }

  .logout-button:hover {
    color: #f00;
  }
</style>