let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#edit_traveler');
let jobInput = formElement.querySelector('#edit_vocation');
let profileTraveler = document.querySelector('.profile__traveler');
let profileVocation = document.querySelector('.profile__vocation');
let formOpener = document.querySelector('.profile__edit');
let content = document.querySelector('.popup');
let formCloser = document.querySelector('.popup__closebutton');

function popupOpened() {
    content.classList.add('popup_opened');
    nameInput.value = profileTraveler.textContent;
    jobInput.value = profileVocation.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTraveler.textContent = nameInput.value;
    profileVocation.textContent = jobInput.value;
    popupClosed();
}

function popupClosed() {
    content.classList.remove('popup_opened');
}

formOpener.addEventListener('click', popupOpened);
formElement.addEventListener('submit', formSubmitHandler);
formCloser.addEventListener('click', popupClosed);