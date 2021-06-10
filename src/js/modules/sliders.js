const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;

    const items = document.querySelectorAll(slides);

    const showSlides = n => {
        if (n > items.length) {
            slideIndex = 1;
        }
        
        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = "block";  
    }

    showSlides(slideIndex);

    const plusSlides = n => {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.add('slideInLeft');
            items[slideIndex - 1].classList.remove('slideInRight');
        });
    }

    catch {}

    // Убриает автоматичемкую прокрутку слайдера, если пользоваетль навел курсор на него
    const activeteAnimation = () => {
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInTop');
            }, 5000);
        } else {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 5000);
        }
    }

    activeteAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activeteAnimation();
    });

    
}

export default sliders;