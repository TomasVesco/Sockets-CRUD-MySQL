const { SQLite3_options } = require('../DBcfg/SQLite3_conf');
const knex = require('knex')(SQLite3_options);

class ContenedorMensajes {

    async getAll() {
        try{

            const messages = await knex('messages');

            return messages;

        }catch(err){
            console.log(err);
        }
    }

    async save(newMessage) {
        try{

            const { author, date, text } = newMessage;

            await knex('messages').insert({
                author: author,
                text: text,
                timestamp: date
            });
    
        } catch(err) {
            console.log(err);
        }
    }  
}

module.exports = ContenedorMensajes;

// try{

//     await knex.schema.createTable('messages', table => {
//         table.increments('id');
//         table.string('author');
//         table.string('text');
//         table.string('timestamp');
//     });
//     console.log('Table messages created');

// }catch(err){
//     console.log(err);
// }finally{
//     knex.destroy();
// }