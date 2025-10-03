(function (globalScope, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exports = factory();
    globalScope.Animal = exports.Animal;
    globalScope.Habitat = exports.Habitat;
    globalScope.Zoo = exports.Zoo;
    globalScope.createZooEntities = exports.createZooEntities;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  class Animal {
    constructor({
      id,
      name,
      species,
      image,
      habitat,
      status,
      description,
      facts = [],
      behaviors = [],
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
      if (!Array.isArray(this.behaviors) || this.behaviors.length === 0) {
        return null;
      }
      const index = Math.floor(Math.random() * this.behaviors.length);
      return this.behaviors[index];
    }
  }

  class Habitat {
    constructor({ id, name, climate, description, highlights = [] }) {
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

  function createZooEntities({ animals = [], habitats = [] }) {
    return {
      animals: animals.map((animal) => new Animal(animal)),
      habitats: habitats.map((habitat) => new Habitat(habitat))
    };
  }

  return { Animal, Habitat, Zoo, createZooEntities };
});
