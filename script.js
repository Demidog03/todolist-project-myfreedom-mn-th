// Нужно при нажатий на кнопку создавать li и добавлять его (вместо с содержимым из инпута) в todoList

const todoInput = document.querySelector('#todoInput')
const todoButton = document.querySelector('#todoButton')
const todoList = document.querySelector('#todoList')

todoButton.addEventListener('click', (event) => {
    event.preventDefault()

    const taskText = todoInput.value.trim()

    if (!taskText) {
        alert('Please enter valid task')
        return
    }

    // Создаем пустой li
    const li = document.createElement('li')
    todoList.prepend(li)

    // Создаем span
    const span = document.createElement('span')
    span.innerText = taskText
    li.appendChild(span)

    // Кнопка удаления задачи
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('removeBtn')
    removeBtn.innerText = 'Remove'
    li.appendChild(removeBtn)

    removeBtn.addEventListener('click', () => {
        li.remove()
    })

    todoInput.value = ''
})