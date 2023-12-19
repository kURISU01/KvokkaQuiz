function ChangeBackground() {
  var targetElement = document.querySelector('.StartPage');
  targetElement.classList.add('change-background');
}

const buttons = document.querySelectorAll('.answer');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.classList.contains('checked')) {
      button.classList.remove('checked');
    } else {
      button.classList.add('checked');
    }
  });
});