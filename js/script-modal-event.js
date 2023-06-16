const cards = document.querySelectorAll(".card")
const modal = document.querySelector("dialog")
const closeModal = document.querySelector(".close")
cards.forEach(card => {
    card.onclick = function () {
        var name = card.lastElementChild.innerHTML
        modal.showModal()
        document.querySelector(".event-title").innerHTML = name
    }
})


closeModal.onclick = function () {
    modal.close()
}