let contadorId = 1;

document.getElementById('gerarPedido').addEventListener('click', function () {
  const cliente = document.getElementById('cliente').value;
  const endereco = document.getElementById('endereco').value;
  const produto = document.getElementById('produto').value;
  if (!cliente || !endereco || !produto) {
    alert('Por favor, preencha todos os campos!');
    return;
  }
  const pedidoId = contadorId++;
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
    <div class="pedido-btn"></div> <!-- Botão para "Em execução" -->
  `;
  pedidoDiv.querySelector('.pedido-btn').addEventListener('click', function () {
    moverParaACaminho(pedidoDiv);
  });
  document.getElementById('emExecucao').appendChild(pedidoDiv);
  document.getElementById('cliente').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('produto').value = 'Hamburguer';
});
function moverParaACaminho(pedidoDiv) {
  const aCaminhoDiv = document.getElementById('aCaminho');
  const concluirBtn = document.createElement('div');
  concluirBtn.classList.add('entregar-btn');
  concluirBtn.addEventListener('click', function () {
    concluirPedido(pedidoDiv);
  });
  const pedidoBtn = pedidoDiv.querySelector('.pedido-btn');
  if (pedidoBtn) {
    pedidoBtn.replaceWith(concluirBtn);
  }
  aCaminhoDiv.appendChild(pedidoDiv);
}
function concluirPedido(pedidoDiv) {
  pedidoDiv.remove();
  alert('Pedido concluído!');
}