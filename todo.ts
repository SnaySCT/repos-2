interface TodoItem {
    text: string;
    completed: boolean;
}

// Функция для сохранения списка задач в localStorage
function saveTodoList(todoList: TodoItem[]): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Функция для получения списка задач из localStorage
function getTodoList(): TodoItem[] {
    const storedList: string | null = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [];
}

// Функция для отображения списка задач
function renderTodoList(todoList: TodoItem[]): void {
    const todoListElement: HTMLElement | null = document.getElementById('todoList');
    if (!todoListElement) return;
    
    todoListElement.innerHTML = '';
    todoList.forEach((todo, index) => {
        const li: HTMLElement = document.createElement('li');
        li.textContent = todo.text;
        li.dataset.index = index.toString();
        if (todo.completed) {
            li.classList.add('completed');
        }
        todoListElement.appendChild(li);
    });
}

// Инициализация списка задач при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    let todoList: TodoItem[] = getTodoList();
    renderTodoList(todoList);

    const addTodoButton: HTMLElement | null = document.getElementById('addTodoButton');
    const todoInput: HTMLInputElement | null = document.getElementById('todoInput') as HTMLInputElement;

    if (addTodoButton && todoInput) {
        addTodoButton.addEventListener('click', () => {
            const todoText: string = todoInput.value;
            if (todoText) {
                todoList.push({ text: todoText, completed: false });
                saveTodoList(todoList);
                renderTodoList(todoList);
                todoInput.value = '';
            }
        });
    }

    const todoListElement: HTMLElement | null = document.getElementById('todoList');
    if (todoListElement) {
        todoListElement.addEventListener('click', (event) => {
            const target: HTMLElement = event.target as HTMLElement;
            if (target.tagName === 'LI') {
                const index: number = parseInt(target.dataset.index || '0', 10);
                todoList[index].completed = !todoList[index].completed;
                saveTodoList(todoList);
                renderTodoList(todoList);
            }
        });
    }
});
