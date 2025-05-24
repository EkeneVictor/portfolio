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

// Password Generator
const generateBtn = document.getElementById('generate-pw');
const pwOutput = document.getElementById('password-output');

generateBtn.addEventListener('click', () => {
  const length = parseInt(document.getElementById('pw-length').value) || 12;
  const hasUpper = document.getElementById('uppercase').checked;
  const hasNumbers = document.getElementById('numbers').checked;
  
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = hasUpper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
  const numbers = hasNumbers ? '0123456789' : '';
  
  const chars = lower + upper + numbers;
  let password = '';
  
  for(let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  pwOutput.textContent = password || 'Select options';
});

// Weather App - Complete Version
let lastWeatherData = null;
let currentUnit = 'c';

// DOM Elements
const weatherBtn = document.getElementById('get-weather');
const locateBtn = document.getElementById('locate-me');
const unitC = document.getElementById('unit-c');
const unitF = document.getElementById('unit-f');

// Event Listeners
weatherBtn.addEventListener('click', () => {
  const location = document.getElementById('weather-location').value.trim();
  if (location) fetchWeather(location);
});

locateBtn.addEventListener('click', getLocation);

unitC.addEventListener('click', () => setUnit('c'));
unitF.addEventListener('click', () => setUnit('f'));

// Main Functions
async function fetchWeather(location) {
  const resultDiv = document.getElementById('weather-result');
  resultDiv.innerHTML = '<div class="loading-spinner"></div>';
  
  try {
    const API_KEY = '280929b70ce74c66ab314922251103'; // Replace with your key
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );
    const data = await response.json();
    
    if (data.error) {
      resultDiv.innerHTML = `<p class="text-red-400">${data.error.message}</p>`;
      return;
    }
    
    lastWeatherData = data;
    renderWeather(data);
  } catch (error) {
    resultDiv.innerHTML = '<p class="text-red-400">Network error</p>';
  }
}

function renderWeather(data) {
  const { location, current } = data;
  const resultDiv = document.getElementById('weather-result');
  
  const temp = currentUnit === 'c' ? current.temp_c : current.temp_f;
  const unitSymbol = currentUnit === 'c' ? '°C' : '°F';
  
  resultDiv.innerHTML = `
    <div class="weather-current">
      <h4 class="text-lg">${location.name}, ${location.country}</h4>
      <div class="flex items-center justify-center gap-4 my-2">
        <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="h-12">
        <p class="text-3xl">${temp}${unitSymbol}</p>
      </div>
      <p>${current.condition.text}</p>
      <p class="text-sm mt-2">Humidity: ${current.humidity}% | Wind: ${current.wind_kph} km/h</p>
    </div>
  `;
}

function getLocation() {
  if (navigator.geolocation) {
    document.getElementById('weather-result').innerHTML = '<p class="text-blue-300">Detecting location...</p>';
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(`${position.coords.latitude},${position.coords.longitude}`);
      },
      (error) => {
        document.getElementById('weather-result').innerHTML = 
          '<p class="text-yellow-400">Allow location access or search manually</p>';
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}

function setUnit(unit) {
  currentUnit = unit;
  unitC.classList.toggle('bg-blue-800', unit === 'c');
  unitF.classList.toggle('bg-blue-800', unit === 'f');
  
  if (lastWeatherData) renderWeather(lastWeatherData);
}

// Usage when fetching:
resultDiv.innerHTML = '<div class="loading-spinner"></div>';

// Quote Generator
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

async function fetchQuote() {
  try {
    quoteText.textContent = "Loading...";
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
    
    // Update Twitter share link
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${data.content}" - ${data.author}`
    )}`;
  } catch (error) {
    quoteText.textContent = "Failed to load quote. Try again!";
    quoteAuthor.textContent = "";
  }
}

newQuoteBtn.addEventListener('click', fetchQuote);
fetchQuote(); // Load first quote on page load

// Dictionary App
const wordInput = document.getElementById('word-input');
const searchBtn = document.getElementById('search-word');
const dictResult = document.getElementById('dictionary-result');

searchBtn.addEventListener('click', fetchDefinition);

async function fetchDefinition() {
  const word = wordInput.value.trim();
  if (!word) return;

  dictResult.innerHTML = '<div class="loading-spinner"></div>';
  
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    
    if (data.title === "No Definitions Found") {
      dictResult.innerHTML = `<p class="text-red-400">No definitions found for "${word}"</p>`;
      return;
    }
    
    const entry = data[0];
    let html = `
      <h4 class="text-lg font-semibold">${entry.word}</h4>
      <p class="text-blue-300 mb-2">${entry.phonetic || ''}</p>
    `;
    
    // Audio pronunciation
    if (entry.phonetics?.length) {
      const audio = entry.phonetics.find(p => p.audio)?.audio;
      if (audio) {
        html += `
          <button onclick="new Audio('${audio}').play()" 
                  class="flex items-center gap-1 text-sm mb-3">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
            </svg>
            Hear pronunciation
          </button>
        `;
      }
    }
    
    // Definitions
    entry.meanings.forEach(meaning => {
      html += `
        <div class="mb-4">
          <p class="font-semibold">${meaning.partOfSpeech}</p>
          <ul class="list-disc pl-5 mt-1">
            ${meaning.definitions.slice(0, 3).map(def => 
              `<li class="mb-1">${def.definition}</li>`
            ).join('')}
          </ul>
        </div>
      `;
    });
    
    dictResult.innerHTML = html;
  } catch (error) {
    dictResult.innerHTML = `<p class="text-red-400">Error fetching definition</p>`;
  }
}

// Load todos on page load
loadTodos();