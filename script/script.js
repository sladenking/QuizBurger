'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const modalBlock = document.getElementById('modalBlock'),
		questionTitle = document.getElementById('question'),
		formAnswers = document.getElementById('formAnswers'),
		menuButton = document.getElementById('burger'),
		prevBtn = document.getElementById('prev'),
		nextBtn = document.getElementById('next'),
		sendBtn = document.getElementById('send');

	const handleWidth = () => {
		const clientWidth = document.documentElement.clientWidth;
		menuButton.style.display = clientWidth > 768 ? 'none' : 'flex';
	};

	handleWidth();

	const playTest = () => {

		let numberQuestion = 0;

		const questions = [
			{
				question: "Какого цвета бургер?",
				answers: [
					{
						title: 'Стандарт',
						url: './image/burger.png'
					},
					{
						title: 'Черный',
						url: './image/burgerBlack.png'
					}
				],
				type: 'radio'
			},
			{
				question: "Из какого мяса котлета?",
				answers: [
					{
						title: 'Курица',
						url: './image/chickenMeat.png'
					},
					{
						title: 'Говядина',
						url: './image/beefMeat.png'
					},
					{
						title: 'Свинина',
						url: './image/porkMeat.png'
					}
				],
				type: 'radio'
			},
			{
				question: "Дополнительные ингредиенты?",
				answers: [
					{
						title: 'Помидор',
						url: './image/tomato.png'
					},
					{
						title: 'Огурец',
						url: './image/cucumber.png'
					},
					{
						title: 'Салат',
						url: './image/salad.png'
					},
					{
						title: 'Лук',
						url: './image/onion.png'
					}
				],
				type: 'checkbox'
			},
			{
				question: "Добавить соус?",
				answers: [
					{
						title: 'Чесночный',
						url: './image/sauce1.png'
					},
					{
						title: 'Томатный',
						url: './image/sauce2.png'
					},
					{
						title: 'Горчичный',
						url: './image/sauce3.png'
					}
				],
				type: 'radio'
			}
		];

		const renderAnswers = i => {
			formAnswers.innerHTML = '';
			questions[i].answers.forEach(answers => {
				const blocks = `
					<div class="answers-item d-flex flex-column">
						<input type="${questions[i].type}" id="${answers.title}" name="answer" class="d-none">
						<label for="${answers.title}" class="d-flex flex-column justify-content-between">
							<img class="answerImg" src="${answers.url}" alt="burger">
							<span>${answers.title}</span>
						</label>
					</div>
					`;
				formAnswers.insertAdjacentHTML('beforeend', blocks);
			});
		};

		const renderQuestions = iQ => {
			questionTitle.textContent = `${questions[iQ].question}`;
			renderAnswers(iQ);
		};
		renderQuestions(numberQuestion);

		const modalFooter = document.getElementById('modalFooter');

		const checkBtns = () => {
			if (numberQuestion !== 0) {
				prevBtn.classList.remove('d-none');
			} else {
				prevBtn.classList.add('d-none');
			}

			if (numberQuestion === questions.length - 1) {
				nextBtn.classList.add('d-none');
				sendBtn.classList.remove('d-none');
			} else {
				nextBtn.classList.remove('d-none');
				sendBtn.classList.add('d-none');
			}
		};
		checkBtns();

		modalFooter.addEventListener('click', event => {
			if (event.target.id === 'prev') {
				numberQuestion--;
				checkBtns();
				renderQuestions(numberQuestion);
			} else if (event.target.id === 'next') {
				numberQuestion++;
				checkBtns();
				renderQuestions(numberQuestion);
			}
		});

	};

	const showDialog = () => {
		menuButton.classList.add('active');
		modalBlock.classList.add('d-block');
		playTest();
	};

	const hideDialog = () => {
		menuButton.classList.remove('active');
		modalBlock.classList.remove('d-block');
	};

	window.addEventListener('resize', handleWidth);

	document.addEventListener('click', event => {
		let target = event.target;
		if (target.closest('.btnOpenModal') || target.closest('.burger')) {
			showDialog();
		} else if (target.closest('.close')) {
			hideDialog();
		} else {
			target = target.closest('.modal-dialog');
			if (!target) {
				hideDialog();
			}
		}
	});

});
