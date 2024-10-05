<script setup>
  import Button from '../components/atoms/Button.vue';
  import InputText from '../components/atoms/InputText.vue';
</script>

<template>
  <h1>Categorias</h1>
  <div>

    <div class="first-row">
      <h3>Criar categoria</h3>
      <div class="inputs-container">
        <InputText id="name" placeholder="Nome" type="text" />
        <div class="btn-wrapper">
          <Button text="Criar categoria" />
        </div>
      </div>
    </div>
    
    <div class="table-wrapper">
      <h3>Categorias cadastradas</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome da categoria</td>
            <td>
              <Button text="Editar" />
              <Button text="Excluir" />
            </td>
          </tr>
          <tr>
            <td>Nome da categoria</td>
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
    gap: 1rem;
  }

  .btn-wrapper {
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