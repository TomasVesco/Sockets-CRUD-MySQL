const { options } = require('../DBcfg/mariaDB_conf');
const knex = require('knex')(options);

class ContenedorProducts {

    async save() {
        try{

            
    
        } catch(err) {
            console.log(err);
        } finally {
            knex.destroy();
        }
    }    
}

module.exports = ContenedorProducts;