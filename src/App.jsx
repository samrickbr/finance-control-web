import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout"; // Use o Layout que criamos
import ProtectedRoute from "./components/ProtectedRoute";
import Lancamentos from "./pages/Lancamentos";
import ListagemLancamentos from "./pages/ListagemLancamentos";

function App() {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/" element={<Login />} />

      {/* ROTAS PROTEGIDAS */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Layout>
              <Usuarios />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lancamentos"
        element={
          <ProtectedRoute>
            <Layout>
              <Lancamentos />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/extrato"
        element={
          <ProtectedRoute>
            <Layout>
              <ListagemLancamentos />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Redirecionar qualquer rota desconhecida */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
