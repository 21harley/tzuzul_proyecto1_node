let botonMenu=document.querySelector(".btn-menu");
botonMenu.onclick=()=>{
    console.log("Hola");
    let menu=document.querySelector(".menu");
    menu.classList.toggle("active");
    if(menu.classList.contains("active")){
        botonMenu.innerHTML=`
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8624 7L30 28.1376L27.1376 31L6.00001 9.86238L8.8624 7Z" fill="#EEEEEE"/>
            <path d="M6.00003 28.1376L27.1376 7.00001L30 9.86239L8.86242 31L6.00003 28.1376Z" fill="#EEEEEE"/>
        </svg>
        `;
    }else{
        botonMenu.innerHTML=`
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.75H30V13H6V9.75ZM6 17.875H30V21.125H6V17.875ZM6 26H30V29.25H6V26Z" fill="#EEEEEE"/>
        </svg>
        `;
    }
}