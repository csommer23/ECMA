import { Negociacoes, NegociacaoService, Negociacao } from '../domain/Index.js';
import { NegociacoesView, MensagemView,	Mensagem, DateConverter, getExceptionMessage } from '../ui/Index.js';
import { getNegociacaoDao, Bind, debounce, controller } from '../util/Index.js';

@controller('#data', '#quantidade', '#valor')
export class NegociacaoController {

    
    constructor(_inputData, _inputQuantidade, _inputValor) {

        Object.assign(this, { _inputData, _inputQuantidade, _inputValor });     
        
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

    async _init() {

        try{

            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();

            negociacoes.forEach(negociacao => {
                this._negociacoes.adicionar(negociacao);
            })

        } catch(err) {
            this._mensagens.texto = getExceptionMessage(err);
        }
    }

    @debounce
    async adicionar(event) {

        try {
            event.preventDefault();  
            
            const negociacao = this._criarNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adicionar(negociacao);
            this._mensagens.texto = 'Negociação adicionada com sucesso';

            this._limparFormulario();

        } catch(err) {
            this._mensagens.texto = getExceptionMessage(err);
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

    async apagar() {

        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();        
            this._negociacoes.esvazia();
            this._mensagens.texto = 'Negociação apagadas com sucesso';

        } catch(err) {
            this._mensagens.texto = getExceptionMessage(err);
        }

    }

    @debounce(1500)
    async importaNegociacoes() {

        try {

            const negociacoes = await this._service.obterNegociacoesDoPeriodo();

            negociacoes.filter(novaNegociacao => 
                !this._negociacoes.paraArray().some(negociacaoExistente =>
                    novaNegociacao.equals(negociacaoExistente)
                )
            )
            .forEach(negociacao => this._negociacoes.adicionar(negociacao));

            this._mensagens.texto = 'Negociações importada com sucesso!';

        } catch(err) {
            this._mensagens.texto = getExceptionMessage(err)
        }       
    }
}