
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const questions = [
        {
            question: "What is 2*5?",
            answers: [
                { title: 2 },
                { title: 10 },
                { title: 15 },
                { title: 20 }
            ],
            correctAnswer: 2
        },
        {
            question: "What is 3*6?",
            answers: [
                { title: 3 },
                { title: 6 },
                { title: 12 },
                { title: 18 }
            ],
            correctAnswer: 4
        },
        {
            question: "What is 8*9?",
            answers: [
                { title: 72 },
                { title: 99 },
                { title: 108 },
                { title: 156 },
            ],
            correctAnswer: 0
        },
        {
            question: "What is 1*7?",
            answers: [
                { title: 4 },
                { title: 5 },
                { title: 6 },
                { title: 7 }
            ],
            correctAnswer: 3
        },
        {
            question: "What is 8*8?",
            answers: [
                { title: 20 },
                { title: 40 },
                { title: 50 },
                { title: 64 },
            ],
            correctAnswer: 4
        }
    ];

    let data = {};

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        console.log(res);


        return await res.json();
    }

    getResource(' http://localhost:3000/questions')
        .then(res => data = res)

    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const btnCloseModal = document.getElementById('closeModal');

    const questionOutput = document.getElementById('question');
    const answersOutput = document.getElementById('formAnswers');

    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const send = document.getElementById('send');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.style.display = 'block';
        playTest();
    })

    btnCloseModal.addEventListener('click', () => {
        modalBlock.style.display = 'none';
    })

    document.addEventListener('click', (e) => {
        let target = e.target;

        if (target.classList.contains('modal')) {
            modalBlock.style.display = 'none';
        }
    })

    const playTest = () => {
        const numberQuestion = 0;
        const answers = [];
        console.log(data);


        answersOutput.innerHTML = '';

        // функция выдает нам элементы ответов для отрисовки
        const renderQiestions = (index) => {

            questions[index].answers.forEach((answer) => {

                const itemBlock = document.createElement('div');
                itemBlock.classList.add('answers-item', 'col-3', 'd-flex', 'justify-content-center');

                itemBlock.innerHTML = `
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1">${answer.title}</label>
                `
                answersOutput.appendChild(itemBlock);
            })
        }

        // вывод информации в элементы окна
        const renderQuestion = (index) => {
            questionOutput.textContent = questions[index].question;

            renderQiestions(index);
        }

        // сразу запускаем отрисовку 
        renderQuestion(numberQuestion);
    }
})