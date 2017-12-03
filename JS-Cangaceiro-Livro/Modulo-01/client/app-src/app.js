import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'jquery/dist/jquery';
import 'bootstrap/js/modal';

import { NegociacaoController } from './controllers/NegociacaoController';
import { Negociacao } from './domain/';

const	negociacao = new Negociacao(new Date(), 1, 200);

const	config = {	
      method: 'POST',
      headers: {
            'Content-Type' : 'application/json'
      },
      body: JSON.stringify(negociacao)
};

fetch('http://localhost:3000/negociacoes', config)
      .then(() => console.log('Dado enviado com sucesso'));

const controller = new NegociacaoController();