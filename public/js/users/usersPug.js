function eliminarUser(id){
    let resp=confirm("¿Esta Seguro :v no hay vuelta atras x.x ?");
    //console.log(resp);
    if(resp){
        consultaES("/api/read/cards/"+id,"POST",{});
    }
}

function editarUserAcetar(){
    let datosForm=document.querySelectorAll(".user-item-edi");
    //console.log(datosForm);
    let objBoby=new Object();
    let im=document.querySelector(".user-item-edi-link"),idUser=0;
    //console.log(im.value);
    if(im.value.length<500){
        objBoby.urlImg=(im.value.length>0)?im.value:"";
        datosForm.forEach((el,index)=>{
            switch(index+1){
                case 1:
                    objBoby.name=(el.value)?el.value:"";
                break;
                case 2:
                    objBoby.email=el.value;
                break;
                case 3:
                    objBoby.profession=(el.value!="falta por registrar")?el.value:"";
                break;
                case 4:
                    objBoby.gender=(el.value)?el.value:"";
                break;
                case 5:
                   idUser=el.value;
                break;
            }
            
            //console.log(el.value);
        })
    
        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(objBoby)
        };
        fetch("/api/users/update/"+idUser,options)
        .then(function(respuesta){
            return respuesta.json()
        })
        .then((data)=>{
            console.log(data);
            let lista=document.querySelectorAll(".user-data-"+data.id);
            let nombres={"name":"Nombre","email":"Email","profession":"Profesion","gender":"Genero"};
            lista.forEach((el)=>{
               let auxTitulo=el.getAttribute("title");
               el.innerHTML=nombres[auxTitulo]+": \n "+data.data[auxTitulo];
            })
            let cambio=document.querySelector(".imagen-user-cam-"+data.id);
            cambio.innerHTML=` <img src="${data.data.urlImg}" alt="imgUser" class="imgUSer" id="imgU-${data.id}"></img>`
        })
    }else{
        alert("Ruta de imagen supera los 500 caracteres por favor buscar una ruta mas corta (ruta<500)");
    }
    cerrarModal();
}

function efectoMostrar(id){
  editarUser(id);
  activar_formularioModal_edit_user();
}

function cerrarModal(){
    activar_formularioModal_edit_user();
    let datosForm=document.querySelectorAll(".user-item-edi");
    datosForm.forEach((el,index)=>{
       if(index==3){
           el.innerHTML="";
       }else{
           el.value="";
       }
    })
    document.querySelector(".user-item-edi-link").value="";
    document.querySelector(".user-id").value="";
}

function editarUser(id){
    let datos=document.querySelectorAll(".user-data-"+id);
    let datosForm=document.querySelectorAll(".user-item-edi");
    datos.forEach((el,index)=>{
       if(index==3){
           let optionsDatos=["","Mujer","Hombre","Otr@"];
           let genero=datos[index].innerHTML.split(":")[1];
           optionsDatos.forEach((elOp)=>{
               let option=document.createElement("option");
               option.innerHTML=elOp;
               //console.log(genero,el.innerHTML.split(":")[1]);
               if(genero==elOp){
                option.setAttribute("selected", "selected");
               }
               datosForm[index].append(option);
           })
       }else{
        datosForm[index].value=datos[index].innerHTML.split(":")[1];
       }
       //console.log(el.innerHTML.split(":"));
    })
    document.querySelector(".user-item-edi-link").value=(document.querySelector("#imgU-"+id))?document.querySelector("#imgU-"+id).getAttribute("src"):"falta por registrar";
    document.querySelector(".user-id").value=id;
}


function activar_formularioModal_edit_user(){
    let formModal=document.querySelector(".margin-formulario-modal");
    //console.log(formModal);
  if(formModal.classList.contains("active-form-edi")){
    formModal.classList.add("desative-form-edi");
    let cambio=setInterval(()=>{
        formModal.classList.remove("active-form-edi");
        clearInterval(cambio);
    },400);
 }else{
    formModal.classList.add("active-form-edi");
    let cambio=setInterval(()=>{
        formModal.classList.remove("desative-form-edi");
        clearInterval(cambio);
    },400);
  }

}

function consulta(ruta,method,objBoby,id){
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
        //console.log(data)
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

function consultaES(ruta,method,objBoby,id){
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
         if(data.resultado.length>0){
            alert("No se puede eliminar un usuario con card resgistradas, elimine las card y despues el usuario");
         }else{
             //console.log(data,"Se puede eliminar",data.id);
            consulta("/api/users/delete/"+data.id,"DELETE",{},data.id);
         }
    })
    .catch((error)=>{
        alert(error);
    })
}