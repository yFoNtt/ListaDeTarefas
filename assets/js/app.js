window.onload = function() {
    carregarTarefas();
};

function adicionarTarefa() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value === "") {
        alert("Adicione uma tarefa !");
        return;
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    li.onclick = function() {
        this.classList.toggle("completed");
        salvarTarefa();
    };
    li.ondblclick = function() {
        editarTarefa(this);
    };
    
    taskList.appendChild(li);
    salvarTarefa();
    taskInput.value = "";
}

function editarTarefa(li) {
    const newText = prompt("Digite o novo texto da tarefa:", li.textContent);
    if (newText !== null && newText.trim() !== "") {
        li.textContent = newText;
        salvarTarefa();
    }
}

function salvarTarefa() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(function(li) {
        tasks.push({ text: li.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function carregarTarefas() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        const taskList = document.getElementById("taskList");
        tasks.forEach(function(tarefa) {
            const li = document.createElement("li");
            li.textContent = tarefa.text;
            if (tarefa.completed) {
                li.classList.add("completed");
            }
            li.onclick = function() {
                this.classList.toggle("completed");
                salvarTarefa();
            };
            li.ondblclick = function() {
                editarTarefa(this);
            };
            taskList.appendChild(li);
        });
    }
}

function ocultarTarefasConcluidas() {
    document.querySelectorAll(".completed").forEach(function(tarefa) {
        tarefa.classList.add("hide");
    });
}

function exibirTarefasConcluidas() {
    document.querySelectorAll(".completed.hide").forEach(function(tarefa) {
        tarefa.classList.remove("hide");
    });
}
