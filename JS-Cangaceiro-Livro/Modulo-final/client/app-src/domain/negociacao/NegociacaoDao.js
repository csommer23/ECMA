import { Negociacao } from './Negociacao';

export class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        
        return new Promise((resolve, reject) => {

            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => resolve()
            
            request.onerror = e => reject('Não foi possivel inserir o registro')
        });

    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            const negociacoes = [];
            
            const cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {

                const atual = e.target.result;                    

                if(atual) {
                    let obj = atual.value;
                    negociacoes.push(new Negociacao(obj._data,obj._quantidade, obj._valor));
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }

            };

            cursor.onerror = e => reject('Não foi possível listar as negociações')

        });

    }

    apagaTodos() {

        return new Promise((resolve, reject) => {
            
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve();
            
            request.onerror = e => reject('Não foi possivel apagar as negociações');
        });
    }
}