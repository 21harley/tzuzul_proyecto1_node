fetch("/api/users")
.then(function(respuesta){
return respuesta.json()
})
.then(function(data){
let users = document.getElementById("users");
let key=JSON.parse(localStorage.getItem("userKey"));

for(let user of data){
    users.innerHTML = users.innerHTML + `
        <div class="user-item item-${user.id}">
            <div class="margin-logo-user1 imagen-user-cam-${user.id}">
                 ${
                     (user.urlImg)
                     ?`
                     <img src="${user.urlImg}" alt="imgUser" class="imgUSer" id="imgU-${user.id}"></img>
                     `
                     :`
                    <svg class="logo-user" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3.33333C10.965 3.33333 3.33334 10.965 3.33334 20C3.33334 29.035 10.965 36.6667 20 36.6667C29.035 36.6667 36.6667 29.035 36.6667 20C36.6667 10.965 29.035 3.33333 20 3.33333ZM20 11.6667C22.8783 11.6667 25 13.7867 25 16.6667C25 19.5467 22.8783 21.6667 20 21.6667C17.1233 21.6667 15 19.5467 15 16.6667C15 13.7867 17.1233 11.6667 20 11.6667ZM11.49 27.9533C12.985 25.7533 15.4783 24.2867 18.3333 24.2867H21.6667C24.5233 24.2867 27.015 25.7533 28.51 27.9533C26.38 30.2333 23.3583 31.6667 20 31.6667C16.6417 31.6667 13.62 30.2333 11.49 27.9533Z" fill="#EEEEEE"/>
                    </svg> 
                     `
                 }                   
            </div>
            <div class="user-p">
                <p class="user-data-${user.id}" title="name">Nombre: ${user.name}</p>
                <p class="user-data-${user.id}" title="email">Email: ${user.email}</p>
                <p class="user-data-${user.id}" title="profession">Profesion:${(user.profession)?user.profession:"falta por registrar"}</p>
                <p class="user-data-${user.id}" title="gender">Genero:${(user.gender)?user.gender:"falta por registrar"}</p>
            </div>
            <div class="margin-user-btn">
                <button class="btn-user" onclick="efectoMostrar(${user.id})">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66665 31.6667H23.3333V30C23.3333 25.405 19.595 21.6667 15 21.6667H11.6666C7.07165 21.6667 3.33331 25.405 3.33331 30V31.6667H6.66665ZM13.3333 20C16.6583 20 19.1666 17.4917 19.1666 14.1667C19.1666 10.8417 16.6583 8.33334 13.3333 8.33334C10.0083 8.33334 7.49998 10.8417 7.49998 14.1667C7.49998 17.4917 10.0083 20 13.3333 20Z" fill="#398AB9"/>
                        <path d="M30.3777 27.0956L35.8779 20.5954L33.2654 17.508L27.7653 24.0081C27.6896 24.0977 27.6358 24.2099 27.6096 24.3327L27 28L30.1025 27.2795C30.2067 27.2488 30.302 27.1851 30.3777 27.0956V27.0956ZM37.6534 18.497C37.8753 18.2347 38 17.8789 38 17.508C38 17.137 37.8753 16.7813 37.6534 16.5189L36.7147 15.4096C36.4928 15.1473 36.1917 15 35.8779 15C35.564 15 35.2629 15.1473 35.041 15.4096L34.1023 16.5189L36.7147 19.6064L37.6534 18.497Z" fill="#398AB9"/>
                    </svg>
                Editar
            </button>
            ${
                (user.id==key)
                ?``
                :`
                <button class="btn-user" onclick="eliminarUser(${user.id})">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.49998 14.2533C7.49998 17.5783 10.0083 20.0867 13.3333 20.0867C16.6583 20.0867 19.1666 17.5783 19.1666 14.2533C19.1666 10.9283 16.6583 8.42 13.3333 8.42C10.0083 8.42 7.49998 10.9283 7.49998 14.2533ZM6.66665 31.6667H23.3333V30C23.3333 25.405 19.595 21.6667 15 21.6667H11.6666C7.07165 21.6667 3.33331 25.405 3.33331 30V31.6667H6.66665Z" fill="#398AB9"/>
                        <path d="M28.3334 18.3333H27.7778V27C27.7778 27.3536 27.8949 27.6928 28.1032 27.9428C28.3116 28.1929 28.5942 28.3333 28.8889 28.3333H34.4445C34.7392 28.3333 35.0218 28.1929 35.2301 27.9428C35.4385 27.6928 35.5556 27.3536 35.5556 27V18.3333H28.3334ZM30.5556 26.3333H29.4445V20.3333H30.5556V26.3333ZM33.8889 26.3333H32.7778V20.3333H33.8889V26.3333ZM34.2322 16.3333L33.3334 15H30L29.1011 16.3333H26.6667V17.6667H36.6667V16.3333H34.2322Z" fill="#398AB9"/>
                </svg>
                Eliminar
                 </button>
                `
            }
        </div>
  `
}
})
