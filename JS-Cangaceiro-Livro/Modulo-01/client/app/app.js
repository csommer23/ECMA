const controller = new NegociacaoController();

document.querySelector('.form').addEventListener('submit', controller.adicionar.bind(controller));

document.querySelector('#botao-apaga').addEventListener('click', controller.apagar.bind(controller));