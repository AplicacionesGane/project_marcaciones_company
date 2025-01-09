const enum Estado {
  Entrada = "Entrada",
  EntradaIntermedia = "Entrada Intermedia",
  Salida = "Salida",
  SalidaIntermedia = "Salida Intermedia",
}

interface AreaI {
  descripcion: string
}

interface Persona {
  nombres: string;
  apellidos: string;
  Area: AreaI | null
}

export interface Marcaciones {
  Id: number;
  codigo: string;
  Fecha: string;
  Hora: string;
  estado: Estado;
  Persona: Persona;
}

export interface AuditMarcaciones {
  id: number
  nombres: string
  apellidos: string
  hora: string
  estado: string
  hora_inicio: string
  hora_fin: string
}
