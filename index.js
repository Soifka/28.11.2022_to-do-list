'use strict';

const root = document.querySelector('.task-list');
const addForm = document.querySelector('.add-task');
addForm.addEventListener('submit', addTaskToList);

const btnDelete = document.querySelector('#del');
btnDelete.addEventListener('click', deleteTask);

let checkedTaskArray = [];

function createElement(type, {classNames}, ...nodes) {
    const element = document.createElement(type);
    element.classList.add(...classNames);
    element.append(...nodes);

    return element;
}

function createTask(value) {
    const taskIdentifier = `task-${Date.now()}`;
    const input = createElement('input', {classNames: ['check-task', 'border-style']});
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', checkElement); // решить проблему с событием, нужно что-то другое вместо фокуса

    const p = createElement('p', {classNames: ['text', taskIdentifier]});
    p.append(value);

    const img = document.createElement('img');
    img.src = "./images/free-icon-edit-1159633.png";
    img.dataset.id = taskIdentifier;
    img.addEventListener('click', toHide);

    const button = createElement('button', {classNames: ['btn-small', 'border-style', taskIdentifier]}, img);
    
    const div = createElement('div', {classNames: ['wrapper', 'border-style']}, input, p, button);
    div.setAttribute('id', taskIdentifier);

    console.dir(input);

    return div;
}

function addTaskToList(event) {
    event.preventDefault();
    console.dir(event);
    const inputValue = event.target[0].value;
    const wrapper = createTask(inputValue);
    root.append(wrapper);
    //event.target[0].value = ''; // event.target.reset() заменить?
    event.target.reset();
}

function checkElement(event) {  // переписать функцию, добавить проверки
    const elem = event.target.parentElement;
    checkedTaskArray.push(elem);
}

function toHide({target}) {
    const taskId = target.dataset.id;
    //const text = document.querySelector(`p.${taskId}`);
    const arr = document.getElementsByClassName(taskId);
    for(const item of arr) {
        item.style.display = 'none';
    }

    const inp = createElement('input', {classNames: ['inp-change', 'tmp']});
    inp.setAttribute('type', 'text');
    //inp.autofocus = true;
    const p = document.querySelector(`p.${taskId}`);
    console.dir(inp);
    inp.value = p.textContent;
    //inp.autofocus = 'true';
    const btnYes = createElement('button', {classNames: ['btn-small', 'border-style', 'tmp']}, 'ok');
    const btnNo = createElement('button', {classNames: ['btn-small', 'border-style', 'tmp']}, 'x');

    const div = document.getElementById(taskId);
    div.append(inp, btnYes, btnNo);
    inp.focus();

    btnYes.addEventListener('click', confirmChanges);
    btnNo.addEventListener('click', cancelChanges);
}

function confirmChanges({target}) {
    console.dir(event);
    const {previousElementSibling: {value}} = target;
    console.log(value);
    const {parentElement: {id}} = target;

    const p = document.querySelector(`p.${id}`);
    p.textContent = value;

    const arrTempItem = document.getElementsByClassName('tmp');
    for(const item of arrTempItem) {
        item.style.display = 'none';
    }

    const arr = document.getElementsByClassName(id);
    for(const item of arr) {
        item.style.display = 'initial';
    }
}

function cancelChanges({target}) {
    const {parentElement: {id}} = target;

    const arrTempItem = document.getElementsByClassName('tmp');
    for(const item of arrTempItem) {
        item.style.display = 'none';
    }

    const arr = document.getElementsByClassName(id);
    for(const item of arr) {
        item.style.display = 'initial';
    }
}

function createChangeForm(event) {
    const input = createElement('input', {classNames: ['inp', 'border-style']});
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'enter-changes');
    //input.value = checkedTaskArray[0].children[1].textContent;
    
    for(const item of checkedTaskArray) {
        input.value = item.children[1].textContent;
    }

    const button = createElement('button', {classNames: ['btn', 'border-style']});
    button.setAttribute('type', 'submit');
    button.append('Save changes');

    const changeForm = createElement('form', {classNames: ['change-task']}, input, button);

    root.append(changeForm);
}

function deleteTask() {
    checkedTaskArray.forEach(element => element.remove());
    checkedTaskArray = [];
}

