/*Funcion para hacer fetch de la data de la API*/
async function ClothesByGender(gender){
    let clothesData = await fetch(`https://eneqomi2sj.execute-api.us-east-2.amazonaws.com/Prod/products/gender/${gender}`)
    clothes = await clothesData.json();
    console.log(clothes);
    return clothes;
}

/*Funcion para crear las tarjetas de cada ropa que esta en la API
y añadir los elementos al DOM*/
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
        /*Aca agregamos elementos extra si el elemento es uno de la seccion de descuentos*/
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

/*Funcion para mover el carousel a la posicion deseada*/
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


/*Aca cargarmos como primer elemento siempre la ropa de mujeres, asi la seccion no queda vacia*/
window.addEventListener('DOMContentLoaded', () => {
    createClothes('Mujer');
});

/*Creacion de logica del Carousel*/
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.previous');
const totalItems = 5;
const itemsVisible = 3;
let currentIndex = 0;
let offset = 0;
const maxIndex = totalItems - itemsVisible;

/*Funcionamineto de los botones para mover el carousel*/
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

/*Cuando se haga click en los elementos del carousel que son las categorias
que cargue los elementos correspondientes*/
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

/*Funcion para crear el elemento que muestra error*/
function errorElement(parentElement, message){
    let errorElement = document.createElement('p');
    errorElement.id = 'error';
    errorElement.textContent = message;
    parentElement.appendChild(errorElement);
}

/*Aca eliminamos los elementos de error para que no se acumulen*/
form.addEventListener('click', (event) => {
  const errorElements = document.querySelectorAll('#error');
  errorElements.forEach(errorElement => {
    errorElement.remove();
  });
});

/*Aca validamos los inputs para que no se envien vacios */
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

/*Aca creamos un local storage para los elementos de los inputs de contacto para que no se tenga que
volver a escribir si no se envio el formulario*/
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

/*Aca cargamos los datos del local storage en caso de que existan*/
window.addEventListener('DOMContentLoaded', () => {
  nameInput.value = localStorage.getItem('name') || '';
  emailInput.value = localStorage.getItem('email') || '';
  messageInput.value = localStorage.getItem('message') || '';
});

/*Logica del boton make it pink, para cambiar los colores a rosa*/
document.addEventListener('DOMContentLoaded', () => {
  const pinkButtons = document.querySelectorAll('.pink-btn');
  if (!pinkButtons || pinkButtons.length === 0) return;

  /*Funcion para cambiar el boton dependiendo de cual esta seleccionado*/
  function togglePink(btn) {
    document.body.classList.toggle('pink-mode');
    const isPink = document.body.classList.contains('pink-mode');
    pinkButtons.forEach(b => {
      b.textContent = isPink ? 'Make it normal' : 'Make it pink';
      b.setAttribute('aria-pressed', isPink);
    });
  }

  pinkButtons.forEach(btn => {
    btn.addEventListener('click', () => togglePink(btn));
  });
});
