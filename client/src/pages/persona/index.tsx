import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { WarningIcon, CheckIcon } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { usePersonas } from '@/hooks/usePersonas'
import { Loading } from '@/components/ui/Loading'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

function PersonasView() {
  const { personas, setSearch, search, loading, fechtDataAgain } = usePersonas()
  const navigate = useNavigate()

  return (
    <section>
      <header className='flex items-center justify-around p-1 px-4'>
        <form className='flex items-center gap-2'>
          <Label className='min-w-36'>Buscar empleado:</Label>
          <Input
            type='text'
            id='search'
            value={search}
            className='w-96'
            placeholder='N° Documento / Nombres'
            onChange={ev => setSearch(ev.target.value)}
          />
        </form>
        <div className='flex items-center gap-2'>
          <p className='font-semibold'>N° Empleados Activos:</p>
          <Badge className='text-base font-semibold'>{personas.length}</Badge>
        </div>
        <Button
          onClick={() => fechtDataAgain()}>
          Recargar Empleados
        </Button>
      </header>

      <Separator />

      {
        loading
          ? (
            <section className='h-[92vh] flex items-center justify-center pb-12'>
              <Loading>Cargando lista empleados</Loading>
            </section>
          )
          : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[40px]'>ID</TableHead>
                  <TableHead>N° Identificación</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personas.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell >{p.id}</TableCell>
                    <TableCell >{p.identificacion}</TableCell>
                    <TableCell>{p.nombres}</TableCell>
                    <TableCell>{p.apellidos}</TableCell>
                    <TableCell >
                      {
                        p.identificacion === p.apellidos && p.apellidos === p.nombres
                          ? <p className='text-red-600' title='El empleado le faltan datos básicos. Edite la información para agregarlos'><WarningIcon /></p>
                          : <p className='text-green-600'><CheckIcon /></p>
                      }
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/empleado/${p.id}`)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
      }

    </section>
  )
}

export default PersonasView
