import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME, URL_API_LOGIN } from '@/utils/constants';
import { useAuth } from "@/context/AuthProvider";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FormEvent, useState } from "react";
import { cn } from '@/lib/utils';
import axios from "axios";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useAuth()
  const { toast } = useToast()

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
          toast({ title: 'Error', description: 'No se pudo conectar al servidor' })
          return
        }

        if (error.response.status === 400 || error.response.status === 401) {
          toast({ title: error.response.data.message, description: error.response.data.description })
          return
        }

      })
  }

  return (
    <section className='w-screen h-screen flex items-center justify-center'>
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
    </section>
  )
}
