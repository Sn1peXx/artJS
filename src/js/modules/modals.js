const modal = () => {
    let btnPressed = false;

    const bindModal = (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = removeScroll();

        trigger.forEach(item => {
            item.addEventListener('click', e => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }
                
                windows.forEach(item => {
                    item.style.display = 'none'; 
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {

            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', e => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            // не открывает другие модальные окна, если уже что-то открыто
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }

                if (!display) {
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    let scroll = removeScroll();
                    document.body.style.marginRight = `${scroll}px`;
                }
            });
            
        }, time);
    }

    // Удаление сдвига у страницы при открытии модальгого окна
    function removeScroll() { 
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    // Открывается когда пользователь доходит до конца страницы
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >=
                 document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click();
                 }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true);
    openByScroll('.fixed-gift');
    //showModalByTime('.popup-consultation', 60000)
   
}

export default modal;