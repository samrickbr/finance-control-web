import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout"; // Use o Layout que criamos
import ProtectedRoute from "./components/ProtectedRoute";
import Lancamentos from "./pages/Lancamentos";
import ListagemLancamentos from "./pages/ListagemLancamentos";
import Tipos from "./pages/Tipos";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rota pai que protege e envolve todas as filhas */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/extrato" element={<ListagemLancamentos />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
