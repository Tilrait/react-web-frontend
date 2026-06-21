import { createContext } from 'react';

const baseURL = 'http://localhost:8000'; // ссылка на бэк
const TokenContext = createContext(undefined); // контекст для использования токена всеми потоками, кому надо

const RefreshListContext = createContext(undefined);

export { baseURL, TokenContext, RefreshListContext };
