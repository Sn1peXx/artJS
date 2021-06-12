import {postData} from '../services/requiests';

const forms = () => {
    const form = document.querySelectorAll("form"),
          inputs = document.querySelectorAll("input"),
		  upload = document.querySelectorAll('[name="upload"]');

    const message = {
        loading: "Загрузка...",
        success: "Спасибо, мы с вами свяжемся",
        failure: "Произошла ошибка",
        spinner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png",
    };

    const path = {
        designer: "assets/server.php",
        question: "assets/question.php",
    };



    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = "";
        });
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});
    };

	upload.forEach(item => {
		item.addEventListener('input', () => {
			let dots;
			const arr = item.files[0].name.split('.');

			arr[0].length > 15 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 15) + dots + arr[1];

			item.previousElementSibling.textContent = name;
		});
	});	

    form.forEach((item) => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            item.parentNode.appendChild(statusMessage);

            item.classList.add("animated", "fadeOutUp");

            setTimeout(() => {
                item.style.display = "none";
            }, 400);

            // Добавление картинки при отправке формы
            let statusImg = document.createElement("img");
            statusImg.setAttribute("src", message.spinner);
            statusImg.classList.add("animated", "fadeInUp");
            statusMessage.appendChild(statusImg);

            //ДОбавление текста
            let textMessage = document.createElement("div");
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;
			
			// Выбираем путь до сервера для отпраки данных
            item.closest(".popup-design") || item.classList.contains('calc-form')
                ? (api = path.designer)
                : (api = path.question);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute("src", message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute("src", message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        item.style.display = "block";
                        item.classList.remove("fadeOutUp");
                        item.classList.add("fadeInUp");
                        statusMessage.remove();
                    }, 3000);
                });
        });
    });
};

export default forms;
