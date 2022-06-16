import AuthService from './authService';
import StoreService from './storeService';
import UserService from './userService';

export const authService = new AuthService();
export const userService = new UserService(authService);
export const storeService = new StoreService();