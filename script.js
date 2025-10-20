
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-tarefa');
    const taskListDiv = document.getElementById('lista-tarefas-pendentes');
    const calculateBtn = document.getElementById('calcular-ordem');
    const resultDiv = document.getElementById('resultado');

    let tasks = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            name: form['nome-tarefa'].value,
            duration: parseInt(form['duracao-tarefa'].value, 10),
            deadline: parseInt(form['prazo-tarefa'].value, 10)
        };

        tasks.push(newTask);
        renderTasks();
        form.reset();
    });

    function renderTasks() {
        taskListDiv.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `<strong>${task.name}</strong> (Duração: ${task.duration}h, Prazo: ${task.deadline}h)`;
            taskListDiv.appendChild(taskElement);
        });
    }
})