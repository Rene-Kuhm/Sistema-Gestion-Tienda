import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';
import Facturacion from './pages/Facturacion';
import ActualizarPrecios from './pages/ActualizarPrecios';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/facturacion" element={<Facturacion />} />
              <Route path="/precios" element={<ActualizarPrecios />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;