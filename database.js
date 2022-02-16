const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    port:4000,
    user:'root', // 'root'
    password:'root',
    database:'notebook'
})

// Encapsulando con promesas:
function query(sql,data){
    return new Promise((resolve,reject)=>{
        connection.query(sql,data,function(error,result){
            //Error first callback
            if(error){
                reject(error.sqlMessage)
            }else{
                resolve(result)
            }
        })
    })
}

async function insert(tableName,data){
    try{
        await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data),Object.values(data)])
        return {data,success:true}
    }catch(error){
        return {error,success:false}
    }
}

async function updat(tableName,data,id){
    try{
        await query(`UPDATE ${tableName} SET ?? WHERE id=?`,[data,id])
        return {data,success:true}
    }catch(error){
        return {error,success:false}
    }
}

//No podemos usar delete: palabra reservada
async function del(tableName,data){
    try{
        await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
        return data
    }catch(error){
        return error
    }
}

// Exportamos un objeto
module.exports = {query,insert,del,updat}