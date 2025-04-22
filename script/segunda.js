const lista = document.getElementById("listaEntregues");
const pedidos = JSON.parse(localStorage.getItem("pedidosEntregues")) || [];

if (pedidos.length) {
  pedidos.sort((a, b) => a.id - b.id);

  pedidos.forEach(pedido => {
    const div = document.createElement("div");
    div.className = "pedido-entregue";
    div.innerHTML = `
      <p><b>${pedido.cliente}</b></p>
      <p>${pedido.detalhes}</p>
      <p><i>Entregue às ${pedido.horario}</i></p>
      <hr>
    `;
    lista.appendChild(div);
  });
} else {
  lista.innerHTML = "<p>Nenhum pedido entregue ainda.</p>";
}

function concluirPedido(pedidoDiv) {
  // Remove o pedido da seção atual
  pedidoDiv.remove();

  // Captura os dados do pedido
  const infoDiv = pedidoDiv.querySelector('.info');
  const [idCliente, produto, endereco, data, horario] = infoDiv.innerText.split('\n').map(line => line.split(': ')[1]);

  // Cria um objeto para o pedido concluído
  const pedidoConcluido = {
    id: idCliente,
    cliente: idCliente.split(' ')[1], // Ajuste para capturar apenas o nome do cliente
    produto,
    endereco,
    data,
    horario
  };

  // Salva o pedido no localStorage
  const pedidosConcluidos = JSON.parse(localStorage.getItem('pedidosConcluidos')) || [];
  pedidosConcluidos.push(pedidoConcluido);
  localStorage.setItem('pedidosConcluidos', JSON.stringify(pedidosConcluidos));

  // Adiciona o pedido à tabela de pedidos concluídos
  const pedidosConcluidosTable = document.getElementById('pedidosConcluidos').querySelector('tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${pedidoConcluido.id}</td>
    <td>${pedidoConcluido.cliente}</td>
    <td>${pedidoConcluido.produto}</td>
    <td>${pedidoConcluido.endereco}</td>
    <td>${pedidoConcluido.data}</td>
    <td>${pedidoConcluido.horario}</td>
  `;
  pedidosConcluidosTable.appendChild(row);

  // Exibe uma mensagem de conclusão
  alert('Pedido concluído!');
}

function carregarPedidosConcluidos() {
  const pedidosConcluidos = JSON.parse(localStorage.getItem('pedidosConcluidos')) || [];
  const pedidosConcluidosTable = document.getElementById('pedidosConcluidos').querySelector('tbody');

  pedidosConcluidos.forEach(pedido => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pedido.id}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.produto}</td>
      <td>${pedido.endereco}</td>
      <td>${pedido.data}</td>
      <td>${pedido.horario}</td>
    `;
    pedidosConcluidosTable.appendChild(row);
  });
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPedidosConcluidos);