import { NegociacaoController } from './controllers/NegociacaoController.js';
import { Negociacao } from './domain/Index.js';


const	negociacao = new Negociacao(new Date(), 1, 200);

const	config = {	
      method: 'POST',
      headers: {
            'Content-Type' : 'application/json'
      },
      body: JSON.stringify(negociacao)
};

fetch('/negociacoes', config)
      .then(() => console.log('Dado enviado com sucesso'));

const controller = new NegociacaoController();