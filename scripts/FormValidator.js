export class FormValidator {
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        

        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }



 // Метод для показа span элемента с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Метод для скрытия span элемента с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // Метод, который проверяет валидность поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            // Если проходит, скроем
            this._hideInputError(inputElement);
        }
    }

    // Функция для проверки наличия невалидного поля
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    // Метод активации/деактивации кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', 'disabled')
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
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