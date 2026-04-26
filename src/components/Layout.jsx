import { Outlet } from "react-router-dom"; // Importe o Outlet
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="flex h-screen bg-slate-900">
    <Sidebar />
    <main className="flex-1 ml-64 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <Outlet /> 
      </div>
    </main>
  </div>
);

export default Layout;