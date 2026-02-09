// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoadingSpinner } from './components/ui';
import { Provider } from 'react-redux';

// Страницы
import {
  HomePage, RegisterPage, LoginPage
} from './pages';
import { store } from './app/store';

// Компонент для обработки начальной загрузки
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return <>{children}</>;
};

// Защищенный маршрут
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

// Публичный маршрут (только для неавторизованных)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return !isAuth ? <>{children}</> : <Navigate to="/" />;
};

function AppContent() {
  return (
    <Routes>
      {/* Главная - только для авторизованных */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } 
      />
      
      {/* Профиль - только для авторизованных */}
      {/* <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } 
      /> */}
      
      {/* Настройки - только для авторизованных */}
      <Route 
        path="/settings" 
        element={
          <PrivateRoute>
            <div>Settings Page</div>
          </PrivateRoute>
        } 
      />
      
      {/* Логин - только для НЕавторизованных */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      
      {/* Регистрация - только для НЕавторизованных */}
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      
      {/* 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer>
          <AppContent />
        </AuthInitializer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;