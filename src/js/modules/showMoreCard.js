import { getResource } from "../services/requiests";

const showMoreCard = (trigger, wrapper) => {
    const button = document.querySelector(trigger);

    button.addEventListener("click", function() {
        getResource('assets/db.json')
            .then((res) => createCard(res.styles))
            .catch((e) => console.log(e))

        this.remove();
    });

    function createCard(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement("div");
            card.classList.add(
                "animated",
                "fadeInUp",
                "col-sm-3",
                "col-sm-offset-0",
                "col-xs-10",
                "col-xs-offset-1"
            );

            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt=${title}>
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div>`;

            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreCard;
