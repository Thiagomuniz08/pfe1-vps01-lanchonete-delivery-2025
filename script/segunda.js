document.addEventListener('DOMContentLoaded', function () {
  const corpoTabela = document.getElementById('corpo-tabela');
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  pedidos.forEach((pedido) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${pedido.id}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.endereco}</td>
      <td>${pedido.produto}</td>
      <td>${pedido.data}</td>
      <td>${pedido.horaSaida || '-'}</td>
      <td>${pedido.horaChegada || '-'}</td>
    `;
    corpoTabela.appendChild(linha);
  });
});