let data;
let currentCategory;
let currentQuestionIndex = 0;
let correctAnswers = [];
let calcAns = 0;

function kekboks(element) {
  if (element.classList.contains('checked') == true) {
    element.classList.remove('checked');
    // console.log("Сняли выделение с ");

  } else {
    element.classList.add('checked');
    // console.log("Нажата кнопка с индексом ");
  }
}

async function loadData() {
  const response = await fetch('/questions/questions.json');
  const jsonData = await response.json(); 
  data = jsonData;
  // console.log(data);

}
loadData();

function handleCategoryClick(event) {

  const selectedCategory = data.categories.find(category => category.name === event.currentTarget.id);
  // console.log(selectedCategory);

  document.querySelector('.StartPage').classList.add('hide');

  const questionPage = document.querySelector('.QuestionPage');
  questionPage.classList.remove('hideq');

  const backgroundImage = selectedCategory.backgroundImage;
  const targetElement = document.querySelector('.QuestionPage');
  targetElement.classList.add('change-background');
  const QuestionPageContainer = document.querySelector('.change-background');
  QuestionPageContainer.style.background = `url(${backgroundImage}) no-repeat`;
  currentCategory = selectedCategory;
  currentQuestionIndex = 0;
  if (selectedCategory.questions.length > 0) {
    displayQuestion(selectedCategory.questions[0]);
  }

}


//отобразим текст вопроса
function displayQuestion(question) {
  const questionElement = document.querySelector('.Question');
  const answerElement = document.querySelectorAll('.answer p');


  questionElement.textContent = question.text;
  correctAnswers.push(question.correct);
  // console.log(correctAnswers, question.correct)
  //отобразим варианты ответов
  question.answers.forEach((answer, index) => {
    answerElement[index].textContent = answer;

    const answersContainer = document.querySelector('.contentPageQ');

  })

}

function checkAnswer(answerIndex) {
  // Получаем нажатую кнопку
  let answers = document.querySelectorAll('.answer');

  answers.forEach((answer, index) => {
    if (index === answerIndex) {
      // console.log('indexlog: ', answerIndex);
      // Проверяем, правильный ли это ответ
      if (correctAnswers.flat().includes(index)) {
        calcAns++;
        // console.log('calcAns' + calcAns)
        // Если да - подсвечиваем зеленым
        answer.classList.add('correct');
      } else {
        // Если нет - подсвечиваем красным 
        answer.classList.add('wrong');
      }
    }
  });
}

function updateScore() {
  const spanScore = document.getElementById('spanScore');
  spanScore.textContent = `${calcAns}/5`;
  // console.log('пощитали' + calcAns);
}

// Функция для подсветки правильных ответов 
function highlightCorrectAnswers() {
  const answerElements = document.querySelectorAll('.answer');

  const correctIndices = correctAnswers.flat();

  correctIndices.forEach(index => {
    if (index >= 0 && index < answerElements.length) {
      // Подсвечиваем правильный ответ зеленым
      answerElements[index].classList.add('correct');
      
    }
  });

}
//неправильных
function highlightWrongAnswers() {

  let answerElements = document.querySelectorAll('.answer');

  for (let i = 0; i < answerElements.length; i++) {
    if (!correctAnswers.flat().includes(i)) {
      // console.log('неправильный ответ', i);
      // Если ответ не правильный
      if (answerElements[i].classList.contains('checked')) {
        // Если ответ был выбран, подсвечиваем его красным
        // console.log("Подсвечиваю неправильный: " + i);
        answerElements[i].classList.add('wrong');
      }
      // Если ответ правильный, подсвечиваем его зеленым
      else if (correctAnswers.flat().includes(i)) {

        answerElements[i].classList.add('correct');
      }
    }
  }
}


// Обработчик для кнопки "Next"
function handleNextClick() {
  currentQuestionIndex++;
  // console.log('Next clicked. Current index: ' + currentQuestionIndex);
  if (document.querySelectorAll('.wrong').length<1) {
    calcAns++;
        // console.log('calcAns' + calcAns)
  }

  // Проверим, есть ли еще вопросы
  if (currentQuestionIndex < currentCategory.questions.length) {
    displayQuestion(currentCategory.questions[currentQuestionIndex])
  } else {
    const questionPage = document.querySelector('.QuestionPage')
    questionPage.classList.add('hideq');
    const FinalPage = document.querySelector('.FinalPage');
    FinalPage.classList.remove('hided');
    updateScore();
    return;
  }
  // console.log('After handleNextClick - correctAnswers:', correctAnswers);
  if (currentCategory.questions[currentQuestionIndex].correct.length>1) {
    // console.log('вывели по коррект' + currentCategory.questions[currentQuestionIndex].correct)
    document.querySelector('.moreThanOne').style.display = 'block';
  } else {
    document.querySelector('.moreThanOne').style.display = 'none';
  }

}


document.querySelector('.NextBtn').addEventListener('click', () => {
  if (document.querySelectorAll('.checked').length<1) {
return;
  }
  // console.log('Before setTimeout - correctAnswers:', correctAnswers);
  //handleNextClick();

  highlightWrongAnswers();
  highlightCorrectAnswers();

  setTimeout(() => {
    // console.log('Inside setTimeout, before handleNextClick', correctAnswers);
    //toggleAnswerHighlight();
    correctAnswers = [];
    handleNextClick();
    answersButtons = document.querySelectorAll('.answer');
    // console.log('Inside setTimeout, after handleNextClick', correctAnswers);
    let allElements = document.querySelectorAll('.answer');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove('checked', 'correct', 'wrong');
    }
  }, 3000);
  // console.log('After setTimeout - correctAnswers:', correctAnswers);
});
