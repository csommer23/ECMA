const controller = new NegociacaoController(),
      $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.adicionar.bind(controller));

$('#botao-apaga').addEventListener('click', controller.apagar.bind(controller));

$('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));

