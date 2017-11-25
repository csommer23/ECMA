System.register(['./controllers/NegociacaoController.js'], function (_export, _context) {
      "use strict";

      var NegociacaoController;
      return {
            setters: [function (_controllersNegociacaoControllerJs) {
                  NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
            }],
            execute: function () {

                  const controller = new NegociacaoController(),
                        $ = document.querySelector.bind(document);

                  $('.form').addEventListener('submit', controller.adicionar.bind(controller));

                  $('#botao-apaga').addEventListener('click', controller.apagar.bind(controller));

                  $('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));
            }
      };
});
//# sourceMappingURL=app.js.map