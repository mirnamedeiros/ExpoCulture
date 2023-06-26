var list = [];
const eventsHtml = document.getElementById("cards");


async function getEvents(){
    let url = "http://localhost:8080/events?starterDate=2023-06-25&endDate=2023-07-02";

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

function render(list){

    let listString = '';

    let count = 0;
    list.forEach(function(event, i) {
        if(event.active){
            if(count <= 2){
                listString += `
                            <section class="card" id-event="${event.id}">
                                <div class="icon" id-event="${event.id}">
                                    <img src="${event.path_img}" alt="evento ${i}" id-event="${event.id}">
                                </div>
                                <h3 id-event="${event.id}">${event.name}</h3>
                            </section>
                            `;
            }

            count++;
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
  