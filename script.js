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
    {
      id: 'lion-aurora',
      name: 'Aurora',
      species: 'African Lion',
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
      habitat: 'Savanna Plains',
      status: 'Vulnerable',
      description:
        'Aurora leads the pride with grace, spending her days basking under the sun and keeping watch over the grasslands.',
      facts: [
        'Roars can be heard up to 5 miles away',
        'Sleeps 16 hours a day to conserve energy',
        'Works with her pride to hunt at dawn'
      ],
      behaviors: [
        'Aurora stretches before greeting visitors with a thunderous roar.',
        'The pride gathers for a cooperative hunt simulation.',
        'Aurora teaches the cubs how to stalk through tall grasses.'
      ],
      feedingTime: '11:30 AM',
      enrichment: 'Scent-tracking puzzle'
    },
    {
      id: 'panda-lotus',
      name: 'Lotus',
      species: 'Giant Panda',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      habitat: 'Bamboo Forest',
      status: 'Vulnerable',
      description:
        'Lotus spends her days munching on bamboo shoots and practicing her acrobatic climbs in the misty highlands.',
      facts: [
        'Consumes up to 40 pounds of bamboo daily',
        'Excellent tree climber despite her size',
        'Has a pseudo-thumb for gripping stalks'
      ],
      behaviors: [
        'Lotus carefully selects the sweetest bamboo shoots to snack on.',
        'She rolls down the hillside before napping on a sunlit rock.',
        'Lotus practices balancing on fallen trunks during enrichment.'
      ],
      feedingTime: '2:00 PM',
      enrichment: 'Frozen fruit treasure hunt'
    },
    {
      id: 'penguin-frost',
      name: 'Frost',
      species: 'Emperor Penguin',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
      habitat: 'Arctic Shores',
      status: 'Near Threatened',
      description:
        'Frost is the leader of our penguin colony, known for his impressive dives and gentle nature with the young chicks.',
      facts: [
        'Can dive over 500 meters deep',
        'Keeps warm with densely packed feathers',
        'Balances eggs on his feet to keep them safe'
      ],
      behaviors: [
        'Frost leads a synchronized swim beneath the icy waters.',
        'He waddles across the ice to deliver pebbles to his mate.',
        'Frost demonstrates how penguins toboggan on their bellies.'
      ],
      feedingTime: '10:15 AM',
      enrichment: 'Bubble curtain playtime'
    },
    {
      id: 'red-fox-ember',
      name: 'Ember',
      species: 'Red Fox',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      habitat: 'Woodland Trails',
      status: 'Least Concern',
      description:
        'Ember is a curious fox who loves exploring the forest floor and showcasing her clever problem-solving skills.',
      facts: [
        'Has whiskers on her legs to help sense prey',
        'Communicates through over 20 different vocalizations',
        'Uses her fluffy tail to stay warm in winter'
      ],
      behaviors: [
        'Ember pounces into the snow to catch a hidden treat.',
        'She arranges her den with twigs and leaves for comfort.',
        'Ember practices her playful spins with the keepers.'
      ],
      feedingTime: '1:00 PM',
      enrichment: 'Scented puzzle boxes'
    },
    {
      id: 'sea-otter-tide',
      name: 'Tide',
      species: 'Sea Otter',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      habitat: 'Kelp Forest',
      status: 'Endangered',
      description:
        'Tide loves to float amongst the kelp, cracking open shells with his favorite stone and caring for rescued pups.',
      facts: [
        'Holds hands with other otters to avoid drifting',
        'Has the thickest fur in the animal kingdom',
        'Uses tools like rocks to open shellfish'
      ],
      behaviors: [
        'Tide plays peekaboo in the kelp canopy with visitors.',
        'He demonstrates shell-cracking using his favorite rock.',
        'Tide grooms his fur meticulously to keep warm.'
      ],
      feedingTime: '3:45 PM',
      enrichment: 'Floating puzzle feeders'
    },
    {
      id: 'elephant-sage',
      name: 'Sage',
      species: 'Asian Elephant',
      image: 'https://images.unsplash.com/photo-1526218626217-dc65e5f9f4aa?auto=format&fit=crop&w=900&q=80',
      habitat: 'Rainforest Sanctuary',
      status: 'Endangered',
      description:
        'Sage is our gentle giant, known for her careful steps, expressive eyes, and incredible memory of every guest.',
      facts: [
        'Communicates with low-frequency rumbles',
        'Uses over 50,000 muscles in her trunk',
        'Creates dust baths to protect her skin'
      ],
      behaviors: [
        'Sage paints abstract art with her trunk during enrichment.',
        'She showers under the waterfall to cool off.',
        'Sage carefully teaches the calf how to uproot grass.'
      ],
      feedingTime: '9:00 AM',
      enrichment: 'Mind maze treat dispenser'
    },
    {
      id: 'owl-noctis',
      name: 'Noctis',
      species: 'Great Horned Owl',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      habitat: 'Nightfall Aviary',
      status: 'Least Concern',
      description:
        'Noctis has a piercing gaze and silent wings, making him the star of our twilight tours.',
      facts: [
        'Can rotate his head up to 270 degrees',
        'Flies silently thanks to fringed feathers',
        'Has extraordinary night vision'
      ],
      behaviors: [
        'Noctis performs a slow, silent flight over the audience.',
        'He demonstrates how owls use sound to locate prey.',
        'Noctis fluffs his feathers during a grooming session.'
      ],
      feedingTime: '7:30 PM',
      enrichment: 'Sound hunting challenge'
    },
    {
      id: 'giraffe-willow',
      name: 'Willow',
      species: 'Reticulated Giraffe',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80',
      habitat: 'Savanna Plains',
      status: 'Endangered',
      description:
        'Willow towers over the savanna, using her height to keep watch and nibble the freshest leaves.',
      facts: [
        'Has a 21-inch tongue for grasping leaves',
        'Only sleeps 30 minutes a day',
        'Has the same number of neck vertebrae as humans'
      ],
      behaviors: [
        'Willow delicately wraps her tongue around the highest leaves.',
        'She gallops gracefully alongside her herd.',
        'Willow lowers her neck to greet young visitors eye-to-eye.'
      ],
      feedingTime: '4:00 PM',
      enrichment: 'Sky-high feeder challenge'
    }
  ],
  habitats: [
    {
      id: 'savanna',
      name: 'Savanna Plains',
      climate: 'Warm, breezy grasslands',
      description:
        'A sprawling grassland with acacia trees, red sand pathways, and distant watering holes to mirror the African savanna.',
      highlights: [
        'Sunset lion roars carry across the reserve',
        'Giraffe feeding platforms at canopy height',
        'Migration-inspired enrichment activities'
      ]
    },
    {
      id: 'bamboo',
      name: 'Bamboo Forest',
      climate: 'Cool, misty highlands',
      description:
        'A tranquil bamboo grove with mist sprayers and a gentle stream running through multi-level climbing structures.',
      highlights: [
        'Interactive panda play structure with live cameras',
        'Guided zen garden raking workshops',
        'Nighttime lantern walks'
      ]
    },
    {
      id: 'arctic',
      name: 'Arctic Shores',
      climate: 'Chilly coastal winds',
      description:
        'An icy seascape with chilled pools, rocky outcrops, and artificial snowfall for year-round winter fun.',
      highlights: [
        'Underwater viewing tunnels for penguin dives',
        'Aurora borealis light shows',
        'Interactive climate change learning lab'
      ]
    },
    {
      id: 'rainforest',
      name: 'Rainforest Sanctuary',
      climate: 'Humid, lush jungles',
      description:
        'Towering trees and cascading waterfalls surround this biodome, echoing with tropical bird calls and drum circles.',
      highlights: [
        'Keeper-led mindfulness walks',
        'Elephant bathing amphitheater',
        'Tree canopy rope bridges'
      ]
    },
    {
      id: 'woodland',
      name: 'Woodland Trails',
      climate: 'Temperate forests',
      description:
        'Dappled sunlight filters through tall pines, guiding visitors along winding paths dotted with storybook dens.',
      highlights: [
        'Twilight fox tracking tours',
        'Campfire storytelling evenings',
        'Wildflower conservation workshops'
      ]
    }
  ],
  schedule: [
    {
      time: '9:00 AM',
      title: 'Elephant Morning Routine',
      description: 'Watch Sage enjoy a waterfall shower and learn about elephant communication.'
    },
    {
      time: '10:15 AM',
      title: 'Penguin Plunge',
      description: 'Dive into the world of emperor penguins with Frost during a live feeding demo.'
    },
    {
      time: '11:30 AM',
      title: 'Savanna Pride Chat',
      description: 'Join the keepers to discover how our lions work together as a family.'
    },
    {
      time: '1:00 PM',
      title: 'Fox Clever Games',
      description: 'Solve puzzle boxes alongside Ember and learn about enrichment design.'
    },
    {
      time: '2:00 PM',
      title: 'Panda Picnic',
      description: 'Help prepare bamboo bundles while Lotus shows off her climbing skills.'
    },
    {
      time: '3:45 PM',
      title: 'Otter Splash Session',
      description: 'Discover how Tide uses tools and why kelp forests are vital to ocean health.'
    },
    {
      time: '7:30 PM',
      title: 'Twilight Owl Encounter',
      description: 'Experience Noctis in flight and practice night vision challenges.'
    }
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
