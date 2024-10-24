
import { PieChart } from '@mui/x-charts/PieChart';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BasicPie({ datos }: { datos: any }) {
  console.log('datos', datos)

  const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  // Asegúrese de que datos.stados existe antes de usarlo
  const estadosData = datos.stados ? Object.entries(datos.stados).map(([label, value], index) => ({
    id: label,
    value: value as number,
    label,
    color: colores[index % colores.length]
  })) : [];


  return (
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
      }}
    />
  );
}