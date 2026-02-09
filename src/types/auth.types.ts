/**
 * Типы для модуля авторизации и пользователя
 */

// ==================== БАЗОВЫЕ ТИПЫ ====================

/** Базовый пользователь без чувствительных данных */
export interface BaseUser {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Полный пользователь (для админки или профиля) */
export interface User extends BaseUser {
  isActive: boolean;
  isVerified: boolean;
  lastLoginAt?: Date;
  role: UserRole;
  stats?: UserStats;
  preferences?: UserPreferences;
}

/** Роли пользователей */
export enum UserRole {
  PLAYER = 'player',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

/** Статистика пользователя в игре */
export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  totalCoinsEarned: number;
  favoriteCard?: string;
  winRate: number;
  achievements: Achievement[];
  ranking: number;
}

/** Достижения пользователя */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: AchievementRarity;
}

/** Редкость достижения */
export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

/** Настройки пользователя */
export interface UserPreferences {
  theme: ThemeMode;
  language: string;
  soundEnabled: boolean;
  musicVolume: number;
  effectsVolume: number;
  notifications: NotificationSettings;
  gamePreferences: GamePreferences;
}

/** Тема приложения */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

/** Настройки уведомлений */
export interface NotificationSettings {
  gameInvites: boolean;
  gameStart: boolean;
  turnNotifications: boolean;
  friendRequests: boolean;
  soundNotifications: boolean;
}

/** Игровые предпочтения */
export interface GamePreferences {
  autoRollDice: boolean;
  confirmEndTurn: boolean;
  showCardTooltips: boolean;
  animationSpeed: AnimationSpeed;
  defaultPlayers: number;
}

/** Скорость анимаций */
export enum AnimationSpeed {
  SLOW = 'slow',
  NORMAL = 'normal',
  FAST = 'fast',
  INSTANT = 'instant'
}

// ==================== АВТОРИЗАЦИЯ ====================

/** Данные для входа */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/** Данные для регистрации */
export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

/** Ответ на успешную аутентификацию */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number; // В секундах
}

/** Токены аутентификации */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: number; // Timestamp
}

/** Обновление токена */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Восстановление пароля */
export interface ForgotPasswordRequest {
  email: string;
}

/** Сброс пароля */
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/** Изменение пароля (в профиле) */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** Обновление профиля */
export interface UpdateProfileRequest {
  username?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

// ==================== СОСТОЯНИЕ АВТОРИЗАЦИИ ====================

/** Состояние авторизации в Redux/Context */
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number; // Timestamp
}

/** Действия для обновления состояния */
export type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: AuthResponse }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'UPDATE_TOKENS'; payload: AuthTokens }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'REFRESH_TOKEN_REQUEST' }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: AuthTokens }
  | { type: 'REFRESH_TOKEN_FAILURE'; payload: string };

// ==================== ВАЛИДАЦИЯ ====================

/** Ошибки валидации форм */
export interface AuthValidationErrors {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
  general?: string;
}

/** Правила валидации */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

/** Схема валидации */
export interface ValidationSchema {
  [key: string]: ValidationRule;
}

// ==================== API ОТВЕТЫ ====================

/** Ответ API на ошибку аутентификации */
export interface AuthErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: {
    field?: string;
    reason?: string;
  }[];
}

/** Успешный ответ API */
export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// ==================== СОКЕТ АВТОРИЗАЦИЯ ====================

/** Сообщение для аутентификации через WebSocket */
export interface SocketAuth {
  token: string;
  userId: string;
}

/** Ответ на аутентификацию сокета */
export interface SocketAuthResponse {
  authenticated: boolean;
  userId?: string;
  error?: string;
}

// ==================== КОНСТАНТЫ ====================

/** Константы для авторизации */
export const AUTH_CONSTANTS = {
  TOKEN_KEY: 'machikoro_access_token',
  REFRESH_TOKEN_KEY: 'machikoro_refresh_token',
  USER_KEY: 'machikoro_user',
  TOKEN_EXPIRY_BUFFER: 60, // Запас 60 секунд перед истечением токена
  REFRESH_THRESHOLD: 300, // Обновлять токен если осталось меньше 5 минут
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 минут в миллисекундах
} as const;

// ==================== УТИЛИТАРНЫЕ ТИПЫ ====================

/** Guard для проверки авторизации */
export type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  roles?: UserRole[];
  redirectTo?: string;
};

/** Пропсы для защищенных маршрутов */
export type ProtectedRouteProps = {
  element: React.ReactElement;
  roles?: UserRole[];
};

/** Хук useAuth возвращаемый тип */
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// ==================== ЭКСПОРТ ====================

/** Экспорт всех типов */
// export type {
//   BaseUser,
//   User,
//   UserStats,
//   UserPreferences,
//   Achievement,
//   LoginCredentials,
//   RegisterCredentials,
//   AuthResponse,
//   AuthTokens,
//   AuthState,
//   AuthAction,
//   AuthValidationErrors,
//   ValidationRule,
//   ValidationSchema,
//   AuthErrorResponse,
//   ApiSuccessResponse,
//   SocketAuth,
//   SocketAuthResponse,
//   AuthGuardProps,
//   ProtectedRouteProps,
//   UseAuthReturn,
// };

/** Экспорт всех enum */
// export {
//   UserRole,
//   ThemeMode,
//   AchievementRarity,
//   AnimationSpeed,
//   AUTH_CONSTANTS,
// };