
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


//Находим форму, и модуьное окно
const popupElementProfile = document.querySelector('.popup_type_edit-profile')

const closeButtonProfile = popupElementProfile.querySelector('.popup__close-button')


const formElementProfile = popupElementProfile.querySelector('.form')


const nameInput = formElementProfile.querySelector('.form__input_type_name')
const jobInput = formElementProfile.querySelector('.form__input_type_job')


const profile = document.querySelector('.profile')


const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')
const editButton = profile.querySelector('.profile__edit-button')


const popupElementCard = document.querySelector('.popup_type_add-card')

const closeButtonCard = popupElementCard.querySelector('.popup__close-button')


const formElementCard = popupElementCard.querySelector('.form')


const cardNameInput = formElementCard.querySelector('.form__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.form__input_type_card-url')


const addButton = profile.querySelector('.profile__add-button')


const figureElement = document.querySelector('.popup__fullscreen')


const imageFullscreen = figureElement.querySelector('.popup__image')


const imageCaption = figureElement.querySelector('.popup__caption')


const galleryContainer = document.querySelector('.gallery')
const cardTemplate = document.querySelector('#card-template').content


const popupElementFullscreen = document.querySelector('.popup_type_fs')

const closeButtonFullscreen = popupElementFullscreen.querySelector('.popup__close-button')

const cardTemplateElement = cardTemplate.querySelector('.gallery__card')

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value


  closePopup(popupElementProfile)
}
//Добавение карточки
function handleSubmitAddCardForm(evt) {
  evt.preventDefault();

  const newCard = {}
  newCard.name = cardNameInput.value
  newCard.link = cardUrlInput.value


  const newCardElement = createCard(newCard)

  addCard(newCardElement)


  //Пустые поля
  cardNameInput.value = ''
  cardUrlInput.value = ''


  closePopup(popupElementCard)
}


//Добовяем карточку в начало 
function createCard(element) {
  const cardElement = cardTemplateElement.cloneNode(true)
  const cardImage = cardElement.querySelector('.gallery__image')


  cardImage.src = element.link
  cardImage.alt = element.name

  cardElement.querySelector('.gallery__text').textContent = element.name

  const likeButton = cardElement.querySelector('.gallery__like')

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('gallery__like_active')
  })


  const cardDelete = cardElement.querySelector('.gallery__delete')
  cardDelete.addEventListener('click', (evt) => {
    cardDelete.parentElement.remove()
  })


  cardImage.addEventListener('click', () => {
    openPopup(popupElementFullscreen)
    imageFullscreen.src = element.link
    imageFullscreen.alt = element.name
    imageCaption.textContent = element.name
  })

  return cardElement
}

function addCard(cardElement) {

  galleryContainer.prepend(cardElement)
}

//Закрытие попапа через overlay и Escape

function openPopup(popup) {
  popup.classList.add('popup_opend')

  document.addEventListener('keyup', closeByEsc)
  popup.addEventListener('click', closeByClick)
}

function closePopup(popup) {
  popup.classList.remove('popup_opend')
  document.removeEventListener('keyup', closeByEsc)
}


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opend')
    closePopup(openedPopup)
  }
}


function closeByClick(evt) {
  if (evt.target.classList.contains('popup_opend')) {
    const openedPopup = document.querySelector('.popup_opend')
    closePopup(openedPopup)
  }
}


// Прикрепляем обработчик к кнопке сохранить в форме profile:

popupElementProfile.addEventListener('submit', handleSubmitEditProfileForm)


editButton.addEventListener('click', () => {
  openPopup(popupElementProfile)
})


closeButtonProfile.addEventListener('click', () => {
  closePopup(popupElementProfile)
})


popupElementCard.addEventListener('submit', handleSubmitAddCardForm)

// Обработка кнопки Редактировать, открываем форму рекдактирования карточки
addButton.addEventListener('click', () => {
  openPopup(popupElementCard)
})


closeButtonCard.addEventListener('click', () => {
  closePopup(popupElementCard)
})

// Обработка кнопки крестика, закрываем фуллскрин
closeButtonFullscreen.addEventListener('click', () => {
  closePopup(popupElementFullscreen)
})

//  создаем карточки и добавляем их в галерею
initialCards.forEach(element => {
  const newCard = createCard(element)
  addCard(newCard)
})






