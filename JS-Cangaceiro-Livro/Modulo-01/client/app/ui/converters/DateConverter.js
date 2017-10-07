class DateConverter {

    constructor() {
        throw new Error('Esta class não pode ser instanciada');
    }

    static paraTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static paraData(texto) {       
         
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('O formato da data deve ser aaaa-mm-dd');

        return new Date(
            ...texto.split('-')
            .map((item, indece) => item - indece % 2 )
        );
    }
}