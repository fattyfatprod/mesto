// Находим модальное окно PROFILE
const popupElementProfile = document.querySelector('.popup_type_edit-profile')
// Находим кнопку закрытия модального окна профиля
const closeButtonProfile = popupElementProfile.querySelector('.popup__close-button')

// Находим форму профиля в DOM
const formElementProfile = popupElementProfile.querySelector('.form')

// Находим поля формы профиля
const nameInput = formElementProfile.querySelector('.form__input_type_name')
const jobInput = formElementProfile.querySelector('.form__input_type_job')
// Находим кнопку формы профиля
const saveButtonProfile = formElementProfile.querySelector('.form__submit')

// Находим профайл в DOM 
const profile = document.querySelector('.profile')

// Находим элементы в профайле
const profileName = profile.querySelector('.profile__name')
const profileJob = profile.querySelector('.profile__job')
const editButton = profile.querySelector('.profile__edit-button')

// Функция открытия поп-апа profile
function openPopupProfile() {
  openPopup(popupElementProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
}

// Обработчик «отправки» формы profile
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Заменяем текст в элементах профиля на введенное содержимое полей ввода
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value

  // При сохранении данных из формы, нужно ее закрыть
  closePopup(popupElementProfile)
}

// Прикрепляем обработчик к кнопке сохранить в форме profile:
// он будет следить за событием “submit” - «отправка»
popupElementProfile.addEventListener('submit', submitEditProfileForm)

// Обработка кнопки Редактировать, открываем форму profile
editButton.addEventListener('click', () => {
  openPopup(popupElementProfile)
} )

// Обработка кнопки крестика, закрываем форму profile
closeButtonProfile.addEventListener('click', ()=> {
  closePopup(popupElementProfile)
})


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

// Находим кнопку сохранения формы card
const createButtonCard = formElementCard.querySelector('.form__submit')

// Обработчик «отправки» формы Card
function submitAddCardForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  const newCard = []
  newCard.name = cardNameInput.value
  newCard.link = cardUrlInput.value

  // Вызываем функцию создания новой карточки и передаем ей новый объект на вход
  const newCardElement = createCard(newCard)
// Добавляем новую карточку в начало галереи 
  addCard(newCardElement)


  // Очищаем поля ввода
  cardNameInput.value = ''
  cardUrlInput.value = ''

  // При сохранении данных из формы, нужно ее закрыть
  closePopup(popupElementCard)
}

// Прикрепляем обработчик к кнопке сохранить в форме добавления карточки:
// он будет следить за событием “submit” - «отправка»
popupElementCard.addEventListener('submit', submitAddCardForm)


// Обработка кнопки Редактировать, открываем форму рекдактирования карточки
addButton.addEventListener('click', () => {
  openPopup(popupElementCard)
})

// Обработка кнопки крестика, закрываем форму редактирования карточки
closeButtonCard.addEventListener('click', ()=> {
  closePopup(popupElementCard)
})




// Находим модальное окно FULLSCREEN
const popupElementFullscreen = document.querySelector('.popup_type_fs')
// Находим кнопку закрытия модального окна card
const closeButtonFullscreen = popupElementFullscreen.querySelector('.popup__close-button')

// Обработка кнопки крестика, закрываем фуллскрин
closeButtonFullscreen.addEventListener('click', ()=> {
  closePopup(popupElementFullscreen)
})


// Находим элемент figure
const figureElement = document.querySelector('.popup__fullscreen')

// Находим элемент фулскрин картинку
const imageFullscreen = figureElement.querySelector('.popup__image')

// Находим элемент подпись к фулскрин картинке
const imageCaption = figureElement.querySelector('.popup__caption')

//   Добавляем 6 карточек из "коробки" через JavaScript
const galleryContainer = document.querySelector('.gallery')
const cardTemplate = document.querySelector('#card-template').content


// Объявляем функцию для создания карточки
function createCard(element) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true)
  const cardImage = cardElement.querySelector('.gallery__image')

  // Присваиваем значения атрибутам картинок
  cardImage.src = element.link
  cardImage.alt = element.name

  // Подпись карточки
  cardElement.querySelector('.gallery__text').textContent = element.name

  // Добавляем слушатель на кнопку лайк
  const cardLike = cardElement.querySelector('.gallery__like')
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like_active')
  })

  // Добавляем слушатель на кнопку удалить
  const cardDelete = cardElement.querySelector('.gallery__delete')
  cardDelete.addEventListener('click', (evt) => {
    evt.target.parentElement.remove()
  })

  // Добавляем слушатель на открытие в фуллскрин
  cardImage.addEventListener('click', () => {
    openPopup(popupElementFullscreen)
    imageFullscreen.src = element.link
    imageFullscreen.alt = element.name
    imageCaption.textContent = element.name
  })

  return cardElement
}

function addCard(cardElement) {
  // Добавляем карточку в начало галереи
  galleryContainer.prepend(cardElement)
}


// Проходимся по всем элементам, создаем карточки и добавляем их в галерею
initialCards.forEach(element => {
  const newCard = createCard(element)
  addCard(newCard)
})


// Объявляем функцию закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opend')
}

// Объявляем функцию открытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opend')
}