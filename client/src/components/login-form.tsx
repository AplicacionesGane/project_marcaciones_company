import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME, URL_API_LOGIN } from '@/utils/contants'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthContext'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { cn } from '@/lib/utils'
import axios from 'axios'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    axios.post(`${URL_API_LOGIN}/login`, { username, password, app: APP_NAME })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          toast.error('Error de conexión, y/o Red, contacte al administrador del sistema', { description: 'No se pudo iniciar session' })
          return
        }

        if (error.response.status === 400 || error.response.status === 401) {
          toast.error(error.response.data.message, { description: error.response.data.description })
          return
        }

      })
  }

  return (
    <>
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingrese su usuario y contraseña para acceder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='username'>Usuario:</Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder='CP1118*******'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Contraseña:</Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='•••••••••'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    required
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </>
  )
}
