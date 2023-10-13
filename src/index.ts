import confetti from 'canvas-confetti';

const container = document.querySelector('.to-do-list') as HTMLDivElement;
const list = container.querySelector<HTMLUListElement>('.list');
const form = container.querySelector<HTMLFormElement>('.new-task-form');
const input = container.querySelector<HTMLInputElement>('.new-task-title');
const tasks = loadTasks();
tasks.forEach(addListItem);

type Task =  {
  title: string,
  completed: boolean,
  createdAt: Date
}

form?.addEventListener('submit', e => {
  e.preventDefault();

  // The question checks if the element exist. If it doesn't, return undefined. This is called optional chaining
  if(input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask);

  addListItem(newTask);
  input.value = '';
})

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    if(task.completed == true) fireConfetti();
    saveTasks();
  })
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  // Save across browser sessions
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return []
  return JSON.parse(taskJSON);
}

function fireConfetti() {
  confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
    resize: true,
    useWorker: true,
  })({particleCount: 200, spread: 200})
}

// FEEDBACK
// > use arrow functions

const x = () => {return 1;}