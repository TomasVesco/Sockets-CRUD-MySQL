const { options } = require('../DBcfg/mariaDB_conf');
const knex = require('knex')(options);

class ContenedorProducts {

    async getAll() {
        try{
            
            const products = await knex('products');

            return products;

        }catch(err){
            console.log(err);
        }
    }

    async save(newProduct) {
        try{

            const { title, price, image } = newProduct;

            await knex('products').insert({
                title: title,
                price: price,
                image: image
            });
    
        } catch(err) {
            console.log(err);
        }
    }    
}

module.exports = ContenedorProducts;