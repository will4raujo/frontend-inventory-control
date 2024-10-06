<template>
  <div class="app-container">
    <aside class="menu-aside">
      <nav>
        <ul>
          <Li to="/" label="Home" />

          <li class="menu-section">
            <span class="section-title" @click="toggleSection('cadastros')">
              <FilePen :size="20" />
              Cadastros
            </span>
            <ul v-if="showCadastros" class="section-items">
              <Li to="/products" label="Produtos" />
              <Li to="/categories" label="Categorias" />
              <Li to="/users" label="Usuários" />
              <Li to="/suppliers" label="Fornecedores" />
            </ul>
          </li>

          <Li to="/stock-movements" label="Ger. Estoque"/>

          <li class="menu-section">
            <span class="section-title" @click="toggleSection('relatorios')">
              <FileSpreadsheet :size="20" />
              Relatórios Estoque
            </span>
            <ul v-if="showRelatorios" class="section-items">
              <Li to="/reports/balance" label="Saldo" />
              <Li to="/reports/movements" label="Movimentações" />
            </ul>
          </li>
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
import { ref } from 'vue';
import { House, Users, Barcode, ChartBarStacked, Truck, LogOut, FilePen, FileSpreadsheet } from 'lucide-vue-next';
import Li from '../components/atoms/li.vue';

const showCadastros = ref(false);
const showRelatorios = ref(false);

function toggleSection(section) {
  if (section === 'cadastros') {
    showCadastros.value = !showCadastros.value;
  } else if (section === 'relatorios') {
    showRelatorios.value = !showRelatorios.value;
  }
}
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
    width: 210px;
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
    margin-left: 210px;
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

  .section-title {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 40px;
    cursor: pointer;
    padding-left: 1.5rem;
  }

  .section-items {
    padding-left: 1rem;
    list-style: none;
  }

  .section-title:hover {
    background-color: #444;
  }

  .section-items li {
    margin: 0.5rem 0;
  }
</style>
