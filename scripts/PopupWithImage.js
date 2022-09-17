import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imageFullscreen = this._popup.querySelector('.popup__image')
        this._imageCaption = this._popup.querySelector('.popup__caption')
    }

    //Вставляем в попап картинку с src изображения и подписью к картинке и открываем попап
    open(name, link) {
        this._imageFullscreen.src = name
        this._imageFullscreen.alt = link
        this._imageCaption.textContent = name
        super.open()
    }
}