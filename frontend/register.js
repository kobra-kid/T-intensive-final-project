// frontend/register.js
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Пароли не совпадают!');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(`Ошибка: ${errorData.error || 'Что-то пошло не так'}`);
      return;
    }

    try {
      const text = await res.text();
      console.log('Ответ сервера (текст):', text);
      const data = JSON.parse(text);
      console.log('Ответ сервера (объект):', data);
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      window.location.href = '/frontend/index.html';
    } catch (parseErr) {
      console.error('Ошибка парсинга JSON:', parseErr);
      alert('Ошибка в ответе сервера');
    }
    
  } catch (err) {
    alert('Ошибка соединения с сервером');
  }
});
