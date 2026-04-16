// Нужно при нажатий на кнопку создавать li и добавлять его (вместо с содержимым из инпута) в todoList

const todoInput = document.querySelector('#todoInput')
const todoButton = document.querySelector('#todoButton')
const todoList = document.querySelector('#todoList')
const spinner = document.querySelector('#spinner')

// Initial Render - Первичная отрисовка
render()

todoButton.addEventListener('click', (event) => {
    event.preventDefault()

    addNewTask()
})

async function addNewTask() {
    try {
        startSpinner()
        const taskText = todoInput.value.trim()

        if (!taskText) {
            alert('Пожалуйста заполните данные корректно')
            return
        }

        const todosBodyJSON = JSON.stringify({
            text: taskText
        })

        await fetch('http://localhost:6767/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: todosBodyJSON
        })

        todoInput.value = ''
    }
    catch (err) {
        console.log('Ошибка при создании задачи', err)
    }
    finally {
        stopSpinner()
        render()
    }
}

async function removeTask(task) {
    try {
        startSpinner()
        await fetch(`http://localhost:6767/api/todos/${task.id}`, {
            method: 'DELETE'
        })
    }
    catch (error) {
        console.log('Ошибка при удалении задачи', error)
    }
    finally {
        stopSpinner()
        render()
    }
}

async function changeTaskStatus(task, newStatus) {
    try {
        startSpinner()
        const bodyJSON = JSON.stringify({
            status: newStatus
        })

        await fetch(`http://localhost:6767/api/todos/${task.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyJSON
        })
    }
    catch(err) {
        console.error('Ошибка при изменении статуса', err)
    }
    finally {
        stopSpinner()
    }
}

async function render() {
    try {
        startSpinner()

        // Очистка списка
        todoList.innerHTML = ''

        const response = await fetch('http://localhost:6767/api/todos', {
            method: 'GET'
        })
        const tasks = await response.json()

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

                workingBtn.addEventListener('click', async () => {
                    await changeTaskStatus(task, 'completed')
                    render()
                })

                buttonsContainer.appendChild(workingBtn)
            }
            else if (task.status === 'completed') {
                const doneBtn = document.createElement('button')
                doneBtn.classList.add('doneBtn')
                doneBtn.innerText = 'Completed'

                doneBtn.addEventListener('click', async () => {
                    await changeTaskStatus(task, 'in-progress')
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
    }
    catch(err) {
        console.log('Ошибка при получении списка задач', err)
    }
    finally {
        stopSpinner()
    }
}

function startSpinner() {
    spinner.classList.remove('hidden')
}

function stopSpinner() {
    spinner.classList.add('hidden')
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
