let database;
let addDoc;
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
  'tio-miguel': 'Miguel',
  'joana-costa': 'Joana',
  'lena': 'Titia Lena',
  'joao-coutinho': 'João',
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
  'mimi-rui': 'Rui',
  'mica': 'Micá',
  'lucas': 'Lucas',
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
      guestNames.push({
        name: GUESTS[param],
        id: param
      });
    }
  }

  const guestsWithCommas = guestNames.map(v => v.name).join(', ').replace(/,([^,]*)$/, ' e' + '$1');
  document.getElementById('greeting').textContent =
    `Olá, ${guestsWithCommas}\nFicaríamos muito felizes por vos receber!`;
}

document.addEventListener('FirestoreInitialized', (e) => {
  database = e.detail.database;
  addDoc = e.detail.addDoc
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

function buildConfirmation() {
  const confirmation = document.getElementById('confirmation-list');
  guestNames.forEach(guest => {
    confirmation.innerHTML = `${confirmation.innerHTML}
      <div style="display: flex">
      <input type="checkbox" name="${guest.id}" id="${guest.id}"/>
      <label for="${guest.id}">${guest.name}</label>
    </div>`
  })
}

function handleSubmit() {
  const allergies = document.getElementById('allergies').value;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const id = checkbox.id
    const isChecked = checkbox.checked
    const guest = guestNames.find(g => g.id === id);
    guest.confirmed = isChecked;
    guest.allergies = allergies;
  })

  guestNames.forEach(guest => {
    addDoc(database, guest)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  })

  const confirmation = document.getElementById('confirmation');
  confirmation.classList.add('hidden');
  const goodbye = document.getElementById('goodbye');
  goodbye.classList.remove('hidden')
}

showSlide(currentSlide);
greetGuests()
buildConfirmation();