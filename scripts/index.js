


//Ссыки на карточки
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


import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const form = {
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
const closeButtonProfile = popupElementProfile.querySelector('.popup__close-button')

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
const editButton = profile.querySelector('.profile__edit-button')


// Находим модальное окно CARD
const popupElementCard = document.querySelector('.popup_type_add-card')
// Находим кнопку закрытия модального окна card
const closeButtonCard = popupElementCard.querySelector('.popup__close-button')

// Находим форму card в DOM
const formElementCard = popupElementCard.querySelector('.form')

// Находим поля формы card
const cardNameInput = formElementCard.querySelector('.form__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.form__input_type_card-url')

// Находим кнопку добавить карточку
const addButton = profile.querySelector('.profile__add-button')

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
const closeButtonFullscreen = popupElementFullscreen.querySelector('.popup__close-button')

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

// Объявляем функцию открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opend')
  // Вешаем слушатель события для закрытия по Esc и клику по оверлею
  document.addEventListener('keyup', closeByEsc)
  popup.addEventListener('click', closeByClick)
}

// Объявляем функцию закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opend')
  // При закрытии формы удаляем слушатели
  document.removeEventListener('keyup', closeByEsc)
  popup.removeEventListener('click', closeByClick)
}

// Функция закрытия при нажатии на esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opend')
    closePopup(openedPopup)
  }
}

// Функция закрытия попапа кликом на оверлей 
function closeByClick(evt) {
  if (evt.target.classList.contains('popup_opend')) {
    closePopup(evt.target)
  }
}

// Прикрепляем обработчик к кнопке сохранить в форме profile:
// он будет следить за событием “submit” - «отправка»
popupElementProfile.addEventListener('submit', handleSubmitEditProfileForm)

// Обработка кнопки Редактировать, открываем форму profile
editButton.addEventListener('click', () => {
  openPopup(popupElementProfile)
  popupValitatorProfile.resetValidation()
})

// Обработка кнопки крестика, закрываем форму profile
closeButtonProfile.addEventListener('click', () => {
  closePopup(popupElementProfile)
})

// Прикрепляем обработчик к кнопке сохранить в форме добавления карточки:
// он будет следить за событием “submit” - «отправка»
popupElementCard.addEventListener('submit', handleSubmitAddCardForm)

// Обработка кнопки Редактировать, открываем форму рекдактирования карточки
addButton.addEventListener('click', () => {
  openPopup(popupElementCard)

  popupValitatorCard.resetValidation()
})

// Обработка кнопки крестика, закрываем форму редактирования карточки
closeButtonCard.addEventListener('click', () => {
  closePopup(popupElementCard)
})

// Обработка кнопки крестика, закрываем фуллскрин
closeButtonFullscreen.addEventListener('click', () => {
  closePopup(popupElementFullscreen)
})

// Проходимся по всем элементам, создаем карточки и добавляем их в галерею
initialCards.forEach(element => {
  const cardElement = createCard(element.name, element.link)
  addCard(cardElement);
})


const popupValitatorProfile = new FormValidator(form, popupElementProfile)
popupValitatorProfile.enableValidation()
const popupValitatorCard = new FormValidator(form, popupElementCard)
popupValitatorCard.enableValidation()


function createCard(newCardName, newCardLink) {
  const card = new Card(newCardName, newCardLink, '#card-template', openPopup, handleCardClick)
  return card.generateCard();
}

function handleCardClick(name, link) {
  imageFullscreen.src = link
  imageFullscreen.alt = name
  imageCaption.textContent = name
  openPopup();
}