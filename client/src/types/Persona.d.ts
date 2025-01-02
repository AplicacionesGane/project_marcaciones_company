import { Area, Cargo, GrupoTurnos } from "./Interfaces"

export interface Persona {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
}

export interface PersonaFields extends Persona {
  id_Areas: null | number
  id_Cargo: null | number
  id_Grupo_Horario: null | number
}

interface ResponsePersona {
  persona: PersonaFields
  options: {
    Areas: Area[]
    Cargos: Cargo[]
    GruposHorario: GrupoTurnos[]
  }
}

