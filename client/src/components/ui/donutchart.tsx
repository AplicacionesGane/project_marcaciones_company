import { InfoMarcacion } from '../../types/marcacion';
import { PieChart } from '@mui/x-charts/PieChart';

export function BasicPie({ datos }: { datos: InfoMarcacion}) {
  const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#e414fd', '#fd1429'];

  const estadosData = datos.stados ? Object.entries(datos.stados).map(([label, value], index) => ({
    id: label,
    value: value as number,
    label,
    color: colores[index % colores.length]
  })) : [];

  const estadosDatas = [{
    value: datos.count,
    label: 'cantidad de marcaciones',
    color: colores[4]  
  },

  {
    value: datos.totalPersona,
    label: 'personar registradas',
    color: colores[5]  
  }
];


  return (
    <>
      <PieChart
        series={[
          {
            data: estadosData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            innerRadius: 40,
            outerRadius: 130,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 270,
            cx: 150,
            cy: 150,
          },
        ]}
        width={400}
        height={400}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'left' },
            padding: 20,
            labelStyle: {
              fontSize: 17,
              textAlign: 'left'
            },
          },
        }} />

      <PieChart
        series={[{
          data: estadosDatas,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          innerRadius: 40,
          outerRadius: 130,
          paddingAngle: 2,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 270,
          cx: 150,
          cy: 150,
        }]}
        width={400}
        height={400}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'left' },
            padding: 20,
            labelStyle: {
              fontSize: 17,
              textAlign: 'left',
            },
          },
        }}
      />
    </>
  );
}