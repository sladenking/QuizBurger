'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const modalBlock = document.getElementById('modalBlock'),
		questionTitle = document.getElementById('question'),
		formAnswers = document.getElementById('formAnswers'),
		menuButton = document.getElementById('burger'),
		prevBtn = document.getElementById('prev'),
		nextBtn = document.getElementById('next'),
		sendBtn = document.getElementById('send'),
		modalFooter = document.getElementById('modalFooter');

	const handleWidth = () => {
		const clientWidth = document.documentElement.clientWidth;
		menuButton.style.display = clientWidth > 768 ? 'none' : 'flex';
	};

	handleWidth();

	const playTest = () => {

		let numberQuestion = 0;

		const finalAnswers = [];

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
					<div class="answers-item d-flex justify-content-center">
						<input type="${questions[i].type}" id="${answers.title}" 
						name="answer" class="d-none" value="${answers.title}">
						<label for="${answers.title}" class="d-flex flex-column justify-content-between">
							<img class="answerImg" src="${answers.url}" alt="burger">
							<span>${answers.title}</span>
						</label>
					</div>
					`;
				formAnswers.insertAdjacentHTML('beforeend', blocks);
			});
		};

		const checkBtns = () => {
			if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
				if (numberQuestion !== 0) {
					prevBtn.classList.remove('d-none');
				} else {
					prevBtn.classList.add('d-none');
				}
				nextBtn.classList.remove('d-none');
				sendBtn.classList.add('d-none');
			}

			if (numberQuestion === questions.length) {
				prevBtn.classList.add('d-none');
				nextBtn.classList.add('d-none');
				sendBtn.classList.remove('d-none');
			} else if (numberQuestion === questions.length + 1) {
				sendBtn.classList.add('d-none');
			}
		};

		checkBtns();

		const renderQuestions = iQ => {

			if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
				questionTitle.textContent = `${questions[iQ].question}`;
				renderAnswers(iQ);
			} else if (numberQuestion === questions.length) {
				checkBtns();
				questionTitle.textContent = 'Спасибо за ответы';
				formAnswers.innerHTML = `
					<div class="form-group">
						<label for="numberPhone">Введите свой номер телефона</label>
						<input type="phone" class="form-control" id="numberPhone">
					</div>
				`;
			} else {
				formAnswers.textContent = 'Менеджер свяжется с вами в течении 15 минут!';
				checkBtns();
			}

		};

		renderQuestions(numberQuestion);

		const checkAnswers = () => {
			const obj = {};

			const inputs = [...formAnswers.elements]
				.filter(item => item.checked || item.id === 'numberPhone');

			inputs.forEach((input, index) => {
				if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
					obj[`${index}_${questions[numberQuestion].question}`] = input.value;
				} else if (numberQuestion === questions.length) {
					obj[`Номер телефона`] = input.value;
				}
			});

			finalAnswers.push(obj);
		};

		modalFooter.addEventListener('click', event => {

			switch (true) {
			case (event.target.id === 'prev'):
				numberQuestion--;
				checkBtns();
				renderQuestions(numberQuestion);
				break;
			case (event.target.id === 'next'):
				checkAnswers();
				numberQuestion++;
				checkBtns();
				renderQuestions(numberQuestion);
				break;
			case (event.target.id === 'send'):
				checkAnswers();
				numberQuestion++;
				checkBtns();
				renderQuestions(numberQuestion);
				console.log(finalAnswers);
				break;
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
