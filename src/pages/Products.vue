<script setup>
  import Button from '../components/atoms/Button.vue';
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
      <table>
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
              <Button text="Editar" />
              <Button text="Excluir" />
            </td>
          </tr>
          <tr>
            <td>Nome do fornecedor</td>
            <td>(44) 99999-9999</td>
            <td>
              <Button text="Editar" />
              <Button text="Excluir" />
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

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
  }

  td {
    border-bottom: 1px solid #666;
    padding: 0.5rem;
  }
  

  th:last-child {
    text-align: center;
  }

  td:last-child {
    display: flex;
    gap: 1rem;
    justify-content: end;
  }

  tr:hover {
    background-color: #555;
  }
  </style>