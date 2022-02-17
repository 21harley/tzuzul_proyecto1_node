const database = require("../database")
class CardController{
    async create(card){
        const results = await database.insert('card',card)
        console.log(results)
        return results
    }
    
    async select(id){
        const results = await database.query(`SELECT * FROM card where id_user=? and state="A"`,id);
        console.log(results)
        return results
    }
    async selectT(id,con){
        const results = await database.query(`SELECT * FROM card where id_user=? and state=?`,[id,con]);
        console.log(results)
        return results
    }

    async update(data,id){
        const results = await database.query(`UPDATE card SET title=?,date_update=?,data_card=? WHERE id=?`,[data.title,data.date_update,data.data_card,id]);
        console.log(results,"base datos")
        return {results,data,id}
    }

    async updateCarD(data,id){
        const results = await database.query(`UPDATE card SET state=? WHERE id=?`,[data.state,id]);
        console.log(results,"base datos")
        return {results,data,id}
    }
    
    async readAll(){
        const users = await database.query("SELECT * FROM card")

        return users
    }

    async delete(id){
        const user = await database.del("card",id)
        return user
    }
}

module.exports = CardController