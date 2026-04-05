import axios from 'axios';

// Criamos uma instância do Axios configurada
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL onde seu Spring Boot roda
  timeout: 5000, // Se a API demorar mais de 5s, ele cancela
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;