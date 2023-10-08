'use client'
import { HeartFilledIcon } from '@/components/icons'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@nextui-org/react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    api
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        username: formData.username,
        password: formData.password
      })
      .then(res => {
        const token = res.data.data.token
        const role = res.data.data.user.role

        if (token && role) {
          setCookie('jwtToken', token, { maxAge: 2.5 * 60 * 60 * 1000 })
          setCookie('role', role)
          role === 'KASIR'
            ? router.push('/?category=Makanan')
            : router.push('/')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <section className='mx-auto flex h-screen w-full max-w-sm items-center'>
      <div className='flex w-full flex-col items-center justify-center gap-y-6'>
        <div className='flex flex-col items-center gap-y-2 text-center text-zinc-800'>
          <h2 className='flex text-4xl font-bold'>
            Login
            <HeartFilledIcon className='text-danger' />
          </h2>
          <h2 className='text-base font-normal '>
            Insert your username and password corectly!
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex w-full flex-col gap-y-4'>
            <Input
              color='danger'
              type='text'
              label='Username'
              variant='bordered'
              size='md'
              fullWidth
              radius='md'
              name='username'
              onChange={handleChange}
            />
            <Input
              color='danger'
              type='password'
              label='Password'
              variant='bordered'
              size='md'
              fullWidth
              radius='md'
              name='password'
              onChange={handleChange}
            />
          </div>
          <Button
            color='danger'
            size='lg'
            radius='md'
            fullWidth
            className='mt-8'
            isLoading={isLoading}
            type='submit'
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Login
