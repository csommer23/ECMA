class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoes');

        this._negociacoesView.update(this._negociacoes);
    }

    adicionar(event) {
        event.preventDefault();  

        this._negociacoes.adicionar(this._criarNegociacao());
        this._negociacoesView.update(this._negociacoes);
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
}