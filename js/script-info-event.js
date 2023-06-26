var eventObj = {};
const eventInfoHtml = document.getElementById("event-info");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


async function getEvent(){
    let url = `http://localhost:8080/events/${id}`;

    const response = await fetch(url);

    if(!response.ok){

        console.log("Erro: " + response.statusText);

    }else{

        const responseBody = await response.json();

        eventObj = responseBody;

        render(eventObj);
    }
}

function render(eventObj){

    let eventInfoString = '';


    eventInfoString += `
                    <div id="week" class="week-text col-6">
                        <p class="text subtitle color-1"> ${eventObj.name}</p>
                    </div>
                    <div class="info">
                        <img src="${eventObj.path_img}" alt="imagem do evento ${eventObj.name}">
                        <div class="info-text">
                            <p class="text">${eventObj.description}</p>
                            <p class="text">${eventObj.date_event}</p>
                            <a class="text" href="${eventObj.external_link}">Saiba mais</a>
                        <div>
                    </div>
                `;

    eventInfoHtml.innerHTML = eventInfoString;
}

getEvent();