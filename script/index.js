
const popupElementProfile = document.querySelector('.popup_type_edit-profile')

const closeButtonProfile = document.querySelector('.popup__close-button')


const formElementProfile = document.querySelector('.form')


const nameInput = document.querySelector('.form__input_type_name')
const jobInput = document.querySelector('.form__input_type_job')

const saveButtonProfile = document.querySelector('.form__submit')


const profile = document.querySelector('.profile')


const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];




function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value

  closePopup(popupElementProfile)
}


popupElementProfile.addEventListener('submit', submitEditProfileForm)

editButton.addEventListener('click', () => {
  openPopup(popupElementProfile)

  preValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  }, popupElementProfile)
})


closeButtonProfile.addEventListener('click', () => {
  closePopup(popupElementProfile)
})










const popupElementCard = document.querySelector('.popup_type_add-card')

const closeButtonCard = popupElementCard.querySelector('.popup__close-button')


const formElementCard = popupElementCard.querySelector('.form')


const cardNameInput = formElementCard.querySelector('.form__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.form__input_type_card-url')


const addButton = document.querySelector('.profile__add-button')


const createButtonCard = formElementCard.querySelector('.form__submit')


function submitAddCardForm(evt) {
  evt.preventDefault();

  const newCard = []
  newCard.name = cardNameInput.value
  newCard.link = cardUrlInput.value


  const newCardElement = createCard(newCard)

  addCard(newCardElement)



  cardNameInput.value = ''
  cardUrlInput.value = ''


  closePopup(popupElementCard)
}


popupElementCard.addEventListener('submit', submitAddCardForm)

addButton.addEventListener('click', () => {
  openPopup(popupElementCard)

  preValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  }, popupElementCard)
})


closeButtonCard.addEventListener('click', () => {
  closePopup(popupElementCard)
})











