<script setup>
  import Button from '../components/atoms/Button.vue';
import IconButton from '../components/atoms/IconButton.vue';
</script>

<template>
  <h1>Produtos</h1>
  <div>
    <div class="first-row">
      <div class="inputs-container">
        <Button text="Novo produto" />
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