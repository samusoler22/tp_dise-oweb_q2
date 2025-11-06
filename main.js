function ClothesByGender(gender){
    clothesData = fetch(`https://eneqomi2sj.execute-api.us-east-2.amazonaws.com/Prod/products/gender/${gender}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
    
    return clothesData;
}

const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.previous');
const totalItems = 6;
const itemsVisible = 3;
let currentIndex = 0;
let offset = 0;
const maxIndex = totalItems - itemsVisible;

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
