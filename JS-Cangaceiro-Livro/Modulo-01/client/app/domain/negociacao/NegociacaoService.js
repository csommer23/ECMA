System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            class NegociacaoService {

                constructor() {

                    this._http = new HttpService();
                }

                obterNegociacoesDoPeriodo() {

                    return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaAnterior(), this.obterNegociacoesDaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((a, b) => b.data.getTime() - b.data.getTime())).catch(err => {
                        throw new Error('Não foi possível obter as negociações do periodo');
                    });
                }

                obterNegociacoesDaSemana() {

                    return this._http.get('negociacoes/semana').then(dados => {
                        return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    }, err => {
                        throw new Error('Não foi possível obter as negociações da semana');
                    });
                }

                obterNegociacoesDaAnterior() {

                    return this._http.get('negociacoes/anterior').then(dados => {
                        return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    }, err => {
                        throw new Error('Não foi possível obter as negociações da anterior');
                    });
                }

                obterNegociacoesDaRetrasada() {

                    return this._http.get('negociacoes/retrasada').then(dados => {
                        return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    }, err => {
                        throw new Error('Não foi possível obter as negociações da retrasada');
                    });
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map