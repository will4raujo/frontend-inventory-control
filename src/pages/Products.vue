<script setup>
  import Button from '../components/atoms/Button.vue';
  import IconButton from '../components/atoms/IconButton.vue';
  import InputText from '../components/atoms/InputText.vue';
  
  import { ref } from 'vue';
  import Modal from '../components/atoms/Modal.vue';
  
  const showModal = ref(false);

  function addProduct(event) {
    event.preventDefault();
    console.log('Adicionando produto');
    showModal.value = false;
  }
 
</script>

<template>
  <h1>Produtos</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <Button text="Novo produto" @click="showModal = true" />
      </div>
    </div>
    <div class="table-wrapper">
      <table class="crud-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome do fornecedor</td>
            <td>(44) 99999-9999</td>
            <td>
              <div>
                <IconButton iconType="pen" />
                <IconButton iconType="trash" />
              </div>
            </td>
          </tr>
          <tr>
            <td>Nome do fornecedor</td>
            <td>(44) 99999-9999</td>
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
  <Modal :isVisible="showModal" @close="showModal = false">
    <h2>Novo produto</h2>
    <form class="form-content" @submit.prevent="addProduct">
      <div class="btn-wrapper">
        <Button text="Cancelar" styleType="ghost" @click="showModal = false" />
        <Button text="Salvar" @click="addProduct" />
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
    justify-content: end;
    gap: 1rem;
    max-width: 220px;
  }
  
  </style>