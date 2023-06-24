var $input    = document.getElementById('files'),
    $fileName = document.getElementById('file-name');

    $fileName.addEventListener("click", function(){
      $input.click();
    });

$input.addEventListener('change', function(){
    var nome = "Nenhum arquivo selecionado";
    if($input.files.length > 0) nome = $input.files[0].name;
    $fileName.innerHTML = nome;
});

function post(url, body){

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

function postImage(url, file){
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    let formData = new FormData();

    request.open("POST", url, true);

    formData.append("image", file);

    request.onload = function (){
      if(this.status >=200 && this.status < 300){
        resolve(request.response);
        return request.response;
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
    
    request.send(formData);
  });
}


async function saveEvent(){
  event.preventDefault();
  let url = "http://localhost:8080/events";
  let urlImage = "http://localhost:8080/events/image";

  let nome = document.getElementById("nome").value;
  let data_hora = document.getElementById("data-hora").value;
  let image = document.getElementById("files");
  let descricao = document.getElementById("descricao").value;
  let link = document.getElementById("link").value;
  let contact = document.getElementById("contact").value;

  if(nome == null || data_hora == null || image == null || descricao == null){
    console.log("Insira os campos");
    return;
  }

  var dateParts = data_hora.split('-');
  var formattedDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];

  var pathImage = await postImage(urlImage, image.files[0]);

  console.log("Path ==== " + await pathImage);

  body = {
      "name": nome,
      "date_event": formattedDate,
      "path_img": "API/" + pathImage,
      "description": descricao,
      "external_link": link,
      "contact_number": contact,
      "active": false
  }

  let responsePost = post(url, body);

  console.log(responsePost);
}

