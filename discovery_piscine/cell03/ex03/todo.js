const list = document.getElementById("ft_list");
const button = document.getElementById("new");

function saveTodos() {
    const todos = [];

    list.querySelectorAll("div").forEach(function(todo) {
        todos.push(todo.textContent);
    });

    document.cookie =
        "todos=" + encodeURIComponent(JSON.stringify(todos)) +
        "; path=/; max-age=31536000";
}

function createTodo(text, save = true) {
    const todo = document.createElement("div");
    todo.textContent = text;

    todo.addEventListener("click", function() {
        if (confirm("Do you want to remove this TO DO?")) {
            todo.remove();
            saveTodos();
        }
    });

    list.prepend(todo);

    if (save) {
        saveTodos();
    }
}

button.addEventListener("click", function() {
    const text = prompt("Enter a new TO DO:");

    if (text !== null && text.trim() !== "") {
        createTodo(text.trim());
    }
});

function loadTodos() {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            const todos = JSON.parse(
                decodeURIComponent(cookie.substring(6))
            );

            for (let i = todos.length - 1; i >= 0; i--) {
                createTodo(todos[i], false);
            }
        }
    }
}

loadTodos();