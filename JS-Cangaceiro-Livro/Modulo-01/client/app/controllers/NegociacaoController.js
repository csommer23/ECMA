class NegociacaoController {

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
    }

    adicionar(event) {

        try {
            event.preventDefault();  
            
            this._negociacoes.adicionar(this._criarNegociacao());
            this._mensagens.texto = 'Negociação adicionada com sucesso';
            this._limparFormulario();

        } catch(err) {
            console.log(err);
            console.log(err.stack);
            if(err instanceof DataInvalidaException)
                this._mensagens.texto = err.message;
            else
                this._mensagens.texto = 'Um erro não esperado aconteceu.';
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
        this._negociacoes.esvazia();
        this._mensagens.texto = 'Negociação apagadas com sucesso';
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