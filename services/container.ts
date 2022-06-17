import React from 'react';
import AuthService from './authService';
import BookService from './bookService';
import StoreService from './storeService';
import UserService from './userService';

const authService = new AuthService();
const userService = new UserService(authService);
const storeService = new StoreService();
const bookService = new BookService();

export const container = {
    authService,
    userService,
    storeService,
    bookService
}