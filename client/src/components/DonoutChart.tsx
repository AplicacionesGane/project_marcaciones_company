import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart'
import { Label, Pie, PieChart } from 'recharts'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Entrada',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Salida Intermedia',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Entrada Intermedia',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Salida',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export function ChartDonutMar({ items, count }: { items: { id: number, marcacion: string, cantidad: number }[] | undefined, count: number | undefined }) {

  const itemsAddColor = items?.map((item) =>
    item.marcacion === 'Entrada' ? { ...item, fill: 'var(--color-chrome)' } :
      item.marcacion === 'Salida Intermedia' ? { ...item, fill: 'var(--color-safari)' } :
        item.marcacion === 'Entrada Intermedia' ? { ...item, fill: 'var(--color-firefox)' } :
          item.marcacion === 'Salida' ? { ...item, fill: 'var(--color-edge)' } :
            { ...item, fill: 'var(--color-other)' }
  )

  return (
    <>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Cantidad De Marcaciones</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={itemsAddColor}
              dataKey='cantidad'
              nameKey='marcacion'
              innerRadius={65}
              strokeWidth={15}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-xl font-bold'
                        >
                          {count?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Total Marcaciones
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        {
          itemsAddColor?.map(item => (
            <div key={item.id} className='flex items-center justify-between w-[250px]'>
              <h1>{item.marcacion}</h1>
              <p>{item.cantidad}</p>
            </div>
          ))
        }
      </CardFooter>
    </>
  )
}
