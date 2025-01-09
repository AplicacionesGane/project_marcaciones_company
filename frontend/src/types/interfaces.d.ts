export interface User {
  id: string;
  names: string,
  lastnames: string,
  username: string,
  email: string,
  company: string,
  process: string,
  sub_process: string,
}

interface Marcacion {
  id: number
  marcacion: string
  cantidad: number
}

interface AreaCount {
  cant: number
  des: string | null
}

export interface InfoMarcacion {
  count: number
  marcaciones: Marcacion[]
  totalPersona: number
  areas: AreaCount[]
}

export interface Area {
  id: number
  codigo: string
  descripcion: string
}

export interface Cargo {
  ID: number
  codigo: string
  descripcion: string
}

export interface GrupoTurnos {
  id: number;
  codigo: string;
  descripcion: string;
}