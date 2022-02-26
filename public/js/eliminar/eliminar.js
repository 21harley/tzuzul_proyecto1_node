document.querySelector(".main-eliminar").innerHTML+= `<div class="carga"></div>`;
let key=JSON.parse(localStorage.getItem("userKey"));
//console.log(key);
if(key){
const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
};
fetch("/api/read/"+key+"/E",options)
.then(function(respuesta){
    //console.log(respuesta)
    return respuesta.json()
})
.then((data)=>{
    document.querySelector(".carga").remove();
    let cards = document.querySelector(".cardEli");
    //console.log(cards);
    cards.innerHTML="";
    for(let card of data){
        cards.innerHTML+= `
        <div class="cardElim-item item-${card.id}">
            <div class="card-p">
                <p><strong>Titulo:</strong>${card.title}</p>
                <p><strong>Texto:</strong>${card.data_card}</p>
                <p><strong>Fecha Creacion:</strong>${card.date_create}</p>
                <p><strong>Fecha Modificacion:</strong>${card.date_update}</p>
            </div>
            <div class="margin-btn-elim">
                <button class="btn-elim" onclick="consulta('/api/updateCard/${card.id}','PUT',{state:'A'})">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.1767 8.82L31.1783 3.82166C31.0238 3.66659 30.8402 3.54361 30.6379 3.4598C30.4357 3.376 30.2189 3.33301 30 3.33333H9.99998C9.78108 3.33301 9.56427 3.376 9.36204 3.4598C9.15981 3.54361 8.97616 3.66659 8.82165 3.82166L3.82332 8.82C3.6676 8.97445 3.5441 9.1583 3.45998 9.36086C3.37587 9.56342 3.33281 9.78067 3.33332 10V31.6667C3.33332 33.505 4.82832 35 6.66665 35H33.3333C35.1717 35 36.6667 33.505 36.6667 31.6667V10C36.6672 9.78067 36.6241 9.56342 36.54 9.36086C36.4559 9.1583 36.3324 8.97445 36.1767 8.82ZM10.69 6.66666H29.31L30.9767 8.33333H9.02332L10.69 6.66666ZM23.3333 23.3333V28.3333H16.6667V23.3333H11.6667L20 15L28.3333 23.3333H23.3333Z" fill="#398AB9"/>
                    </svg>
                    Retornar Inicio
                </button>
                <button class="btn-elim" onclick="consulta('/api/delete/${card.id}','DELETE',{})">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.75 10.2083H7.29167V29.1667C7.29167 29.9402 7.59896 30.6821 8.14594 31.2291C8.69292 31.776 9.43479 32.0833 10.2083 32.0833H24.7917C25.5652 32.0833 26.3071 31.776 26.8541 31.2291C27.401 30.6821 27.7083 29.9402 27.7083 29.1667V10.2083H8.75ZM14.5833 27.7083H11.6667V14.5833H14.5833V27.7083ZM23.3333 27.7083H20.4167V14.5833H23.3333V27.7083ZM24.2346 5.83333L21.875 2.91666H13.125L10.7654 5.83333H4.375V8.75H30.625V5.83333H24.2346Z" fill="#398AB9"/>
                    </svg>
                    Eliminar
                </button>
            </div>
            <input type="hidden" value="${card.id}">
        </div>`;
    }
})
}
function consulta(ruta,method,objBoby){
const options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objBoby)
};
fetch(ruta,options)
.then(function(respuesta){
    //console.log(respuesta)
    return respuesta.json()
})
.then((data)=>{
    //console.log(data,"mostrar")
    let card=document.querySelector(".item-"+data.id);
    card.classList.add("eliminar-card");
    let rej=setInterval(()=>{
        card.remove();
        clearInterval(rej);
    },1200,card)
})
.catch((error)=>{
    alert(error);
})
}