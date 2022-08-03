export class FormValidator {
    constructor(validationConfig, formElement) {
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;

        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }





    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };


    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };


    //Взаимодействие с другими элементами DOM//

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Недостающие функции. Вызываем функцию toggleButtonState перед тем как её объявять//

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }


    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', 'disabled')
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled', 'disabled')
        }
    }





    // Добавление обработчиков события input всем полям формы
    _setEventListeners() {

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}



