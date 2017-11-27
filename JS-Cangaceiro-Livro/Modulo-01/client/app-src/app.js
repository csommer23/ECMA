import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/Index.js';


const	negociacao = new Negociacao(new Date(), 1, 200);
const	cabecalhos = new Headers();
cabecalhos.set('Content-Type', 'application/json');

const	config = {	
      method: 'POST',
      headers: cabecalhos,
      body: JSON.stringify(negociacao)
};

fetch('/negociacoes', config)
      .then(() => console.log('Dado enviado com sucesso'));

const controller = new NegociacaoController(),
      $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.adicionar.bind(controller));

$('#botao-apaga').addEventListener('click', controller.apagar.bind(controller));

$('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));

