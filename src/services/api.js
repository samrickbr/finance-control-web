import axios from 'axios';

// Criamos uma instância do Axios configurada
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL onde seu Spring Boot roda
  timeout: 5000, // Se a API demorar mais de 5s, ele cancela
  headers: {
    'Content-Type': 'application/json'
  }
});

//adicionar o token automaticamente a cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Só adiciona se o token existir e não for uma rota de login
  if (token && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token enviado na requisição!");
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;