
export class FormValidator {
    constructor(form, formElement) {
        this._inputSelector = form.inputSelector;
        this._submitButtonSelector = form.submitButtonSelector;
        this._inactiveButtonClass = form.inactiveButtonClass;
        this._inputErrorClass = form.inputErrorClass;
        this._errorClass = form.errorClass;

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

    _setEventListeners(formElement, classSet) {
        const inputList = Array.from(formElement.querySelectorAll(classSet.inputSelector));
        const buttonElement = formElement.querySelector(classSet.submitButtonSelector)
    
        _toggleButtonState(inputList, buttonElement, classSet);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement, classSet);
                toggleButtonState(inputList, buttonElement, classSet);
            });
        });
    
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    
        formElement.addEventListener('reset', function () {
            setTimeout(function () {
                toggleButtonState(inputList, buttonElement, classSet);
            }, 0);
        });
    };
    




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



