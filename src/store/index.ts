import { create } from 'zustand';
import { Producto, Categoria, Factura } from '../types';
import { productosMuestra } from '../data/productos-muestra';

interface EstadoTienda {
  productos: Producto[];
  categorias: Categoria[];
  facturas: Factura[];
  
  agregarProducto: (producto: Producto) => void;
  actualizarProducto: (id: string, producto: Partial<Producto>) => void;
  eliminarProducto: (id: string) => void;
  actualizarStock: (id: string, cantidad: number) => void;
  
  agregarCategoria: (categoria: Categoria) => void;
  actualizarCategoria: (id: string, categoria: Partial<Categoria>) => void;
  eliminarCategoria: (id: string) => void;
  
  agregarFactura: (factura: Factura) => void;
  actualizarFactura: (id: string, factura: Partial<Factura>) => void;
}

export const useStore = create<EstadoTienda>((set) => ({
  productos: productosMuestra,
  categorias: [],
  facturas: [],
  
  agregarProducto: (producto) =>
    set((state) => ({ productos: [...state.productos, producto] })),
    
  actualizarProducto: (id, producto) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id === id ? { ...p, ...producto } : p
      ),
    })),
    
  eliminarProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((p) => p.id !== id),
    })),
    
  actualizarStock: (id, cantidad) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id === id ? { ...p, stock: p.stock + cantidad } : p
      ),
    })),
    
  agregarCategoria: (categoria) =>
    set((state) => ({ categorias: [...state.categorias, categoria] })),
    
  actualizarCategoria: (id, categoria) =>
    set((state) => ({
      categorias: state.categorias.map((c) =>
        c.id === id ? { ...c, ...categoria } : c
      ),
    })),
    
  eliminarCategoria: (id) =>
    set((state) => ({
      categorias: state.categorias.filter((c) => c.id !== id),
    })),
    
  agregarFactura: (factura) =>
    set((state) => ({ facturas: [...state.facturas, factura] })),
    
  actualizarFactura: (id, factura) =>
    set((state) => ({
      facturas: state.facturas.map((f) =>
        f.id === id ? { ...f, ...factura } : f
      ),
    })),
}));