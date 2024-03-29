import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import  Section  from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";




const data = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}


// Находим модальное окно PROFILE
const popupElementProfile = document.querySelector('.popup_type_edit-profile')
// Находим кнопку закрытия окна профиля
const popupProfilecloseButton = popupElementProfile.querySelector('.popup__close-button')

// Находим форму профиля в DOM
const formElementProfile = popupElementProfile.querySelector('.form')

// Находим поля формы профиля
const nameInput = formElementProfile.querySelector('.form__input_type_name')
const jobInput = formElementProfile.querySelector('.form__input_type_job')

// Находим профайл в DOM 
const profile = document.querySelector('.profile')

// Находим элементы в профайле
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')
const profileEditButton = profile.querySelector('.profile__edit-button')


// Находим модальное окно CARD
const popupElementCard = document.querySelector('.popup_type_add-card')
// Находим кнопку закрытия модального окна card
const popupCardcloseButton = popupElementCard.querySelector('.popup__close-button')

// Находим форму card в DOM
const formElementCard = popupElementCard.querySelector('.form')

// Находим поля формы card
const cardNameInput = formElementCard.querySelector('.form__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.form__input_type_card-url')

// Находим кнопку добавить карточку
const profileAddButton = profile.querySelector('.profile__add-button')

// Находим элемент figure
const figureElement = document.querySelector('.popup__fullscreen')

// Находим элемент фулскрин 
const imageFullscreen = figureElement.querySelector('.popup__image')

// Находим элемент подпись к фулскрин 
const imageCaption = figureElement.querySelector('.popup__caption')

//   Добавляем 6 карточек 
const galleryContainer = document.querySelector('.gallery')
const cardTemplate = document.querySelector('#card-template').content

// Находим модальное окно FULLSCREEN
const popupElementFullscreen = document.querySelector('.popup_type_fs')
// Находим кнопку закрытия модального окна card
const popupFullscreencloseButton = popupElementFullscreen.querySelector('.popup__close-button')

// Обработчик «отправки» формы profile
function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();

  // Заменяем текст в элементах профиля на введенное содержимое полей ввода
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value

  // При сохранении данных из формы, нужно ее закрыть
  closePopup(popupElementProfile)
}

// Обработчик «отправки» формы Card
function handleSubmitAddCardForm(evt) {
  evt.preventDefault();

  const newCard = {}
  newCard.name = cardNameInput.value
  newCard.link = cardUrlInput.value

  const cardElement = createCard(newCard.name, newCard.link)

  // Добавляем новую карточку в начало галереи 
  addCard(cardElement)

  // Очищаем поля ввода
  evt.target.reset()

  // Закрытие формы
  closePopup(popupElementCard)
}

function addCard(cardElement) {
  // Добавляем карточку в начало галереи
  galleryContainer.prepend(cardElement)
}
 

// Прикрепляем обработчик к кнопке сохранить в форме profile:
// он будет следить за событием “submit” - «отправка»
popupElementProfile.addEventListener('submit', handleSubmitEditProfileForm)

// Обработка кнопки Редактировать, открываем форму profile
profileEditButton.addEventListener('click', () => {
  openPopup(popupElementProfile)
  popupValitatorProfile.resetValidation()
})

// Обработка кнопки крестика, закрываем форму profile
popupProfilecloseButton.addEventListener('click', () => {
  closePopup(popupElementProfile)
})

// Прикрепляем обработчик к кнопке сохранить в форме добавления карточки:
// он будет следить за событием “submit” - «отправка»
popupElementCard.addEventListener('submit', handleSubmitAddCardForm)

// Обработка кнопки Редактировать, открываем форму рекдактирования карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupElementCard)

  popupValitatorCard.resetValidation()
})

// Обработка кнопки крестика, закрываем форму редактирования карточки
popupCardcloseButton.addEventListener('click', () => {
  closePopup(popupElementCard)
})

// Обработка кнопки крестика, закрываем фуллскрин
popupFullscreencloseButton.addEventListener('click', () => {
  closePopup(popupElementFullscreen)
})

// Проходимся по всем элементам, создаем карточки и добавляем их в галерею

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link)
    section.addItem(cardElement);
  }
}, '.gallery');

section.renderItems()


//Переносим данные из формвалидатор

const popupValitatorProfile = new FormValidator(data, popupElementProfile)
popupValitatorProfile.enableValidation()
const popupValitatorCard = new FormValidator(data, popupElementCard)
popupValitatorCard.enableValidation()

//Объявяем функцию новой ваилидной карточки 
function createCard(newCardName, newCardLink) {
  const card = new Card(newCardName, newCardLink, '#card-template',  handleCardClick,)
  
  return card.generateCard();

}

//Переносим данные в попап
const popupWithImage = new PopupWithImage('.popup_type_fs')
function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}
export {imageFullscreen, imageCaption}
