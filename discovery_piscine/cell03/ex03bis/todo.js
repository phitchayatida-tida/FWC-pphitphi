function saveTodos() {
    const todos = [];

    $("#ft_list div").each(function() {
        todos.push($(this).text());
    });

    document.cookie =
        "todos=" + encodeURIComponent(JSON.stringify(todos)) +
        "; path=/; max-age=31536000";
}

function createTodo(text, save = true) {
    const todo = $("<div></div>").text(text);

    todo.on("click", function() {
        if (confirm("Do you want to remove this TO DO?")) {
            $(this).remove();
            saveTodos();
        }
    });

    $("#ft_list").prepend(todo);

    if (save) {
        saveTodos();
    }
}

$("#new").on("click", function() {
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