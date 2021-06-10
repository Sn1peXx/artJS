import modal from './modules/modals';
import sliders from './modules/sliders';

window.addEventListener('DOMContentLoaded', () => {
    modal();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
}); 