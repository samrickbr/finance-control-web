import axios from 'axios';

// Criamos uma instância do Axios configurada
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL onde seu Spring Boot roda
  timeout: 5000, // Se a API demorar mais de 5s, ele cancela
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1. Interceptor de Requisição (Continua igual, adiciona o token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 2. NOVO: Interceptor de Resposta (Trata o token expirado)
api.interceptors.response.use(
  (response) => response, // Se a resposta for OK (200), só passa adiante
  (error) => {
    // Se o erro for 401, o token provavelmente expirou
    if (error.response && error.response.status === 401) {
      console.warn("Sessão expirada. Redirecionando para o login...");
      
      // Limpa os dados de sessão
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioLogado');
      
      // Redireciona para o login (forçando o refresh da página)
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;