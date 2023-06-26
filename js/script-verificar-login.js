function checkedLogin() {
    if(window.localStorage.getItem("userLogado")){
        console.log("Logado");
    }else{
        window.location.href='login.html';
    }
}

checkedLogin();