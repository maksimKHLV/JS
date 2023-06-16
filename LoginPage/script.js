// Создание класса для формы
class UserForm {
    constructor(formElement, onSubmit) {
      this.formElement = formElement;
      this.onSubmit = onSubmit;
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(this.formElement);
      const entries = Array.from(formData.entries());
      const data = Object.fromEntries(entries);
      this.onSubmit(data);
      this.formElement.reset();
    }
  }
  
  // Обработчик события отправки формы входа
  function handleLogin(data) {
    saveDataToJson('login.json', data);
    console.log('Вход:', data);
  }
  
  // Обработчик события отправки формы регистрации
  function handleRegistration(data) {
    saveDataToJson('registration.json', data);
    console.log('Регистрация:', data);
  }
  
  // Сохранение данных в файл JSON
  function saveDataToJson(filename, data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  
  // Создание экземпляра класса UserForm для формы входа
  const loginFormElement = document.getElementById('loginForm');
  const loginForm = new UserForm(loginFormElement, handleLogin);
  
  // Создание экземпляра класса UserForm для формы регистрации
  const registrationFormElement = document.getElementById('registrationForm');
  const registrationForm = new UserForm(registrationFormElement, handleRegistration);