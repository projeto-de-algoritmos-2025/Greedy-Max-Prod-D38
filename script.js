document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarefa");
  const taskListDiv = document.getElementById("lista-tarefas-pendentes");
  const calculateBtn = document.getElementById("calcular-ordem");
  const resultDiv = document.getElementById("resultado");

  let tasks = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("nome-tarefa");
    const durationInput = document.getElementById("duracao-tarefa");
    const deadlineInput = document.getElementById("prazo-tarefa");

    const newTask = {
      id: Date.now(),
      name: nameInput.value.trim(),
      duration: parseInt(durationInput.value, 10),
      deadline: parseInt(deadlineInput.value, 10),
    };

    tasks.push(newTask);
    renderTasks();
    form.reset();
  });

  function renderTasks() {
    taskListDiv.innerHTML = "";
    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task-item";
      taskElement.innerHTML = `<strong>${task.name}</strong> (Duração: ${task.duration}h, Prazo: ${task.deadline}h)`;
      taskListDiv.appendChild(taskElement);
    });
  }

  calculateBtn.addEventListener("click", () => {
    if (tasks.length === 0) return;

    const sortedTasks = [...tasks].sort((a, b) => a.deadline - b.deadline);

    let currentTime = 0;
    let maxLateness = -Infinity;
    const schedule = [];

    sortedTasks.forEach((task) => {
      const startTime = currentTime;
      const finishTime = startTime + task.duration;
      const lateness = finishTime - task.deadline;

      schedule.push({ ...task, startTime, finishTime, lateness });

      maxLateness = Math.max(maxLateness, lateness);
      currentTime = finishTime;
    });

    renderResults(schedule, maxLateness);
  });

  function renderResults(schedule, maxLateness) {
    resultDiv.innerHTML = "";

    const maxLatenessClass = maxLateness > 0 ? "late" : "on-time";
    const maxNode = document.createElement("h3");
    maxNode.innerHTML = `Atraso Máximo: <span class="${maxLatenessClass}">${maxLateness}h</span>`;
    resultDiv.appendChild(maxNode);

    schedule.forEach((task, index) => {
      const resultElement = document.createElement("div");
      const latenessClass = task.lateness > 0 ? "late" : "on-time";
      resultElement.className = `result-item ${latenessClass}`;
      resultElement.innerHTML = `
                <h4>${index + 1}. ${task.name}</h4>
                <p>Executar: <strong>${
                  task.startTime
                }h</strong> &rarr; <strong>${
        task.finishTime
      }h</strong> | Prazo: ${task.deadline}h</p>
                <p class="lateness">Atraso: ${task.lateness}h</p>
            `;
      resultDiv.appendChild(resultElement);
    });
  }
});
