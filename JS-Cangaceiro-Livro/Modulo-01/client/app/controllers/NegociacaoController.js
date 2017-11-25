System.register(['../domain/negociacao/Negociacoes.js', '../ui/views/NegociacoesView.js', '../ui/models/Mensagem.js', '../ui/views/MensagemView.js', '../domain/negociacao/NegociacaoService.js', '../util/DaoFactory.js', '../ui/converters/DataInvalidaException.js', '../domain/negociacao/Negociacao.js', '../util/Bind.js', '../ui/converters/DateConverter.js'], function (_export, _context) {
    "use strict";

    var Negociacoes, NegociacoesView, Mensagem, MensagemView, NegociacaoService, getNegociacaoDao, DataInvalidaException, Negociacao, Bind, DateConverter;
    return {
        setters: [function (_domainNegociacaoNegociacoesJs) {
            Negociacoes = _domainNegociacaoNegociacoesJs.Negociacoes;
        }, function (_uiViewsNegociacoesViewJs) {
            NegociacoesView = _uiViewsNegociacoesViewJs.NegociacoesView;
        }, function (_uiModelsMensagemJs) {
            Mensagem = _uiModelsMensagemJs.Mensagem;
        }, function (_uiViewsMensagemViewJs) {
            MensagemView = _uiViewsMensagemViewJs.MensagemView;
        }, function (_domainNegociacaoNegociacaoServiceJs) {
            NegociacaoService = _domainNegociacaoNegociacaoServiceJs.NegociacaoService;
        }, function (_utilDaoFactoryJs) {
            getNegociacaoDao = _utilDaoFactoryJs.getNegociacaoDao;
        }, function (_uiConvertersDataInvalidaExceptionJs) {
            DataInvalidaException = _uiConvertersDataInvalidaExceptionJs.DataInvalidaException;
        }, function (_domainNegociacaoNegociacaoJs) {
            Negociacao = _domainNegociacaoNegociacaoJs.Negociacao;
        }, function (_utilBindJs) {
            Bind = _utilBindJs.Bind;
        }, function (_uiConvertersDateConverterJs) {
            DateConverter = _uiConvertersDateConverterJs.DateConverter;
        }],
        execute: function () {
            class NegociacaoController {

                constructor() {
                    let $ = document.querySelector.bind(document);

                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');

                    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adicionar', 'esvazia');

                    this._mensagens = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');

                    this._service = new NegociacaoService();

                    this._init();
                }

                _init() {

                    getNegociacaoDao().then(dao => dao.listaTodos()).then(negociacoes => {

                        negociacoes.forEach(negociacao => {
                            this._negociacoes.adicionar(negociacao);
                        });
                    }).catch(err => this._mensagens.texto = err);
                }

                adicionar(event) {

                    try {
                        event.preventDefault();

                        const negociacao = this._criarNegociacao();

                        getNegociacaoDao().then(dao => dao.adiciona(negociacao)).then(() => {

                            this._negociacoes.adicionar(negociacao);
                            this._mensagens.texto = 'Negociação adicionada com sucesso';
                            this._limparFormulario();
                        }).catch(err => this._mensagens.texto = err);
                    } catch (err) {

                        if (err instanceof DataInvalidaException) this._mensagens.texto = err.message;else this._mensagens.texto = 'Um erro não esperado aconteceu.' + err.message;
                    }
                }

                _limparFormulario() {
                    this._inputData.value = '';
                    this._inputQuantidade.value = 0;
                    this._inputValor.value = 0.0;
                    this._inputData.focus();
                }

                _criarNegociacao() {
                    return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                }

                apagar() {

                    getNegociacaoDao().then(dao => dao.apagaTodos()).then(() => {

                        this._negociacoes.esvazia();
                        this._mensagens.texto = 'Negociação apagadas com sucesso';
                    }).catch(err => this._mensagens.texto = err);
                }

                importaNegociacoes() {

                    this._service.obterNegociacoesDoPeriodo().then(negociacoes => {

                        negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adicionar(negociacao));

                        this._mensagens.texto = 'Negociações importada com sucesso!';
                    }).catch(err => this._mensagens.texto = err);
                }
            }

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map