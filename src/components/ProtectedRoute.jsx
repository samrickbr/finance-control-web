import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, perfisPermitidos }) => {
  const token = localStorage.getItem('token');
  const userStorage = localStorage.getItem('usuarioLogado');
  const usuario = userStorage ? JSON.parse(userStorage) : null;

  // 1. Se não está logado, manda o usuario para o login!
  if (!token) return <Navigate to="/" replace />;

  // 2. Se a rota exige um perfil específico (ex: ADMIN) e o usuário não tem
  if (perfisPermitidos && !perfisPermitidos.includes(usuario?.perfil)) {
    alert("Acesso negado: Você não tem permissão para esta área.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;