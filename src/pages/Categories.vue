<script setup>
  import IconButton from '../components/atoms/IconButton.vue';
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
      <table class="crud-table">
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
              <div>
                <IconButton iconType="pen" />
                <IconButton iconType="trash" />
              </div>
            </td>
          </tr>
          <tr>
            <td>Nome da categoria</td>
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
    gap: 1rem;
  }

  .btn-wrapper {
    max-width: 220px;
  }
</style>