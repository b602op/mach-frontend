import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/api';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  // Состояние формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Состояние для сообщений
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Хук RTK Query для логина
  const [login, { isLoading, error }] = useLoginMutation();


  const navigate = useNavigate();

  // Обработчик изменения полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      // Отправка запроса на логин
      const result = await login(formData).unwrap();


      // Успех: сохраняем токен и перенаправляем
      localStorage.setItem('token', result.token);
      setMessage('Вход выполнен успешно!');

      // Перенаправление на главную страницу
      navigate('/', { replace: true });
    } catch (err: any) {
      // Ошибка: извлекаем сообщение
      setIsError(true);
      setMessage(
        err?.data?.message ||
        err?.statusText ||
        'Ошибка входа. Проверьте данные.'
      );
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginTop: '10px',
          }}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link
          to="/register"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Зарегистрироваться
        </Link>
      </div>

      {message && (
        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: isError ? '#f8d7da' : '#d4edda',
            color: isError ? '#721c24' : '#155724',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
