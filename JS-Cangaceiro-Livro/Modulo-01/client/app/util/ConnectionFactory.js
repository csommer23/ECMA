ConnectionFactory = (() => {
    const stores = ['negociacoes'];
    
    let connection = null,
        close = null;
    
    return class ConnectionFactory {
    
        constructor() {
            throw new Error('Não é possível criar instâncias dessa classe')
        }
    
        static getConnection() {
            return new Promise((resolve, reject) => {
    
                if(connection) resolve(connection);
    
                const openRequest = indexedDB.open('jscangaceiro');
    
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };
    
                openRequest.onsuccess = e => {
                    connection = e.target.result;

                    close = connection.close.bind(connection);

                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };

                    resolve(connection);
                };
    
                openRequest.onerror = e => {
                    reject(e.target.error.name);
                };
            });
        }
    
        static _createStores(connection) {
    
            stores.forEach(store => {
                if(connection.objetoStoreNames.contains(store))
                    connection.deleteObjectStore(store);
    
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            
            if(connection)
                close();
        }
    }
})();