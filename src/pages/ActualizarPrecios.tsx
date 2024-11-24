import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Edit, Plus } from 'lucide-react';
import { useStore } from '../store';
import { actualizarPreciosDesdeReferencia } from '../services/precios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ProductEditModal from '../components/ProductEditModal';
import type { Producto } from '../types';

function ActualizarPrecios() {
  const { productos, actualizarProducto, agregarProducto } = useStore();
  const [actualizando, setActualizando] = useState<string[]>([]);
  const [resultados, setResultados] = useState<{[key: string]: boolean}>({});
  const [actualizacionAutomatica, setActualizacionAutomatica] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | undefined>();

  const actualizarPrecio = async (productoId: string) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    setActualizando(prev => [...prev, productoId]);

    try {
      const nuevoPrecio = await actualizarPreciosDesdeReferencia(producto);
      
      if (nuevoPrecio) {
        actualizarProducto(productoId, {
          precioAnterior: producto.precio,
          precio: nuevoPrecio,
          ultimaActualizacion: new Date()
        });
        setResultados(prev => ({ ...prev, [productoId]: true }));
      } else {
        setResultados(prev => ({ ...prev, [productoId]: false }));
      }
    } catch (error) {
      setResultados(prev => ({ ...prev, [productoId]: false }));
    }

    setActualizando(prev => prev.filter(id => id !== productoId));
  };

  const actualizarTodos = () => {
    productos.forEach(producto => {
      if (producto.urlPrecioReferencia) {
        actualizarPrecio(producto.id);
      }
    });
  };

  const handleEditarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  const handleNuevoProducto = () => {
    setProductoSeleccionado(undefined);
    setModalOpen(true);
  };

  const handleGuardarProducto = (producto: Partial<Producto>) => {
    if (productoSeleccionado) {
      actualizarProducto(productoSeleccionado.id, producto);
    } else {
      const nuevoProducto: Producto = {
        id: Date.now().toString(),
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || 0,
        stock: producto.stock || 0,
        categoria: producto.categoria || '',
        codigoBarras: producto.codigoBarras,
        ultimaActualizacion: new Date()
      };
      agregarProducto(nuevoProducto);
    }
  };

  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (actualizacionAutomatica) {
      intervalo = setInterval(actualizarTodos, 300000);
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [actualizacionAutomatica]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Actualización de Precios</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="actualizacionAutomatica"
              checked={actualizacionAutomatica}
              onChange={(e) => setActualizacionAutomatica(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="actualizacionAutomatica" className="ml-2 text-sm text-gray-600">
              Actualización Automática
            </label>
          </div>
          <button
            onClick={actualizarTodos}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Actualizar Todos
          </button>
          <button
            onClick={handleNuevoProducto}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Producto
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actualización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {producto.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {producto.categoria}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${producto.precio.toFixed(2)}
                    </div>
                    {producto.precioAnterior && (
                      <div className={`text-sm ${
                        producto.precio > producto.precioAnterior 
                          ? 'text-red-500' 
                          : producto.precio < producto.precioAnterior 
                            ? 'text-green-500' 
                            : 'text-gray-500'
                      }`}>
                        Anterior: ${producto.precioAnterior.toFixed(2)}
                        {producto.precio !== producto.precioAnterior && (
                          <span className="ml-1">
                            ({((producto.precio - producto.precioAnterior) / producto.precioAnterior * 100).toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {producto.ultimaActualizacion ? 
                      format(new Date(producto.ultimaActualizacion), "d 'de' MMMM 'a las' HH:mm", { locale: es }) 
                      : 'No actualizado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {actualizando.includes(producto.id) ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Actualizando...
                      </span>
                    ) : resultados[producto.id] === true ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Actualizado
                      </span>
                    ) : resultados[producto.id] === false ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Error
                      </span>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => actualizarPrecio(producto.id)}
                      disabled={actualizando.includes(producto.id)}
                      className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 mr-3"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEditarProducto(producto)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductEditModal
        producto={productoSeleccionado}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleGuardarProducto}
      />
    </div>
  );
}

export default ActualizarPrecios;