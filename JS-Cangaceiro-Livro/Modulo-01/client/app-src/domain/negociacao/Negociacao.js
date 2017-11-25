export class Negociacao {

    constructor(_data, _quantidade, _valor) {

        Object.assign(this, {
            _quantidade,
            _valor
        });

        this._data = new Date(_data);

        Object.freeze(this);
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    equals(negociacao) {
        return JSON.stringify(this) == JSON.stringify(negociacao);
    }
}