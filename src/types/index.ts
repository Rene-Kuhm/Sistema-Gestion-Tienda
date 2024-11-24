export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  stock: number;
  categoria: string;
  codigoBarras?: string;
  ultimaActualizacion: Date;
  urlPrecioReferencia?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Factura {
  id: string;
  numero: string;
  fecha: Date;
  items: LineaFactura[];
  total: number;
  cliente: Cliente;
  tipo: TipoFactura;
  estado: EstadoFactura;
  cae?: string;
  vencimientoCae?: Date;
}

export interface LineaFactura {
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  iva: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  documento: string;
  tipoDocumento: TipoDocumento;
  direccion: string;
  email: string;
  condicionIva: CondicionIva;
}

export enum TipoFactura {
  A = 'A',
  B = 'B',
  C = 'C'
}

export enum EstadoFactura {
  PENDIENTE = 'PENDIENTE',
  EMITIDA = 'EMITIDA',
  ANULADA = 'ANULADA'
}

export enum TipoDocumento {
  DNI = 'DNI',
  CUIT = 'CUIT',
  CUIL = 'CUIL'
}

export enum CondicionIva {
  RESPONSABLE_INSCRIPTO = 'RESPONSABLE_INSCRIPTO',
  CONSUMIDOR_FINAL = 'CONSUMIDOR_FINAL',
  MONOTRIBUTO = 'MONOTRIBUTO',
  EXENTO = 'EXENTO'
}