import { type Marcacion } from '@interface/marcacion'
import MarcacionesList from './marcacionList'

export default function Marcacion() {

  return (
    <section className='h-[93vh] overflow-y-auto'>
      <MarcacionesList />
    </section>
  )
}