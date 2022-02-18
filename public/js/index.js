let botonMenu=document.querySelector(".btn-menu");
let contador=1;
let idUser=window.location.pathname;
//console.log(idUser);
//console.log(localStorage.getItem("userKey"));
if(localStorage.getItem("userKey")){
    let key=JSON.parse(localStorage.getItem("userKey"));
    //console.log(key);
    if(key){
        let lista=document.querySelectorAll(".A_ruta");
        lista.forEach((el)=>{
            el.setAttribute("href","/app/"+key)
        });
    }
    if(/app/.test(idUser)){
        mostrarCard();
    }
}else{
    if(/app/.test(idUser)){
        idUser=idUser.split("/app/").filter((item)=>{if(item!='') return item});
        localStorage.getItem("userKey");
        localStorage.setItem("userKey",JSON.stringify(idUser[0]))
        mostrarCard();
    }
}
document.addEventListener("click",(e)=>{
    //console.log(e.target.classList)
    if(e.target.matches(".btn-cerrar-login")){
        //console.log("Hola cerrar")
        localStorage.removeItem("userKey");
        window.location.href="/";
    }
    if(e.target.matches(".btn-menu  *")){
        let btnAdd=document.querySelector(".btn-agregar");
        let menu=document.querySelector(".menu");
        let classCambio="";
        if(menu.classList.contains("active")){
            menu.classList.add("desative");
            if(btnAdd) btnAdd.style.display="grid";
            botonMenu.innerHTML=`
            <svg class="btn-m" width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9.75H30V13H6V9.75ZM6 17.875H30V21.125H6V17.875ZM6 26H30V29.25H6V26Z" fill="#EEEEEE"/>
            </svg>
            `;
            let cambio=setInterval(()=>{
                menu.classList.remove("active");
                clearInterval(cambio);
            },400);
        }else{
            menu.classList.add("active");
            if(btnAdd) btnAdd.style.display="none";
            botonMenu.innerHTML=`
            <svg class="btn-m" width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8624 7L30 28.1376L27.1376 31L6.00001 9.86238L8.8624 7Z" fill="#EEEEEE"/>
                <path d="M6.00003 28.1376L27.1376 7.00001L30 9.86239L8.86242 31L6.00003 28.1376Z" fill="#EEEEEE"/>
            </svg>
            `;
            let cambio=setInterval(()=>{
                menu.classList.remove("desative");
                clearInterval(cambio);
            },400);
        }
    }
    if(e.target.matches(".margin-btn-add *")){
        activar_formularioModal();
        btn_formularioModal("grid","none");
    }
    if(e.target.matches(".margin-btn-cer *")||e.target.matches(".margin-btn-cer")){
        cerrarModalFormulario();
    }

    if(e.target.matches(".card-eliminar *")||e.target.matches(".card-eliminar")) eliminarArchivar(e,false);

    if(e.target.matches(".card-archivar *")||e.target.matches(".card-archivar")) eliminarArchivar(e,true);

    if(e.target.matches(".margin-btn-agr *")||e.target.matches(".margin-btn-agr")){
       //consulta a base de datos si es positiva;
       let fecha=new Date().toISOString().slice(0, 10),
           titulo=document.querySelector("#tituloM").value,
           texto=document.querySelector("#textAM").value,
           key=JSON.parse(localStorage.getItem("userKey"));
           //console.log(key);
       const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_user:Number(key),
            date_create:fecha,
            title:titulo,
            state:"A",
            date_update:fecha,
            data_card:texto
        })
      };
      fetch("/api/insert", options)
      .then(response => response.json())
      .then(data => {
        /** Procesar los datos **/
        mostrarCard();
      })
      .catch(error=>{
          alert(error);
      });
      cerrarModalFormulario();
    }
    
    if(e.target.matches(".card-edit *")){
        let data=tomaDatos("."+e.target.attributes[0].value);
        data.push(e.target.attributes[0].value);
        //console.log(data);
        activar_formularioModal(data);
        btn_formularioModal("none","grid");
    }
    if(e.target.matches(".margin-btn-edi *")||e.target.matches(".margin-btn-edi")){
        //si es exitosa el cambio mysql
        let fecha=new Date().toISOString().slice(0, 10),
            titulo=document.querySelector("#tituloM").value,
            texto=document.querySelector("#textAM").value,
            key=document.querySelector("#vlo").value;
            key=key.split("data")[1];
            if(texto.length<45 && titulo.length<45 ){
                const options = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title:titulo,
                        date_update:fecha,
                        data_card:texto
                    })
                };
                fetch(("/api/update/"+key), options)
                .then(response => response.json())
                .then(res => {
                    /** Procesar los datos **/
                   if(res.results.warningStatus==0){
                    let data=[
                        res.data.title,
                        res.data.data_card
                    ]
                    cambioDatos(data,".data"+res.id);
                    }
                   
                })
                .catch(error=>{
                    console.log(error);
                    //alert(error);
                });
            }else{
                alert("Datos introducidos sobre pasa el limite de 45");
            }
            cerrarModalFormulario();
    }
})

function eliminarArchivar(e,tipo){
    let key=e.target.getAttribute("datac").split("data")[1];

    const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              state:(tipo)?"R":"E",
          })
    };
    fetch(("/api/updateCard/"+key), options)
    .then(response => response.json())
    .then(res => {
        let card=document.querySelector(".ra"+res.id);
        card.classList.add("eliminar-card");
        let rej=setInterval(()=>{
            card.remove();
            clearInterval(rej);
        },1200,card)
    })
    .catch(error=>{
        alert(error);
    });
    
}

function cambioDatos(data,nameSelec){
    let datos=document.querySelectorAll(nameSelec);
    datos.forEach((el,index)=>{
        el.innerHTML=data[index];
    })
}
function cerrarModalFormulario(){
    activar_formularioModal();
    document.querySelector("#tituloM").value="";
    document.querySelector("#textAM").value="";
    document.querySelector("#vlo").value="0";
}
function tomaDatos(nameSelec){
    let datos=document.querySelectorAll(nameSelec);
    let data=[]
    datos.forEach((el)=>{
        //console.log(el.innerHTML);
        data.push(el.innerHTML);
    })
    return data;
}

function btn_formularioModal(valorA,valorB){
    document.querySelector(".agregarForm").style.display=valorA;
    document.querySelector(".editarForm").style.display=valorB;
}
function activar_formularioModal(data){
    let formModal=document.querySelector(".formularios-modal");
    if(formModal.classList.contains("activeForm")){
        formModal.classList.add("desative");
        let cambio=setInterval(()=>{
            formModal.classList.remove("activeForm");
            clearInterval(cambio);
        },400);
    }else{
        formModal.classList.add("activeForm");
        if(data){
          document.querySelector("#tituloM").value=data[0];
          document.querySelector("#textAM").value=data[1];
          document.querySelector("#vlo").value=data[2];
        }
        let cambio=setInterval(()=>{
            formModal.classList.remove("desative");
            clearInterval(cambio);
        },400);
    }
}
function mostrarCard(){
    //console.log("hola");
    efectoCarga();
    let key=Number(JSON.parse(localStorage.getItem("userKey")));
    if(key!=undefined && (!Number.isNaN(key))){
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({})
          };
        //console.log(key);
        fetch("/api/read/"+key,options)
        .then(response => response.json())
        .then(data => {
             console.log(data);
             document.querySelector(".carga").remove();
             data.forEach((el)=>{
                 crearCard([
                    el.title,
                    el.id,
                    el.data_card,
                    el.date_create
                 ])
             })
        })
        .catch(error=>{
            alert(error);
        })
    }
}
function crearCard(datos){
  let nuevaCard=`
  <div class="card ra${datos[1]}">
      <div class="card-header">
        <p class="card-header-title data${datos[1]}">${datos[0]}</p>
        <button class="card-edit pencil" dataC="data${datos[1]}" title="editar">
            <svg dataC="data${datos[1]}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path dataC="data${datos[1]}" d="M8.707 19.707L18 10.414L13.586 6L4.293 15.293C4.16506 15.4211 4.07418 15.5814 4.03 15.757L3 21L8.242 19.97C8.418 19.926 8.579 19.835 8.707 19.707ZM21 7.414C21.3749 7.03895 21.5856 6.53033 21.5856 6C21.5856 5.46967 21.3749 4.96106 21 4.586L19.414 3C19.0389 2.62506 18.5303 2.41443 18 2.41443C17.4697 2.41443 16.9611 2.62506 16.586 3L15 4.586L19.414 9L21 7.414Z" fill="#398AB9"/>
            </svg> 
        </button>
      </div>
      <hr class="card-separador">
      <div class="card-body">
         <p class="card-body-contenido data${datos[1]}">${datos[2]}</p>
      </div>
      <div class="card-footer">
           <div class="card-footer-date">
            ${datos[3]}
           </div>
           <button class="card-archivar archivar" dataC="data${datos[1]}" title="archivar">
           <svg dataC="data${datos[1]}" class="archivar-svg" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path dataC="data${datos[1]}" d="M31.6546 7.7175L27.281 3.34396C27.1458 3.20827 26.9851 3.10066 26.8082 3.02733C26.6312 2.954 26.4415 2.91639 26.25 2.91667H8.74999C8.55846 2.91647 8.36878 2.95412 8.19184 3.02744C8.0149 3.10077 7.85419 3.20834 7.71895 3.34396L3.34541 7.7175C3.20928 7.85275 3.10131 8.01363 3.02772 8.19085C2.95412 8.36807 2.91638 8.55811 2.91666 8.75V27.7083C2.91666 29.3169 4.22478 30.625 5.83332 30.625H29.1667C30.7752 30.625 32.0833 29.3169 32.0833 27.7083V8.75C32.0838 8.55809 32.0461 8.36799 31.9725 8.19075C31.8989 8.01351 31.7908 7.85265 31.6546 7.7175ZM9.35374 5.83333H25.6462L27.1046 7.29167H7.89541L9.35374 5.83333ZM17.5 26.25L10.2083 18.9583H14.5833V14.5833H20.4167V18.9583H24.7917L17.5 26.25Z" fill="#398AB9"/>
           </svg>           
           </button>
           <button class="card-eliminar eliminar" dataC="data${datos[1]}" title="eliminar">
                <svg dataC="data${datos[1]}" class="eliminar-svg" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path dataC="data${datos[1]}" d="M8.75 10.2083H7.29167V29.1667C7.29167 29.9402 7.59896 30.6821 8.14594 31.2291C8.69292 31.776 9.43479 32.0833 10.2083 32.0833H24.7917C25.5652 32.0833 26.3071 31.776 26.8541 31.2291C27.401 30.6821 27.7083 29.9402 27.7083 29.1667V10.2083H8.75ZM14.5833 27.7083H11.6667V14.5833H14.5833V27.7083ZM23.3333 27.7083H20.4167V14.5833H23.3333V27.7083ZM24.2346 5.83333L21.875 2.91666H13.125L10.7654 5.83333H4.375V8.75H30.625V5.83333H24.2346Z" fill="#398AB9"/>
                </svg>
           </button>
      </div>
    </div>
  `;
  document.querySelector(".main-container").innerHTML+=nuevaCard;
}
function efectoCarga(){
   document.querySelector(".main-container").innerHTML= `<div class="carga"></div>`;
}