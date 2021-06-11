import modal from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    modal();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms()
}); 