import { Marcacion } from '../models/marcaciones.model';
import { Estado } from '../enums';

function reduceStates (marcacion: Marcacion[]) {

  const estadosMap: { [key: string]: Estado } = {
    'Entrada': Estado.Entrada,
    'Salida_intermedia': Estado.SalidaIntermedia,
    'Entrada_intermedia': Estado.EntradaIntermedia,
    'Salida': Estado.Salida
  };

  return marcacion.reduce((acc, mar) => {
    const key = estadosMap[mar.estado];
    if (key) { acc[key] += 1; }
    return acc
  }, { 
    [Estado.Entrada]: 0,
    [Estado.SalidaIntermedia]: 0,
    [Estado.EntradaIntermedia]: 0,
    [Estado.Salida]: 0
  })
}

export { reduceStates };