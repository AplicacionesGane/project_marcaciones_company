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

export interface Turnos {
  id: number;
  codigo: string;
  descripcion: string;
  hora_inicio: string;
  hora_fin: string;
  teorico: string;
  hora_inicio_break: string;
  hora_fin_break: string;
  tiempo_breack: string;
  conceptos: string;
}

export interface GrupoTurnos {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface GrupoHorarioAsignado {
  id: number;
  IdGrupoHorario: number;
  IdHorario: number;
  diaSeman: string;
  GrupoHorario: { id: number; descripcion: string };
  Turno: { id: number; descripcion: string };
}

export interface GrupoVsTurno {
  grupoHorario: { id: number; descripcion: string }[];
  horario: { id: number; descripcion: string }[];
  asignados: GrupoHorarioAsignado[];
}