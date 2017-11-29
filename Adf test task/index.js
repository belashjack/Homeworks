'use strict'
let newEmployeeBtn = document.getElementById('addNewEmployee');
let popupContainer = document.getElementById('popupContainer');
let cancelBtn = document.getElementById('cancelBtn');
let nameInput = document.forms[0].name;
let lastNameInput = document.forms[0]['lastname'];
// let positionInput = document.forms[0]['position'];
let vacationStartInput = document.forms[0]['startRate'];
let vacationEndInput = document.forms[0]['endDate'];


newEmployeeBtn.addEventListener('click', showForm);
popupContainer.addEventListener('click', closeForm);
cancelBtn.addEventListener('click', closeForm);

nameInput.addEventListener('blur', checkTextField);
lastNameInput.addEventListener('blur', checkTextField);

function checkTextField() {
    if (event.target.value === '') {
        let elem = document.createElement('div');
        elem.className = 'form-group col-sm-12';
        console.log(event.target);
        if (event.target.id === 'name') {
            elem.innerHTML = '<p for="startDate" class="col-sm-4 col-form-label">Введите имя</p>';
        } else {
            elem.innerHTML = '<p for="startDate" class="col-sm-4 col-form-label">Введите фамилию</p>';
        }
        elem.style.backgroundColor = 'beige';
        elem.style.color = 'red';
        document.forms[0].appendChild(elem);
    }
}

function showForm() {
    // показать форму
    popupContainer.style.display = 'block';
    // фокус на первом input
    document.forms[0].firstElementChild.children[1].firstElementChild.focus();
}
function closeForm(event) {
    if (event.target === this || event.target === cancelBtn) {
        popupContainer.style.display = 'none';
        return true;
    }
    else {
        return false;
    }
}