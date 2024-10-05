<script setup>
</script>

<template>
  <h1>Relatório de saldo de estoque</h1>
  <div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome do produto</td>
            <td>10</td>
            <td>Entrada</td>
            <td>01/01/2021</td>
          </tr>
          <tr>
            <td>Nome do produto</td>
            <td>10</td>
            <td>Saída</td>
            <td>01/01/2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 2rem;
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
  

  th:last-child, tr {
    text-align: center;
  }


  tr:hover {
    background-color: #555;
  }
  </style>