// src/constants.ts

// 1. API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
  },
  // ... другие endpoint'ы
} as const;

// 2. Роли пользователей
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
  MODERATOR: 'moderator',
} as const;

// 3. Ключи для localStorage/sessionStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// 4. Время кэширования (в миллисекундах)
export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 минут
  MEDIUM: 30 * 60 * 1000, // 30 минут
  LONG: 24 * 60 * 60 * 1000, // 24 часа
} as const;

// 5. Время жизни токена
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 15 * 60 * 1000, // 15 минут
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 дней
} as const;

// 6. Ограничения форм
export const FORM_LIMITS = {
  USERNAME: {
    MIN: 3,
    MAX: 30,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 100,
  },
  EMAIL: {
    MAX: 254,
  },
} as const;

// 7. Пути для навигации
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
} as const;

// 8. Сообщения об ошибках
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету.',
  UNAUTHORIZED: 'Требуется авторизация.',
  FORBIDDEN: 'Доступ запрещен.',
  NOT_FOUND: 'Ресурс не найден.',
  SERVER_ERROR: 'Ошибка сервера. Попробуйте позже.',
  INVALID_CREDENTIALS: 'Неверный email или пароль.',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует.',
} as const;

// 9. Сообщения об успехе
export const SUCCESS_MESSAGES = {
  LOGIN: 'Вход выполнен успешно!',
  LOGOUT: 'Выход выполнен успешно.',
  REGISTER: 'Регистрация прошла успешно!',
  PROFILE_UPDATE: 'Профиль обновлен.',
} as const;

// 10. Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
} as const;

// 11. Настройки приложения
export const APP_CONFIG = {
  NAME: 'My Application',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'ru',
  SUPPORTED_LANGUAGES: ['ru', 'en', 'kk'],
  DEFAULT_THEME: 'light',
  API_TIMEOUT: 10000, // 10 секунд
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
} as const;

// 12. Ключи для feature flags или A/B тестов
export const FEATURE_FLAGS = {
  ENABLE_NEW_UI: true,
  ENABLE_DARK_MODE: true,
  ENABLE_ANALYTICS: false,
} as const;

// 13. URL внешних сервисов
export const EXTERNAL_URLS = {
  SUPPORT: 'https://support.example.com',
  DOCS: 'https://docs.example.com',
  PRIVACY_POLICY: 'https://example.com/privacy',
  TERMS_OF_SERVICE: 'https://example.com/terms',
} as const;

// 14. Типы событий для аналитики
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup',
  BUTTON_CLICK: 'button_click',
} as const;

// 15. Цвета темы (если не используете CSS variables)
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  SUCCESS: '#10b981',
} as const;

// Типы для TypeScript
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];