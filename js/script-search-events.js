
  
async function getEvents(){
    let url = "http://localhost:8080/events?page=1";

    let eventsHtml = document.getElementById("cards");

    const response = await fetch(url);

    if(!response.ok){

        console.log("Erro: " + response.statusText);

    }else{

        const responseBody = await response.json();

        const listEvents = responseBody.events;

        console.log(listEvents);    

        listEvents.forEach(function(event, i) {
           
            if(event.active){
                eventsHtml.innerHTML +=  '     <section class="card">'
                                    + '         <div class="icon">'
                                    + '             <img src="' + event.path_img + '" alt="evento ' + i +'">'
                                    + '         </div>'
                                    + '         <h3>'+ event.name + '</h3>'
                                    + '     </section>';
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", getEvents());
  