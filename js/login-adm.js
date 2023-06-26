var form = document.getElementById("form-adm");

form.addEventListener('submit', login);


async function login(event){
    event.preventDefault(); 
    console.log("entrou");
    let url = "http://localhost:8080/users/login";

    const login = document.getElementById("login").value;
    const password = document.getElementById("senha").value;

    let body = {
        login,
        password
    }

    let request = new XMLHttpRequest();
  
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
    request.send(JSON.stringify(body));

    request.onload = function (){
        if(this.status >=200 && this.status < 300){
            window.localStorage.setItem("userLogado", login);
            console.log(window.localStorage);
            console.log(this.responseText);
            window.location.href='pending-events.html';
        }
      };
    
    request.onerror = function () {
        console.log(this.responseText);
    };
    
      
    return request.responseText;
}

function post(){

    let request = new XMLHttpRequest();
  
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
    request.send(JSON.stringify(body));
  
    request.onload = function (){
      if(this.status >=200 && this.status < 300){
        console.log(this.responseText);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText
        });
      }
    };
  
    request.onerror = function () {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    };
  
    
    return request.responseText;
  
  }