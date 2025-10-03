class Animal {
  constructor({
    id,
    name,
    species,
    image,
    habitat,
    status,
    description,
    facts,
    behaviors,
    feedingTime,
    enrichment
  }) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.image = image;
    this.habitat = habitat;
    this.status = status;
    this.description = description;
    this.facts = facts;
    this.behaviors = behaviors;
    this.feedingTime = feedingTime;
    this.enrichment = enrichment;
    this.isFavorite = false;
  }

  getRandomBehavior() {
    if (!this.behaviors?.length) return null;
    const index = Math.floor(Math.random() * this.behaviors.length);
    return this.behaviors[index];
  }
}

class Habitat {
  constructor({ id, name, climate, description, highlights }) {
    this.id = id;
    this.name = name;
    this.climate = climate;
    this.description = description;
    this.highlights = highlights;
  }
}

class Zoo {
  constructor(animals, habitats) {
    this.animals = animals;
    this.habitats = habitats;
    this.filters = {
      search: '',
      habitat: 'all',
      status: 'all',
      favoritesOnly: false
    };
  }

  setFilter(key, value) {
    this.filters[key] = value;
  }

  toggleFavorite(id) {
    const animal = this.animals.find((a) => a.id === id);
    if (animal) {
      animal.isFavorite = !animal.isFavorite;
    }
    return animal?.isFavorite ?? false;
  }

  getFilteredAnimals() {
    return this.animals.filter((animal) => {
      const matchesSearch = `${animal.name} ${animal.species}`
        .toLowerCase()
        .includes(this.filters.search.toLowerCase());
      const matchesHabitat =
        this.filters.habitat === 'all' || animal.habitat === this.filters.habitat;
      const matchesStatus =
        this.filters.status === 'all' || animal.status === this.filters.status;
      const matchesFavorite = !this.filters.favoritesOnly || animal.isFavorite;
      return matchesSearch && matchesHabitat && matchesStatus && matchesFavorite;
    });
  }

  getStats() {
    return {
      animals: this.animals.length,
      habitats: new Set(this.animals.map((animal) => animal.habitat)).size,
      visitors: 1200 + Math.floor(Math.random() * 400)
    };
  }
}

const data = {
  animals: [
    // ... keep all animal objects as in your original file ...
  ],
  habitats: [
    // ... keep all habitat objects ...
  ],
  schedule: [
    // ... keep all schedule objects ...
  ]
};

const zoo = new Zoo(
  data.animals.map((animal) => new Animal(animal)),
  data.habitats.map((habitat) => new Habitat(habitat))
);

const elements = {
  search: document.querySelector('#search'),
  habitatFilter: document.querySelector('#habitat-filter'),
  statusFilter: document.querySelector('#status-filter'),
  favoritesToggle: document.querySelector('#favorites-toggle'),
  animalGrid: document.querySelector('.animal-grid'),
  emptyState: document.querySelector('.empty-state'),
  habitatList: document.querySelector('.habitat-list'),
  habitatInfo: document.querySelector('.habitat-info'),
  behaviorFeed: document.querySelector('.behavior-feed'),
  timeline: document.querySelector('.timeline'),
  stats: {
    animals: document.querySelector('[data-stat="animals"]'),
    habitats: document.querySelector('[data-stat="habitats"]'),
    visitors: document.querySelector('[data-stat="visitors"]')
  }
};

function createAnimalCard(animal) {
  const template = document.querySelector('#animal-card-template');
  const card = template.content.firstElementChild.cloneNode(true);
  const img = card.querySelector('img');
  img.src = animal.image;
  img.alt = `${animal.name} the ${animal.species}`;
  card.querySelector('.name').textContent = animal.name;
  card.querySelector('.species').textContent = animal.species;
  card.querySelector('.habitat').textContent = `Habitat: ${animal.habitat}`;
  card.querySelector('.status').textContent = `Status: ${animal.status}`;
  card.querySelector('.description').textContent = animal.description;
  card.querySelector('.badge').textContent = animal.habitat.split(' ')[0];

  const factsList = card.querySelector('.facts');
  animal.facts.forEach((fact) => {
    const li = document.createElement('li');
    li.textContent = fact;
    factsList.appendChild(li);
  });

  const favoriteButton = card.querySelector('.favorite');
  if (animal.isFavorite) {
    favoriteButton.classList.add('active');
    favoriteButton.querySelector('.icon').textContent = '★';
  }

  favoriteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isFavorite = zoo.toggleFavorite(animal.id);
    favoriteButton.classList.toggle('active', isFavorite);
    favoriteButton.querySelector('.icon').textContent = isFavorite ? '★' : '☆';
    renderAnimals();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      favoriteButton.click();
    }
  });

  return card;
}

function renderAnimals() {
  elements.animalGrid.innerHTML = '';
  const animals = zoo.getFilteredAnimals();
  if (!animals.length) {
    elements.emptyState.classList.remove('hidden');
    return;
  }

  elements.emptyState.classList.add('hidden');
  const fragment = document.createDocumentFragment();
  animals.forEach((animal) => fragment.appendChild(createAnimalCard(animal)));
  elements.animalGrid.appendChild(fragment);
}

function populateFilters() {
  const habitats = ['all', ...new Set(zoo.animals.map((animal) => animal.habitat))];
  habitats.forEach((habitat) => {
    const option = document.createElement('option');
    option.value = habitat;
    option.textContent = habitat;
    elements.habitatFilter.appendChild(option);
  });

  const statuses = ['all', ...new Set(zoo.animals.map((animal) => animal.status))];
  statuses.forEach((status) => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status;
    elements.statusFilter.appendChild(option);
  });
}

function renderHabitats() {
  elements.habitatList.innerHTML = '';
  zoo.habitats.forEach((habitat) => {
    const card = document.createElement('article');
    card.classList.add('habitat-card');
    card.dataset.id = habitat.id;
    card.innerHTML = `
      <h3>${habitat.name}</h3>
      <p>${habitat.climate}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.habitat-card').forEach((el) => el.classList.remove('active'));
      card.classList.add('active');
      elements.habitatInfo.innerHTML = `
        <h3>${habitat.name}</h3>
        <p>${habitat.description}</p>
        <h4>Highlights</h4>
        <ul>${habitat.highlights.map((highlight) => `<li>${highlight}</li>`).join('')}</ul>
        <h4>Residents</h4>
        <ul>${zoo.animals
          .filter((animal) => animal.habitat === habitat.name)
          .map((animal) => `<li>${animal.name} &mdash; ${animal.species}</li>`)
          .join('')}</ul>
      `;
    });

    elements.habitatList.appendChild(card);
  });
}

function renderSchedule() {
  elements.timeline.innerHTML = '';
  data.schedule.forEach((item) => {
    const scheduleItem = document.createElement('article');
    scheduleItem.classList.add('schedule-item');
    scheduleItem.innerHTML = `
      <div class="time">${item.time}</div>
      <h3>${item.title}</h3>
      <p class="description">${item.description}</p>
    `;
    elements.timeline.appendChild(scheduleItem);
  });
}

function addBehaviorEntry(message) {
  const item = document.createElement('li');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  item.innerHTML = `
    <span>${message}</span>
    <time>${time}</time>
  `;
  elements.behaviorFeed.prepend(item);
  while (elements.behaviorFeed.children.length > 10) {
    elements.behaviorFeed.removeChild(elements.behaviorFeed.lastElementChild);
  }
}

function startBehaviorFeed() {
  const initialBehaviors = zoo.animals.map((animal) => animal.getRandomBehavior());
  initialBehaviors.forEach((behavior, index) => {
    if (!behavior) return;
    setTimeout(() => addBehaviorEntry(behavior), index * 400);
  });

  setInterval(() => {
    const animal = zoo.animals[Math.floor(Math.random() * zoo.animals.length)];
    const behavior = animal.getRandomBehavior();
    if (behavior) addBehaviorEntry(behavior);
  }, 5000);
}

function updateStats() {
  const stats = zoo.getStats();
  elements.stats.animals.textContent = stats.animals;
  elements.stats.habitats.textContent = stats.habitats;
  elements.stats.visitors.textContent = stats.visitors.toLocaleString();
}

function bindEvents() {
  elements.search.addEventListener('input', (event) => {
    zoo.setFilter('search', event.target.value);
    renderAnimals();
  });

  elements.habitatFilter.addEventListener('change', (event) => {
    zoo.setFilter('habitat', event.target.value);
    renderAnimals();
  });

  elements.statusFilter.addEventListener('change', (event) => {
    zoo.setFilter('status', event.target.value);
    renderAnimals();
  });

  elements.favoritesToggle.addEventListener('change', (event) => {
    zoo.setFilter('favoritesOnly', event.target.checked);
    renderAnimals();
  });
}

function init() {
  populateFilters();
  renderAnimals();
  renderHabitats();
  renderSchedule();
  updateStats();
  startBehaviorFeed();
  bindEvents();
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
