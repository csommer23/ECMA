class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');       

        
        this._negociacoes = ProxyFactory.create(
            new Negociacoes(),
            ['adicionar','esvazia'],
            model => this._negociacoesView.update(model)
        );

        this._negociacoesView = new NegociacoesView('#negociacoes');

        this._negociacoesView.update(this._negociacoes);

        this._mensagens = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model)
        );

        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagens);
    }

    adicionar(event) {
        event.preventDefault();  

        this._negociacoes.adicionar(this._criarNegociacao());
        this._mensagens.texto = 'Negociação adicionada com sucesso';
        this._limparFormulario();
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
        this._negociacoes.esvazia();
        this._mensagens.texto = 'Negociação apagadas com sucesso';
    }
}