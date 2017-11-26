import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';
import { ApplicationException } from '../../ui/converters/ApplicationException.js';

export class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    async obterNegociacoesDoPeriodo() {

        try {

            let periodo = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaAnterior(),
                this.obterNegociacoesDaRetrasada()
            ]);

            return periodo.reduce((novoArray, item) => novoArray.concat(item),[])
            .sort((a, b) => b.data.getTime() - b.data.getTime())

        } catch(err) {
            throw new ApplicationException('Não foi possível obter as negociações do periodo');
        }
    }

    obterNegociacoesDaSemana() {

        return this._http
                    .get('negociacoes/semana')
                    .then(
                        dados => { 
                            return dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        },
                        err => { 
                            throw new ApplicationException('Não foi possível obter as negociações da semana');
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
                            throw new ApplicationException('Não foi possível obter as negociações da anterior');
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
                                    throw new ApplicationException('Não foi possível obter as negociações da retrasada');
                                }
                            );
            }
}