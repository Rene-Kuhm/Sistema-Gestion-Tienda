import { Producto } from '../types';

export const productosMuestra: Producto[] = [
  {
    id: '1',
    nombre: 'Notebook Lenovo ThinkPad',
    descripcion: 'Notebook empresarial de alta gama',
    precio: 899999.99,
    precioAnterior: 849999.99,
    stock: 15,
    categoria: 'Computadoras',
    codigoBarras: '7791234567890',
    ultimaActualizacion: new Date('2024-03-19T10:00:00'),
    urlPrecioReferencia: 'https://api.ejemplo.com/productos/notebook-lenovo'
  },
  {
    id: '2',
    nombre: 'Monitor Samsung 24"',
    descripcion: 'Monitor LED Full HD',
    precio: 159999.99,
    precioAnterior: 149999.99,
    stock: 25,
    categoria: 'Monitores',
    codigoBarras: '7791234567891',
    ultimaActualizacion: new Date('2024-03-19T10:00:00'),
    urlPrecioReferencia: 'https://api.ejemplo.com/productos/monitor-samsung'
  },
  {
    id: '3',
    nombre: 'Teclado Mecánico Redragon',
    descripcion: 'Teclado gaming RGB',
    precio: 45999.99,
    precioAnterior: 42999.99,
    stock: 30,
    categoria: 'Periféricos',
    codigoBarras: '7791234567892',
    ultimaActualizacion: new Date('2024-03-19T10:00:00'),
    urlPrecioReferencia: 'https://api.ejemplo.com/productos/teclado-redragon'
  },
  {
    id: '4',
    nombre: 'Mouse Logitech G502',
    descripcion: 'Mouse gaming de alto rendimiento',
    precio: 39999.99,
    precioAnterior: 37999.99,
    stock: 20,
    categoria: 'Periféricos',
    codigoBarras: '7791234567893',
    ultimaActualizacion: new Date('2024-03-19T10:00:00'),
    urlPrecioReferencia: 'https://api.ejemplo.com/productos/mouse-logitech'
  },
  {
    id: '5',
    nombre: 'Auriculares HyperX Cloud',
    descripcion: 'Auriculares gaming con micrófono',
    precio: 89999.99,
    precioAnterior: 84999.99,
    stock: 18,
    categoria: 'Audio',
    codigoBarras: '7791234567894',
    ultimaActualizacion: new Date('2024-03-19T10:00:00'),
    urlPrecioReferencia: 'https://api.ejemplo.com/productos/auriculares-hyperx'
  }
];