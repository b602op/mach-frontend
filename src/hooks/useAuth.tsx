import { useGetUserQuery } from '../services/api';

export const useAuth = () => {
  const {
    data: authData,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetUserQuery();

  return {
    // Состояние аутентификации
    user: authData?.user || null,
    isAuth: authData?.isAuth || false,
    
    // Загрузки
    isLoading: isLoading || isFetching,
    isInitialLoading: isLoading, // Первая загрузка
    
    // Действия
    refetchUser: refetch,
    
    // Ошибки
    error,
    
    // Удобные проверки
    isAuthenticated: authData?.isAuth || false,
    isAnonymous: !authData?.isAuth,
  };
};