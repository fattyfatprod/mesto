export class Card {
    // Передаем в конструктор все данные необходимые для создания карточки
    constructor(name, link, templateSelector, openPopup, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        // Передаем функцию для открытия фулскрин
        this._openPopup = openPopup;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            // забираем разметку из HTML и клонируем элемент
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._galleryImage = this._element.querySelector('.gallery__image');
        this._galleryLike = this._element.querySelector('.gallery__like');
        this._galleryDelete = this._element.querySelector('.gallery__delete');
        this._setEventListeners();


        // Подпись карточки
        this._element.querySelector('.gallery__text').textContent = this._name;

        // Присваиваем значения атрибутам картинок
        this._galleryImage.alt = this._name;
        this._galleryImage.src = this._link;


    
        return this._element;
    }

    _setEventListeners() {
        // Добавляем слушатель на кнопку like
        this._galleryLike.addEventListener('click', () => {
            this._handleLikeClick();
        });

        // Добавляем слушатель на кнопку delete
        this._galleryDelete.addEventListener('click', (evt) => {
            this._handleDeleteClick();
        });

        // Добавляем слушатель на открытие в фуллскрин
        this._galleryImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    // Обработчик для кнопки лайк
    _handleLikeClick() {
        this._galleryLike.classList.toggle('gallery__like_active');
    }

    // Обработчик для удаления карточек
    _handleDeleteClick() {
        this._element.remove();
    }
}