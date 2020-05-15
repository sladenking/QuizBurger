'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const modalBlock = document.getElementById('modalBlock'),
		questionTitle = document.getElementById('question'),
		formAnswers = document.getElementById('formAnswers'),
		burgerBtn = document.getElementById('burger');

	let clientWidth = document.documentElement.clientWidth;

	if (clientWidth < 768) {
		burgerBtn.style.display = 'flex';
	} else {
		burgerBtn.style.display = 'none';
	}

	window.addEventListener('resize', () => {
		clientWidth = document.documentElement.clientWidth;

		if (clientWidth < 768) {
			burgerBtn.style.display = 'flex';
		} else {
			burgerBtn.style.display = 'none';
		}
	});

	const playTest = () => {
		const renderQuestions = () => {
			questionTitle.textContent = 'Какого цвета бургер вы хотите?';

			const name = 'Стандарт',
				src = './image/burger.png';


			formAnswers.innerHTML = `
			<div class="answers-item d-flex flex-column">
				<input type="radio" id="answerItem1" name="answer" class="d-none">
				<label for="answerItem1" class="d-flex flex-column justify-content-between">
					<img class="answerImg" src="${src}" alt="burger">
					<span>${name}</span>
				</label>
			</div>
			`;
		};
		renderQuestions();
	};

	document.addEventListener('click', event => {
		let target = event.target;
		if (target.closest('.btnOpenModal') || target.closest('.burger')) {
			modalBlock.classList.add('d-block');
			burgerBtn.classList.add('active');
			playTest();
		} else if (target.closest('.close')) {
			modalBlock.classList.remove('d-block');
			burgerBtn.classList.remove('active');
		} else {
			target = target.closest('.modal-dialog');

			if (!target) {
				modalBlock.classList.remove('d-block');
				burgerBtn.classList.remove('active');
			}
		}
	});

});
