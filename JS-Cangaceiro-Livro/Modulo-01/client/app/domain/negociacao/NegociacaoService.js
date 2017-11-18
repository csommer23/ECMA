class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return this._http
                    .get('negociacoes/semana')
                    .then(
                        dados => { 
                            return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        },
                        err => { 
                            throw new Error('Não foi possível obter as negociações da semana');
                        }
                    );
        
    }

    obterNegociacoesDaAnterior() {

        return this._http
                    .get('negociacoes/anterior')
                    .then(
                        dados => { 
                            return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        },
                        err => { 
                            throw new Error('Não foi possível obter as negociações da anterior');
                        }
                    );
    }

    obterNegociacoesDaRetrasada() {
        
                return this._http
                            .get('negociacoes/retrasada')
                            .then(
                                dados => { 
                                    return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                                },
                                err => { 
                                    throw new Error('Não foi possível obter as negociações da retrasada');
                                }
                            );
            }
}