// ===== Existing Code =====
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
});

// Update dark mode toggle to only affect specific elements
const darkModeToggle = document.getElementById('darkModeToggle');
const darkElements = [
  document.body,
  document.querySelector('header'),
  document.querySelectorAll('section'),
  document.querySelector('footer')
];

if (localStorage.getItem('darkMode') === 'true') {
  darkElements.forEach(el => {
    if (el instanceof NodeList) {
      el.forEach(item => item.classList.add('dark-mode'));
    } else {
      el.classList.add('dark-mode');
    }
  });
  darkModeToggle.textContent = 'Light Mode';
}

darkModeToggle.addEventListener('click', () => {
  darkElements.forEach(el => {
    if (el instanceof NodeList) {
      el.forEach(item => item.classList.toggle('dark-mode'));
    } else {
      el.classList.toggle('dark-mode');
    }
  });
  
  const isDarkMode = document.body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('darkMode', isDarkMode);
});

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('January 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== New Projects =====

// Form Validator
const demoForm = document.getElementById('demo-form');
const formError = document.getElementById('form-error');

demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = demoForm.elements[0].value;
    const email = demoForm.elements[1].value;
    
    if (username.length < 3) {
        formError.textContent = 'Username must be at least 3 characters';
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formError.textContent = 'Please enter a valid email';
        return;
    }
    
    formError.textContent = '';
    alert('Form submitted successfully!');
    demoForm.reset();
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const typingBtn = document.getElementById('typing-btn');
const messages = ["Hello World!", "Welcome to my portfolio", "I'm a frontend developer"];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentMessage.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

typingBtn.addEventListener('click', () => {
    messageIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingText.textContent = '';
    type();
});

// Start typing animation on page load
type();

// Text-to-Speech
const speakBtn = document.getElementById('speak-btn');
const speechText = document.getElementById('speech-text');

speakBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(speechText.value);
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech not supported in your browser');
    }
});

// Tip Calculator
const calculateTip = document.getElementById('calculate-tip');
const billAmount = document.getElementById('bill-amount');
const tipPercent = document.getElementById('tip-percent');
const tipResult = document.getElementById('tip-result');

calculateTip.addEventListener('click', () => {
    const bill = parseFloat(billAmount.value);
    const percent = parseFloat(tipPercent.value);
    
    if (isNaN(bill) || isNaN(percent)) {
        tipResult.textContent = 'Please enter valid numbers';
        return;
    }
    
    const tipAmount = bill * (percent / 100);
    const total = bill + tipAmount;
    
    tipResult.innerHTML = `
        <div>Tip: $${tipAmount.toFixed(2)}</div>
        <div>Total: $${total.toFixed(2)}</div>
    `;
});

// To-Do List
const todoInput = document.getElementById('todo-input');
const addTodo = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        addTodoToDOM(todo, index);
    });
}

function addTodoToDOM(todo, index) {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-700 p-2 rounded';
    li.innerHTML = `
        <span class="${todo.completed ? 'line-through text-gray-400' : ''}">${todo.text}</span>
        <div>
            <button class="complete-btn px-2 text-green-400">✓</button>
            <button class="delete-btn px-2 text-red-400">✗</button>
        </div>
    `;
    
    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
    
    todoList.appendChild(li);
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoItem() {
    const text = todoInput.value.trim();
    if (text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, completed: false });
        saveTodos(todos);
        todoInput.value = '';
        loadTodos();
    }
}

function toggleComplete(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    loadTodos();
}

function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(index, 1);
    saveTodos(todos);
    loadTodos();
}

addTodo.addEventListener('click', addTodoItem);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodoItem();
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
});

// Video Restart Functionality
const video = document.querySelector('#home video');
const hoverArea = document.querySelector('.video-hover-area');

hoverArea.addEventListener('mouseenter', () => {
  if (video) {
    video.currentTime = 0;
    video.play();
  }
});

// Fallback for mobile touch devices
hoverArea.addEventListener('click', () => {
  if (video) {
    video.currentTime = 0;
    video.play();
  }
});

// Load todos on page load
loadTodos();