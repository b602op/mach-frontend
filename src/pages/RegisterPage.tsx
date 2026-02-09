import React, { useState } from 'react';
import { useRegisterMutation } from '../services/api';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  // Состояние формы
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Состояние для сообщений
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Хук RTK Query (lazy-версия для ручного вызова)
  const [register, { isLoading }] = useRegisterMutation();

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
      // Вызов запроса через RTK Query
      const result = await register(formData).unwrap();

      // Успешный ответ
      setMessage(`Успешно! ${result.message}`);
    } catch (err: any) {
      // Ошибка (от бэкенда или сети)
      setIsError(true);
      setMessage(
        err?.data?.message || 
        err?.statusText ||
        'Произошла ошибка при регистрации'
      );
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Регистрация</h2>
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
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
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
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
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
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link
          to="/login"
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
          есть аккаунт?
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
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
