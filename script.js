// Нужно при нажатий на кнопку создавать li и добавлять его (вместо с содержимым из инпута) в todoList

const todoInput = document.querySelector('#todoInput')
const todoButton = document.querySelector('#todoButton')
const todoList = document.querySelector('#todoList')

// Initial Render - Первичная отрисовка
render()

todoButton.addEventListener('click', (event) => {
    event.preventDefault()

    addNewTaskToLS()

    // Re-render - Повторная отрисовка
    render()
})

function addNewTaskToLS() {
    const taskText = todoInput.value.trim()

    // Сохраняем данные в localStorage
    const oldTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    oldTasks.push(
        {
            id: Date.now() + Math.random() * 100,
            text: taskText,
            status: 'Working'
        }
    )
    const updatedTasks = JSON.stringify(oldTasks)
    localStorage.setItem('tasks', updatedTasks)

    todoInput.value = ''
}

function removeTaskToLS(task) {
    const oldTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const updatedTasks = JSON.stringify(oldTasks.filter(t => t.id !== task.id))
    localStorage.setItem('tasks', updatedTasks)
}

function changeTaskStatus(task, newStatus) {
    const oldTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const taskToUpdate = oldTasks.find(t => t.id === task.id)
    taskToUpdate.status = newStatus
    localStorage.setItem('tasks', JSON.stringify(oldTasks))
}

function render() {
    // Очистка списка
    todoList.innerHTML = ''

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach(task => {
        if (!task) {
            alert('Please enter valid task')
            return
        }

        // Создаем пустой li
        const li = document.createElement('li')
        todoList.prepend(li)

        // Создаем span
        const span = document.createElement('span')
        span.innerText = task.text
        li.appendChild(span)

        // Создать buttonsContainer
        const buttonsContainer = document.createElement('div')
        buttonsContainer.classList.add('buttonsContainer')

        // Создать кнопку Working или Done
        if (task.status === 'Working') {
            const workingBtn = document.createElement('button')
            workingBtn.classList.add('workingBtn')
            workingBtn.innerText = 'Working'

            workingBtn.addEventListener('click', () => {
                changeTaskStatus(task, 'Done')
                render()
            })

            buttonsContainer.appendChild(workingBtn)
        }
        else if (task.status === 'Done') {
            const doneBtn = document.createElement('button')
            doneBtn.classList.add('doneBtn')
            doneBtn.innerText = 'Done'

            doneBtn.addEventListener('click', () => {
                changeTaskStatus(task, 'Working')
                render()
            })

            buttonsContainer.appendChild(doneBtn)
        }

        // Кнопка удаления задачи
        const removeBtn = document.createElement('button')
        removeBtn.classList.add('removeBtn')
        removeBtn.innerText = 'Remove'
        buttonsContainer.appendChild(removeBtn)

        // buttonsContainer добавить li
        li.appendChild(buttonsContainer)

        // Удаление задачи из localStorage
        removeBtn.addEventListener('click', () => {
            removeTaskToLS(task)
            render()
        })
    });
}

// console.log(localStorage)
// console.log(localStorage.getItem('name'))

// localStorage.setItem('lesson', 'Java')
// console.log(localStorage.getItem('lesson'))

// localStorage.setItem('isOk', true)
// console.log(localStorage.getItem('isOk'))

// const tasks = [
//     {
//         id: 1,
//         text: 'Поиграть с другом'
//     },
//     {
//         id: 2,
//         text: 'Отвести машину на мойку'
//     },
//     {
//         id: 3,
//         text: 'Отвести машину на мойку'
//     }
// ]
// const tasksJSON = JSON.stringify(tasks)
// // localStorage.setItem('tasks', tasksJSON)
// console.log(JSON.parse(localStorage.getItem('tasks')))

// console.log(Date.now())