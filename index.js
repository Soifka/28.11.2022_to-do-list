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
    input.addEventListener('change', checkElement);

    const p = createElement('p', {classNames: ['text', taskIdentifier]});
    p.append(value);

    const img = document.createElement('img');
    img.src = "./images/free-icon-edit-1159633.png";
    img.dataset.id = taskIdentifier;
    img.addEventListener('click', createFieldForChanges);

    const button = createElement('button', {classNames: ['btn-small', 'border-style', taskIdentifier]}, img);
    
    const div = createElement('div', {classNames: ['wrapper', 'border-style']}, input, p, button);
    div.setAttribute('id', taskIdentifier);

    //console.dir(input);

    return div;
}

function addTaskToList(event) {
    event.preventDefault();
    //console.dir(event);
    const inputValue = event.target[0].value;
    const wrapper = createTask(inputValue);
    root.append(wrapper);
    event.target.reset();
}

function checkElement({target}) {  // переписать функцию, добавить проверки --> DONE
    const elem = target.parentElement;

    if(!checkedTaskArray.includes(elem) && target.checked) {
        checkedTaskArray.push(elem);
    }
    
    if(checkedTaskArray.includes(elem) && !target.checked) {
        const index = checkedTaskArray.indexOf(elem);
        checkedTaskArray.splice(index, 1);
    }
}

function createFieldForChanges({target}) {
    const taskId = target.dataset.id;
    const arr = document.getElementsByClassName(taskId);
    for(const item of arr) {
        item.style.display = 'none';
    }

    const input = createElement('input', {classNames: ['inp-change', 'tmp']});
    input.setAttribute('type', 'text');
    //console.dir(input);

    const p = document.querySelector(`p.${taskId}`);
    
    input.value = p.textContent;
    const btnYes = createElement('button', {classNames: ['btn-small', 'border-style', 'tmp']}, 'ok');
    const btnNo = createElement('button', {classNames: ['btn-small', 'border-style', 'tmp']}, 'x');

    const div = document.getElementById(taskId);
    div.append(input, btnYes, btnNo);
    input.focus();

    btnYes.addEventListener('click', confirmChanges);
    btnNo.addEventListener('click', cancelChanges);
}

function confirmChanges({target}) {
    //console.dir(event);
    const {previousElementSibling: {value}} = target;
    //console.log(value);
    const {parentElement: {id}} = target;

    const p = document.querySelector(`p.${id}`);
    p.textContent = value;

    const arrTempItem = document.getElementsByClassName('tmp');
    for(const item of arrTempItem) {
        item.style.display = 'none';
    }

    const arrItem = document.getElementsByClassName(id);
    for(const item of arrItem) {
        item.style.display = 'initial';
    }
}

function cancelChanges({target}) {
    const {parentElement: {id}} = target;

    const arrTempItem = document.getElementsByClassName('tmp');
    for(const item of arrTempItem) {
        item.style.display = 'none';
    }

    const arrItem = document.getElementsByClassName(id);
    for(const item of arrItem) {
        item.style.display = 'initial';
    }
}

function deleteTask() {
    checkedTaskArray.forEach(element => element.remove());
    checkedTaskArray = [];
}

