System.register(['./ApplicationException.js'], function (_export, _context) {
    "use strict";

    var ApplicationException;
    return {
        setters: [function (_ApplicationExceptionJs) {
            ApplicationException = _ApplicationExceptionJs.ApplicationException;
        }],
        execute: function () {
            class DataInvalidaException extends ApplicationException {

                constructor() {
                    super('A data deve estar no formato dd/mm/aaaa');
                }
            }

            _export('DataInvalidaException', DataInvalidaException);
        }
    };
});
//# sourceMappingURL=DataInvalidaException.js.map