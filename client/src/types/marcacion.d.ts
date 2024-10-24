export interface Marcacion {
  id: number
  nombres: string
  apellidos: string
  fecha_marcacion: string
  estado_marcacion: string
  nombre_dispositivo: string
  observacion: string
  observacionPersonal: string
  id_turno: number
  Pais: string
  Ciudad: string
  Direccion: string
  Latitud: string
  Longitud: string
  id_foto_temota: string
}

export interface MarcacionPersonaArea {
  id: number
  documento: string
  nombres: string
  apellidos: string
  fecha: string
  horaMarcacion: string
  estado: string
  area: string
}

export interface AuditMarcaciones {
  id: number
  horaMarcacion: string
  estado: string
  nombres: string
  apellidos: string
  horaEstimada: string
  audit: string
}