async function ClothesByGender(gender){
    let clothesData = await fetch(`https://eneqomi2sj.execute-api.us-east-2.amazonaws.com/Prod/products/gender/${gender}`)
    clothes = await clothesData.json();
    console.log(clothes);
    return clothes;
}

async function createClothes(gender){ 
    clothesContainer.innerHTML = "";
    let clothes = await ClothesByGender(gender); 
    
    clothes.forEach(cloth => {
        let clothElement = document.createElement('article');
        clothElement.classList.add('cloth');
        clothElement.innerHTML = `
            <figure>
                <img src="${cloth.URL}" alt="${cloth.NAME}">
            </figure>
            <h3>${cloth.NAME}</h3>
            <p>AR$: ${cloth.PRICE}</p>
        `;
        if (cloth.GENRE === "Sales"){
          clothElement.classList.add('sales');
          let saleTag = document.createElement('p');
          saleTag.textContent = 'SALE -20%';
          saleTag.classList.add('saletag')
          clothElement.appendChild(saleTag);    
        }
        clothesContainer.appendChild(clothElement);
    });
}


function updateCarousel(arrow) {
    if (arrow === 'next') {
        offset += 16.6;
    } else {
        offset -= 16.6;
    }

    track.style.transform = `translateX(-${offset}%)`;
    
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
}



window.addEventListener('DOMContentLoaded', () => {
    createClothes('Mujer');
});

//Carousel
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.previous');
const totalItems = 5;
const itemsVisible = 3;
let currentIndex = 0;
let offset = 0;
const maxIndex = totalItems - itemsVisible;

nextButton.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel('next');
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel('');
    }
});

let carouselItems = document.querySelectorAll('.carousel-item');
let clothesContainer = document.getElementsByClassName("clothes-container")[0];
let clothesTitle = document.getElementById("shop").firstElementChild;
carouselItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        clothesTitle.innerHTML = item.innerHTML;
        createClothes(item.dataset.category);
    });
});


let form = document.querySelector('form');
let nameInput = document.getElementById('nombre');
let emailInput = document.getElementById('email');
let messageInput = document.getElementById('mensaje');

function errorElement(parentElement, message){
    let errorElement = document.createElement('p');
    errorElement.id = 'error';
    errorElement.textContent = message;
    parentElement.appendChild(errorElement);
}


form.addEventListener('click', (event) => {
  const errorElements = document.querySelectorAll('#error');
  errorElements.forEach(errorElement => {
    errorElement.remove();
  });
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

  let nameValue = nameInput.value.trim();
  let emailValue = emailInput.value.trim();
  let messageValue = messageInput.value.trim();

  if (nameValue === '') {
    errorElement(form, 'Por favor ingresa tu nombre');
    return;
  }

  if (emailValue === '') {
    errorElement(form, 'Por favor ingresa tu correo electrónico');
    return;
  }

  if (messageValue === '') {
    errorElement(form, 'Por favor ingresa un mensaje');
    return;
  }

  alert('FORMULARIO ENVIADO CON EXITO!');
  form.reset();
});


nameInput.addEventListener('input', () => {
  localStorage.setItem('name', nameInput.value);
});

emailInput.addEventListener('input', () => {
  localStorage.setItem('email', emailInput.value);
});

messageInput.addEventListener('input', () => {
  localStorage.setItem('message', messageInput.value);
});

form.addEventListener('submit', () => {
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('message');
});

window.addEventListener('DOMContentLoaded', () => {
  nameInput.value = localStorage.getItem('name') || '';
  emailInput.value = localStorage.getItem('email') || '';
  messageInput.value = localStorage.getItem('message') || '';
});
