import axios from 'axios';
import { Producto } from '../types';

// Simulación de variaciones de precio del proveedor
function simularPrecioProveedor(precioBase: number): number {
  const variacion = (Math.random() - 0.3) * 0.1; // -3% a +7% de variación
  return precioBase * (1 + variacion);
}

export async function actualizarPreciosDesdeReferencia(producto: Producto): Promise<number | null> {
  if (!producto.urlPrecioReferencia) {
    return null;
  }

  // Simulamos una llamada a la API del proveedor
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoPrecio = simularPrecioProveedor(producto.precio);
      resolve(Number(nuevoPrecio.toFixed(2)));
    }, 1000); // Simulamos 1 segundo de delay
  });
}

export function calcularNuevoPrecio(precioBase: number, margenGanancia: number = 0.3): number {
  return precioBase * (1 + margenGanancia);
}