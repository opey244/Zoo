const test = require('node:test');
const assert = require('node:assert/strict');
const { Animal, Habitat, Zoo, createZooEntities } = require('../zooCore.js');

test('Animal#getRandomBehavior returns null when behaviors are empty', () => {
  const animal = new Animal({
    id: 'test',
    name: 'Test',
    species: 'Spec',
    image: '',
    habitat: 'Test Habitat',
    status: 'Least Concern',
    description: 'Test animal',
    facts: []
  });

  assert.equal(animal.getRandomBehavior(), null);
});

test('Animal#getRandomBehavior returns expected behavior when Math.random is mocked', () => {
  const animal = new Animal({
    id: 'random',
    name: 'Random',
    species: 'Spec',
    image: '',
    habitat: 'Test Habitat',
    status: 'Least Concern',
    description: 'Test animal',
    behaviors: ['a', 'b'],
    facts: []
  });

  const originalRandom = Math.random;
  Math.random = () => 0.75;
  try {
    assert.equal(animal.getRandomBehavior(), 'b');
  } finally {
    Math.random = originalRandom;
  }
});

test('Zoo filtering by habitat, status, search, and favorites', () => {
  const dataset = {
    animals: [
      {
        id: 'lion',
        name: 'Leo',
        species: 'Lion',
        image: '',
        habitat: 'Savanna',
        status: 'Vulnerable',
        description: 'Lion',
        behaviors: ['roar'],
        facts: []
      },
      {
        id: 'panda',
        name: 'Poppy',
        species: 'Panda',
        image: '',
        habitat: 'Forest',
        status: 'Endangered',
        description: 'Panda',
        behaviors: ['eat'],
        facts: []
      }
    ],
    habitats: [
      { id: 'savanna', name: 'Savanna', climate: '', description: '', highlights: [] },
      { id: 'forest', name: 'Forest', climate: '', description: '', highlights: [] }
    ]
  };

  const { animals, habitats } = createZooEntities(dataset);
  const zoo = new Zoo(animals, habitats);

  zoo.setFilter('habitat', 'Savanna');
  let results = zoo.getFilteredAnimals();
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'lion');

  zoo.setFilter('habitat', 'all');
  zoo.setFilter('status', 'Endangered');
  results = zoo.getFilteredAnimals();
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'panda');

  zoo.setFilter('status', 'all');
  zoo.setFilter('search', 'leo');
  results = zoo.getFilteredAnimals();
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'lion');

  zoo.setFilter('search', '');
  zoo.toggleFavorite('panda');
  zoo.setFilter('favoritesOnly', true);
  results = zoo.getFilteredAnimals();
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'panda');
});

test('Zoo stats provide counts and visitor range', () => {
  const { animals, habitats } = createZooEntities({
    animals: [
      {
        id: 'a',
        name: 'A',
        species: 'Species A',
        image: '',
        habitat: 'Habitat A',
        status: 'Status',
        description: 'A',
        behaviors: [],
        facts: []
      },
      {
        id: 'b',
        name: 'B',
        species: 'Species B',
        image: '',
        habitat: 'Habitat B',
        status: 'Status',
        description: 'B',
        behaviors: [],
        facts: []
      }
    ],
    habitats: [
      { id: 'ha', name: 'Habitat A', climate: '', description: '', highlights: [] },
      { id: 'hb', name: 'Habitat B', climate: '', description: '', highlights: [] }
    ]
  });

  const zoo = new Zoo(animals, habitats);
  const stats = zoo.getStats();

  assert.equal(stats.animals, 2);
  assert.equal(stats.habitats, 2);
  assert(stats.visitors >= 1200 && stats.visitors <= 1599);
});
