const editProfileButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = popup.querySelector('.popup__close-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const popupInputName = popup.querySelector('.popup__input_profile_name')
const popupInputProfession = popup.querySelector('.popup__input_profile_profession')
const popupForm = popup.querySelector('.popup__form')

function openPopup() {
  popup.classList.add('popup_open')
  popupInputName.value = profileTitle.textContent
  popupInputProfession.value = profileSubtitle.textContent
}

function closePopup(evt) {
    popup.classList.remove('popup_open')
}

function editProfileHandler(evt) {
  evt.preventDefault()
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupInputProfession.value
  closePopup(evt)
}

editProfileButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', editProfileHandler)