class Negociacoes {

    constructor(contexto, armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
        Object.freeze(this);
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha.call(this._contexto, this);
    }

    paraArray() {
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, negociacao) =>  total += negociacao.volume ,0);
    }

    esvazia() {
        this._negociacoes.length = 0;
        this._armadilha.call(this._contexto, this);
    }
}