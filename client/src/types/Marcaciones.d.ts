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
