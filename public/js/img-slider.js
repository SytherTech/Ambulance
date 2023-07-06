// script.js

document.addEventListener('DOMContentLoaded', function () {
    var slider = document.querySelector('.slider');
    var slides = document.querySelectorAll('.slide');
    var slideWidth = slides[0].offsetWidth;
    var currentSlideIndex = 0;

    // slider.style.width = slideWidth * slides.length + 'px';

    function slideNext() {
        currentSlideIndex++;
        console.log(currentSlideIndex)
        if (currentSlideIndex >= slides.length - 1) {
            currentSlideIndex = 0;
        }
        slider.style.transform = 'translateX(-' + slideWidth * currentSlideIndex + 'px)';
    }

    setInterval(slideNext, 5000);
});
