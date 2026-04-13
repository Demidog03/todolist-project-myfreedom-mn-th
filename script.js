// Нужно при нажатий на кнопку создавать li и добавлять его (вместо с содержимым из инпута) в todoList

const todoInput = document.querySelector('#todoInput')
const todoButton = document.querySelector('#todoButton')
const todoList = document.querySelector('#todoList')

// Initial Render - Первичная отрисовка
render()

todoButton.addEventListener('click', (event) => {
    event.preventDefault()

    addNewTask()
})

function addNewTask() {
    const taskText = todoInput.value.trim()

    if (!taskText) {
        alert('Пожалуйста заполните данные корректно')
        return
    }

    const todosBodyJSON = JSON.stringify({
        text: taskText
    })

    fetch('http://localhost:6767/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: todosBodyJSON
    }).finally(() => {
        render()
    })

    todoInput.value = ''
}

function removeTask(task) {
    fetch(`http://localhost:6767/api/todos/${task.id}`, {
        method: 'DELETE'
    }).finally(() => {
        render()
    })
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

    fetch('http://localhost:6767/api/todos', {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).then(tasks => {
        console.log(tasks)

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
            if (task.status === 'in-progress') {
                const workingBtn = document.createElement('button')
                workingBtn.classList.add('workingBtn')
                workingBtn.innerText = 'In progress'

                workingBtn.addEventListener('click', () => {
                    changeTaskStatus(task, 'in-progress')
                    render()
                })

                buttonsContainer.appendChild(workingBtn)
            }
            else if (task.status === 'completed') {
                const doneBtn = document.createElement('button')
                doneBtn.classList.add('doneBtn')
                doneBtn.innerText = 'Completed'

                doneBtn.addEventListener('click', () => {
                    changeTaskStatus(task, 'completed')
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
                removeTask(task)
            })
        });
    })
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