const { options } = require('./DBcfg/mariaDB_conf');
const knex = require('knex')(options);

(async () => {

    try{

        await knex.schema.createTable('products', table => {
            table.increments('id');
            table.string('title');
            table.integer('price');
            table.string('description');
            table.string('image');
            table.integer('stock');
            table.string('code');
            table.string('timestamp');
        });
        console.log('Table product created');

    } catch(err) {
        console.log(err);
    } finally {
        knex.destroy();
    }

})();