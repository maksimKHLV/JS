const usernameInput = document.getElementById('username-input');

usernameInput.addEventListener('input', function(event) {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/\d/g, ''); // Фильтруем цифры

  if (filteredValue !== inputValue) {
    usernameInput.value = filteredValue; // Устанавливаем отфильтрованное значение в поле ввода
  }
});