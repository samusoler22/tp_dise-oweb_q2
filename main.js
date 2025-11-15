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



//on page load event
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

  if (!emailValue.includes('@') || !emailValue.includes('.')) {
    errorElement(form, 'Por favor ingresa un correo electrónico válido');
    return;
  }

  if (messageValue === '') {
    errorElement(form, 'Por favor ingresa un mensaje');
    return;
  }

  alert('Formulario enviado con exito!');
  form.reset();
});
