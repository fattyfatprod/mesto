//отвечает за открытие и закрытие попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    //открытие попапа
    open() {
        this._popup.classList.add('popup_opend')
        document.addEventListener('keyup', _handleEscClose) //добавляем слушатель закрытия по нажатию на Esc
        this._popup.addEventListener('click', _closeByOverlayClick) //проверить на потерю контента. Добавляем слушатель закрытия по клику на оверлей
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_opend')
        document.removeEventListener('keyup', _handleEscClose)
        this._popup.removeEventListener('click', _closeByOverlayClick)
    }

    setEventListeners() {
        //закрытие попапа по кнопке-крестику
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close()
        })
    }
    // логика закрытия попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    // логика закрытия попапа кликом по overlay
    _closeByOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opend')) {
            this.close()
        }
    }
}