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
import React, { useState } from 'react'

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
    password: '',
    nama: '',
    role: ''
  })

  const handleSubmit = () => {}

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <ModalContent>
      {onClose => (
        <>
          <ModalHeader className='flex flex-col gap-1'>Create User</ModalHeader>
          <form onSubmit={handleSubmit}>
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
                value={formData.password}
              />
              <Input
                label='Nama'
                type='password'
                name='nama'
                variant='bordered'
                onChange={handleChange}
                value={formData.nama}
              />
              <Select
                fullWidth
                label='Select Role'
                name='role'
                variant='bordered'
                onChange={handleChange}
                value={formData.role}
                defaultSelectedKeys={['ADMIN']}
              >
                {role.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
          </form>
          <ModalFooter>
            <Button color='danger' variant='flat' onPress={onClose}>
              Close
            </Button>
            <Button color='primary' onPress={onClose}>
              Sign in
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  )
}

export default ModalUser
