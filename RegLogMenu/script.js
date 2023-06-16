// Класс для работы с формой
class Form {
    constructor(formElement) {
      this.formElement = formElement;
      this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    }
  
    handleSubmit(event) {
      event.preventDefault(); // Отменяем стандартное поведение формы
  
      const formData = new FormData(this.formElement);
      const data = Object.fromEntries(formData.entries()); // Преобразуем данные формы в объект
  
      // Валидация данных формы
      if (this.validateForm(data)) {
        // Сохраняем данные в JSON файл
        this.saveDataToJson(data);
      }
    }
  
    validateForm(data) {
      // Добавьте необходимую логику валидации формы
      // Если данные неверны, отобразите сообщения об ошибке
      return true; // Возвращаем true, если данные верны
    }
  
    saveDataToJson(data) {
      // Преобразуем объект с данными в формат JSON
      const jsonData = JSON.stringify(data);
  
      // Отправляем запрос на сервер для сохранения данных
      // В данном примере мы симулируем отправку данных
      setTimeout(() => {
        console.log('Данные сохранены:', jsonData);
      }, 1000);
    }
  }
  
  // Инициализируем форму
  const loginForm = new Form(document.getElementById('login-form'));
  const registrationForm = new Form(document.getElementById('registration-form'));