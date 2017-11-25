import { Negociacoes } from '../domain/negociacao/Negociacoes.js';
import { NegociacoesView } from	'../ui/views/NegociacoesView.js';
import { Mensagem } from '../ui/models/Mensagem.js';
import { MensagemView }	from '../ui/views/MensagemView.js';
import { NegociacaoService } from '../domain/negociacao/NegociacaoService.js';
import { getNegociacaoDao } from '../util/DaoFactory.js';
import { DataInvalidaException } from '../ui/converters/DataInvalidaException.js';
import { Negociacao } from '../domain/negociacao/Negociacao.js';
import { Bind } from '../util/Bind.js';
import { DateConverter } from '../ui/converters/DateConverter.js'

export class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');       
        
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adicionar','esvazia'
        );

        this._mensagens = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );

        this._service = new NegociacaoService();

        this._init();        
    }

    _init() {

        getNegociacaoDao()
            .then(dao => dao.listaTodos())
            .then(negociacoes => {

                negociacoes.forEach(negociacao => {
                    this._negociacoes.adicionar(negociacao);
                })
            })
            .catch(err => this._mensagens.texto = err)
    }

    adicionar(event) {

        try {
            event.preventDefault();  
            
            const negociacao = this._criarNegociacao();

            getNegociacaoDao()
                .then(dao => dao.adiciona(negociacao))
                .then(() => {

                    this._negociacoes.adicionar(negociacao);
                    this._mensagens.texto = 'Negociação adicionada com sucesso';
                    this._limparFormulario();
                })
                .catch(err => this._mensagens.texto = err);            

        } catch(err) {

            if(err instanceof DataInvalidaException)
                this._mensagens.texto = err.message;
            else
                this._mensagens.texto = 'Um erro não esperado aconteceu.' + err.message;
        }
        
    }

    _limparFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;        
        this._inputData.focus();
    }

    _criarNegociacao() {        
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apagar() {

        getNegociacaoDao()
            .then(dao => dao.apagaTodos())
            .then(() => {

                this._negociacoes.esvazia();
                this._mensagens.texto = 'Negociação apagadas com sucesso';
            })
            .catch(err => this._mensagens.texto = err);

    }

    importaNegociacoes() {

        this._service.obterNegociacoesDoPeriodo()
            .then(negociacoes => {
                
                negociacoes
                    .filter(novaNegociacao => 
                        !this._negociacoes.paraArray().some(negociacaoExistente =>
                            novaNegociacao.equals(negociacaoExistente)
                        )
                    )
                    .forEach(negociacao => this._negociacoes.adicionar(negociacao));

                this._mensagens.texto = 'Negociações importada com sucesso!';
            }).catch(err => this._mensagens.texto = err);        
    }
}