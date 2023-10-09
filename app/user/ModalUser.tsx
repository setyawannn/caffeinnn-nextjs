'use client'
import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

const role = [
  {
    label: 'Kasir',
    value: 'KASIR'
  },
  {
    label: 'Manager',
    value: 'MANAGER'
  },
  {
    label: 'Admin',
    value: 'ADMIN'
  }
]

const ModalUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: null,
    name: '',
    role: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const queryAction = useSearchParams().get('action')
  const queryID = useSearchParams().get('id')
  const token = getCookie('jwtToken')

  useEffect(() => {
    try {
      const getMenu = async () => {
        setIsLoading(true)

        queryAction === 'add'
          ? setFormData({
              username: '',
              password: null,
              name: '',
              role: ''
            })
          : await axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then(res => {
                const { data } = res.data

                const filteredData = data.filter(
                  (item: any) => item.id === Number(queryID)
                )
                setFormData({
                  username: filteredData[0]?.username,
                  password: filteredData[0]?.password,
                  name: filteredData[0]?.name,
                  role: filteredData[0]?.role
                })
              })
              .finally(() => {
                setIsLoading(false)
              })
      }

      getMenu()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [token, queryID, queryAction])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    queryAction === 'add'
      ? axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
            username: formData.username,
            password: formData.password,
            name: formData.name,
            role: formData.role
          })
          .then(res => {
            if (res.status === 201) {
              toast.success('Sukses tambah user')
            }
          })
          .finally(() => {})
      : axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${queryID}`,
            {
              username: formData.username,
              password: formData.password,
              name: formData.name,
              role: formData.role
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            if (res.status === 201) {
              toast.success('Sukses update user')
            }
          })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <ModalContent>
      {onClose => (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                {queryAction === 'add' ? 'Create User' : 'Edit User'}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label='Username'
                  name='username'
                  variant='bordered'
                  onChange={handleChange}
                  value={formData.username}
                />
                <Input
                  label='Password'
                  type='password'
                  name='password'
                  variant='bordered'
                  onChange={handleChange}
                  required
                />
                <Input
                  label='Name'
                  type='text'
                  name='name'
                  variant='bordered'
                  onChange={handleChange}
                  value={formData.name}
                />
                <Select
                  fullWidth
                  label='Select Role'
                  name='role'
                  variant='bordered'
                  onChange={handleChange}
                  value={formData.role}
                  selectedKeys={[formData.role]}
                >
                  {role.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={isLoading} color='primary' type='submit'>
                  {queryAction === 'add' ? 'Create' : 'Edit'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </>
      )}
    </ModalContent>
  )
}

export default ModalUser
