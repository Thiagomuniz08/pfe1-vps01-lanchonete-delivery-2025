if (!localStorage.getItem('contadorId')) {
  localStorage.setItem('contadorId', '1');
}

document.getElementById('gerarPedido').addEventListener('click', function () {
  const cliente = document.getElementById('cliente').value;
  const endereco = document.getElementById('endereco').value;
  const produto = document.getElementById('produto').value;

  if (!cliente || !endereco || !produto) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const pedidoId = parseInt(localStorage.getItem('contadorId'), 10);
  localStorage.setItem('contadorId', (pedidoId + 1).toString());

  const pedidoDiv = document.createElement('div');
  pedidoDiv.classList.add('pedido');
  pedidoDiv.innerHTML = `
    <div class="info">
      <strong>Id: ${pedidoId} Cliente: ${cliente}</strong><br>
      Produto: ${produto}<br>
      Endereço: ${endereco}<br>
      Data: ${new Date().toLocaleDateString()}<br>
      Horário: ${new Date().toLocaleTimeString()}
    </div>
    <div class="pedido-btn"></div>
  `;

  pedidoDiv.querySelector('.pedido-btn').addEventListener('click', function () {
    moverParaACaminho(pedidoDiv, { pedidoId, cliente, endereco, produto });
  });

  document.getElementById('emExecucao').appendChild(pedidoDiv);

  document.getElementById('cliente').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('produto').value = 'Hamburguer';
});

function moverParaACaminho(pedidoDiv, pedidoData) {
  const aCaminhoDiv = document.getElementById('aCaminho');

  salvarPedidoNoLocalStorage(pedidoData);

  const concluirBtn = document.createElement('div');
  concluirBtn.classList.add('entregar-btn');
  concluirBtn.addEventListener('click', function () {
    concluirPedido(pedidoDiv, pedidoData.pedidoId);
  });

  const pedidoBtn = pedidoDiv.querySelector('.pedido-btn');
  if (pedidoBtn) {
    pedidoBtn.replaceWith(concluirBtn);
  }

  aCaminhoDiv.appendChild(pedidoDiv);
}

function salvarPedidoNoLocalStorage(pedido) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push({
    id: pedido.pedidoId,
    cliente: pedido.cliente,
    endereco: pedido.endereco,
    produto: pedido.produto,
    data: new Date().toLocaleDateString(),
    horaSaida: new Date().toLocaleTimeString(),
    horaChegada: null,
  });
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function concluirPedido(pedidoDiv, pedidoId) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  const pedidoIndex = pedidos.findIndex((pedido) => pedido.id === pedidoId);

  if (pedidoIndex !== -1) {
    pedidos[pedidoIndex].horaChegada = new Date().toLocaleTimeString();
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  pedidoDiv.remove();
  alert('Pedido concluído!');
}