class NegociacaoController {

    adicionar(event) {
        event.preventDefault();

        let data = document.querySelector('#data'),
            quantidade = document.querySelector('#quantidade'),
            valor = document.querySelector('#valor');
    
        console.log(data.value);
        console.log(quantidade.value);
        console.log(valor.value);
    }
}