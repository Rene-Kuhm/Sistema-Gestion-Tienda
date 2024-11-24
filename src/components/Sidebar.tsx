import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Receipt,
  Users,
  Settings,
  TrendingUp
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, text: 'Panel Principal' },
    { path: '/productos', icon: Package, text: 'Productos' },
    { path: '/inventario', icon: ClipboardList, text: 'Inventario' },
    { path: '/facturacion', icon: Receipt, text: 'Facturación' },
    { path: '/clientes', icon: Users, text: 'Clientes' },
    { path: '/precios', icon: TrendingUp, text: 'Actualizar Precios' },
    { path: '/configuracion', icon: Settings, text: 'Configuración' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.text}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;