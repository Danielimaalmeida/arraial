let database;
let guestNames;
let currentSlide = 0;

const GUESTS = {
    'paula': "Mamã",
    'luis': "Luís",
    'nuno': "Papá",
    'alice': "Alice",
    'nuno-miguel': 'Miguel',
    'rozzy': 'Rozzy',
    'natercia': 'Natércia',
    'joao-paulo': 'João',
    'sofia': 'Sofia',
    'jorge': 'Jorge',
    'paula-monteiro': 'Mamã',
    'gusto': 'Papá',
    'vovo': 'Vovó',
    'tiago': 'Tiago',
    'carlos': 'Carlos',
    'tuxa': 'Tuxa',
    'bela': 'Bela',
    'joao-eng': 'João',
    'rui': 'Rui',
    'nani': 'Nani',
    'miguel': 'Miguel',
    'joao': 'João',
    'beatriz': 'Beatriz',
    'carina': 'Carina',
    'hugo': 'Hugo',
    'paulo': 'Paulo',
    'raquel': 'Raquel',
    'andre': 'André',
    'joana': 'Joana',
    'margarida': 'Margarida',
    'mariana': 'Mariana',
    'mimi': 'Mimi',
    'mica': 'Micá',
    'iolanda': 'Iolanda',
    'ricardo': 'Ricardo',
    'carlota': 'Carlota',
    'andreia': 'Andreia',
    'fernando': 'Fernando',
    'lu': 'Lu',
    'alex': 'Alex',
    'catarina': 'Catarina'
}

function greetGuests() {
    const guests = new URLSearchParams(window.location.search)?.get('guests')?.split(',');
    guestNames = [];

    if (!guests) return

    for (let param of guests.values()) {
        if (GUESTS[param]) {
            guestNames.push(GUESTS[param]);
        }
    }

    document.getElementById('greeting').textContent =
        `Olá, ${guestNames.join(' e ')}\nFicaremos muito felizes por vos receber`;
}

document.addEventListener('FirestoreInitialized', (e) => {
    database = e.detail.database;
});


function scrollInto(section) {
    const element = document.getElementById(section);
    element.scrollIntoView({ behavior: 'smooth' });
}

const slides = document.querySelectorAll(".main__slider__slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.opacity = 100;
    } else {
      slide.style.opacity = 0;
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);
greetGuests()