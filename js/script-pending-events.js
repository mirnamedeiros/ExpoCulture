var list = [];
const eventsHtml = document.getElementById("events");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const modal = document.getElementById("event-dialog");
const closeModal = document.querySelector(".close");
const contentHtml = document.getElementById("content");


async function getEvents(){
    let url = "http://localhost:8080/events?page=1";

    const response = await fetch(url);

    if(!response.ok){

        console.log("Erro: " + response.statusText);

    }else{

        const responseBody = await response.json();

        const listEvents = responseBody.events;

        list = listEvents; 

        render(list);
    }
}

function search(e){
    const searched = searchInput.value;
    
    const eventsFound = eventsFilterInSearch(searched);

    console.log(eventsFound);

    eventsFound.length > 0 ? render(eventsFound) : eventsHtml.innerHTML = " ";

}

function eventsFilterInSearch(searched){
    return Object.values(list).filter((event) => {
		return event.name.toLowerCase().includes(searched.toLowerCase());
	});
}


searchButton.addEventListener('click', search);

function render(list){

    let listString = '';

    let count = 0;
    list.forEach(function(event, i) {
        if(!event.active){
            if(count == 0){
                listString += `<div class="cards">`;
            }

            listString += `
                        <section class="card" id-event="${event.id}">
                            <div class="icon" id-event="${event.id}">
                                 <img src="${event.path_img}" alt="evento ${i}" id-event="${event.id}">
                            </div>
                            <h3 id-event="${event.id}">${event.name}</h3>
                        </section>
                        `;
            
            count++;

            if(count == 3){
                listString += `</div>`;
                count = 0;
            }

        }
    });
    eventsHtml.innerHTML = listString;
}

async function getEventById(eventId){
    let url = `http://localhost:8080/events/${eventId}`;

    const response = await fetch(url);

    if(!response.ok){

        console.log("Erro: " + response.statusText);

    }else{

        const responseBody = await response.json();

        return responseBody;
    }
}

async function renderDialog(eventId){

    let eventObj = await getEventById(eventId);
    console.log(eventObj);

    let dialogString = `
                <div class="modal-header">
                    <h3 class="event-title">${eventObj.name}</h3>
                    <i class="fa-solid fa-xmark close fa-lg"></i>
                </div>
                <h4>${eventObj.date_event}</h4>
                <p>${eventObj.description}</p>
                <div class="modal-checks">
                    <span id="reject" onclick="closeDialog()"><i class="fa-solid fa-xmark fa-lg"></i><strong>Rejeitar</strong></span>
                    <span id="accept" event-accept="${eventObj.id}"><i class="fa-solid fa-check fa-lg" event-accept="${eventObj.id}"></i><strong event-accept="${eventObj.id}">Aceitar</strong></span>
                </div>
            `;

    modal.innerHTML = dialogString;
}

function openModal(eventId){
    renderDialog(eventId);
    modal.showModal();
}

function closeDialog(){
    modal.close();
}

async function activeEvent(eventId){
    let url = `http://localhost:8080/events/${eventId}`;

    const response = await fetch(url, {
        method: 'PUT'
    });

    if(!response.ok){
        console.log("Erro: " + response.statusText);
    }else{
        const responseBody = await response.json();
        getEvents();
        console.log("Sucesso: " + responseBody.mensagem);
    }
    modal.close();
}

contentHtml.addEventListener('click', function (e) {
    e.preventDefault();

    const eventId = e.target.getAttribute('id-event');
    const eventAcceptId = e.target.getAttribute('event-accept');
    if(eventId) {
        openModal(eventId);
    }else if(eventAcceptId){
        activeEvent(eventAcceptId);
    }
    else {
        modal.close();
    }
});



getEvents();
  
  