var list = [];
const eventsHtml = document.getElementById("events");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


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
        if(event.active){
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

function showEvent(eventId){
    window.location.href = `info-event.html?id=${eventId}`;
}

eventsHtml.addEventListener('click', function (e) {
    e.preventDefault();

    const eventId = e.target.getAttribute('id-event');
    console.log(eventId);
    if(eventId) {
        showEvent(eventId);
    }
});

getEvents();
  
