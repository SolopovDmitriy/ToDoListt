createTaskElement = taskName => {
    const taskNode = document.createElement('div')
    const checkBox = document.createElement('input')
    const trashIcon = document.createElement('img')
    const supprimerLabel = document.createElement('span')

    checkBox.type = 'checkbox'
    checkBox.style.width = '10px'

    trashIcon.src = 'img/52-512.png'
    trashIcon.hidden = true

    trashIcon.addEventListener('click', function(e) {
        // alert(e.target)
        // console.log(e.target.parentElement.parentElement.children.item(0))
        const div = e.target.parentElement.parentElement
        div.remove()
    })

    supprimerLabel.innerHTML = 'Supprimer'
    supprimerLabel.hidden = true

    const div = document.createElement('div')
    div.appendChild(trashIcon)
    div.appendChild(supprimerLabel)
    
    taskNode.appendChild(checkBox)
    taskNode.insertAdjacentHTML('beforeend', taskName)
    taskNode.appendChild(div)
    taskNode.style.height = '20px'
    // taskNode.appendChild(trashIcon)
    
    taskNode.addEventListener('click', function() {
        // alert(`${taskName} was clicked`)
        // const checked = e.target.checked
        // alert(checked)

        // if (checked) {
        //     selectedTasksAmount++
        // } else {
        //     selectedTasksAmount--
        // }

        // alert(selectedTasksAmount)

        let selectedTasksAmount = 0

        const children = getMainChildren()
        
        for (const child of children) {
            const input = child.children.item(0)
            if (input.checked) {
                selectedTasksAmount++
            }
        }

        setFooterText(selectedTasksAmount)
    })
 
    const parent = getMain()
    parent.appendChild(taskNode)
}

const setFooterText = selectedTasksAmount => {
    const children = getMainChildren()
    const childrenAmount = children.length

    const selectedTasks = getSelectedTasks()
    const text = `${selectedTasksAmount} / ${childrenAmount}`
    selectedTasks.innerHTML = text
}

const addButton = document.getElementById('add-button')

addButton.addEventListener('click', function() {
    const taskInput = document.getElementById('task-text')
    const taskName = taskInput.value

    if (taskName) {
        createTaskElement(taskName)
        taskInput.value = null
    }

    const children = getMainChildren()
    const selectedTasks = getSelectedTasks()
    selectedTasks.innerHTML = `0 / ${children.length}`
})

const getMain = () => document.getElementById('main')

const getMainChildren = () => getMain().children

const getSelectedTasks = () => document.getElementById('selected-tasks')

const checkAllTasks = (children, checked) => {
    for (const child of children) {
        const input = child.children.item(0)
        input.checked = !checked
    }
}

const moveCheckedTasksToGroup = hidden => {
    const children = getMainChildren()

    for (const child of children) {
        const input = child.children.item(0)
        const div = child.children.item(1)

        if (input.checked) {
            const supprimerLabel = div.children.item(0)
            supprimerLabel.hidden = hidden

            const trashIcon = div.children.item(1)
            trashIcon.hidden = hidden
        }

        input.checked = false
    }

    setFooterText(0)
}

const alltasksButton = document.getElementById('alltasks-button')
alltasksButton.addEventListener('click', function() {
    const children = getMainChildren()
    const childrenAmount = children.length

    if (childrenAmount === 0) {
        return
    }

    let allTasksChecked = true
    
    for (const child of children) {
        const input = child.children.item(0)

        if (!input.checked) {
            allTasksChecked = false
            break
        }
    }

    checkAllTasks(children, allTasksChecked)

    // if (allTasksChecked) {
    //     for (const child of children) {
    //         const input = child.children.item(0)
    //         input.checked = false
    //     }
    // } else {
    //     for (const child of children) {
    //         const input = child.children.item(0)
    //         input.checked = true
    //     }
    // }

    const selectedTasksAmount = children
        .item(0)
        .children
        .item(0)
        .checked ?
            childrenAmount :
            0

    this.selectedTasksAmount = selectedTasksAmount
    // alert(this.selectedTasksAmount)

    // const selectedTasks = getSelectedTasks()
    // const text = `${selectedTasksAmount} / ${childrenAmount}`
    // selectedTasks.innerHTML = text
    setFooterText(selectedTasksAmount)
})

const todoButton = document.getElementById('todo-button')
todoButton.addEventListener('click', function() {
    moveCheckedTasksToGroup(true)
})

const completeButton = document.getElementById('complete-button')
completeButton.addEventListener('click', function() {
    moveCheckedTasksToGroup(false)
    // const children = getMainChildren()

    // for (const child of children) {
    //     const input = child.children.item(0)

    //     if (input.checked) {
    //         const supprimerLabel = child.children.item(1)
    //         supprimerLabel.hidden = false

    //         const trashIcon = child.children.item(2)
    //         trashIcon.hidden = false
    //     }
    // }
})
