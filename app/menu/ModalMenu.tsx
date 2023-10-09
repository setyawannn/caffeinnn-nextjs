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

const Jenis = [
  {
    label: 'Makanan',
    value: 'makanan'
  },
  {
    label: 'Minuman',
    value: 'minuman'
  }
]

const ModalMenu = () => {
  const [namaMenu, setNamaMenu] = useState('')
  const [jenis, setJenis] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [harga, setHarga] = useState<Number>(0)
  const [gambar, setGambar] = useState<File | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const queryAction = useSearchParams().get('action')
  const queryID = useSearchParams().get('id')
  const queryName = useSearchParams().get('name')
  const token = getCookie('jwtToken')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setGambar(event.target.files[0])
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/menu/${queryID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 204) {
            toast.success('Sukses Delete Menu')
          }
        })
        .finally(() => {
          window.location.reload()
        })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const newHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData()
    formData.append('nama_menu', namaMenu)
    formData.append('jenis', jenis)
    formData.append('deskripsi', deskripsi)
    formData.append('harga', String(harga))
    formData.append('gambar', gambar as Blob)

    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/menu`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 201) {
            toast.success('Sukses Tambah Menu')
          }
        })
        .finally(() => {
          window.location.reload()
        })
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  const showModalType = (action: any, onClose: () => void) => {
    switch (action) {
      case 'add':
        return (
          <form onSubmit={newHandleSubmit}>
            <ModalHeader className='flex flex-col gap-1'>
              {queryAction === 'add' ? 'Create Menu' : 'Edit Menu'}
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Nama Menu'
                name='nama_menu'
                variant='bordered'
                onChange={e => setNamaMenu(e.target.value)}
                value={namaMenu}
              />
              <Select
                fullWidth
                label='Jenis'
                name='jenis'
                variant='bordered'
                onChange={e => setJenis(e.target.value)}
                value={jenis}
                selectedKeys={[jenis]}
              >
                {Jenis.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label='Harga'
                type='number'
                name='deskripsi'
                variant='bordered'
                onChange={e => setHarga(Number(e.target.value))}
                required
              />
              <Input
                label='Deskripsi'
                type='text'
                name='deskripsi'
                variant='bordered'
                onChange={e => setDeskripsi(e.target.value)}
                required
              />
              <input type='file' onChange={handleFileChange} />
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
        )

      case 'edit':
        return <div>Ini Halaman Edit</div>

      case 'delete':
        return (
          <div>
            <ModalHeader className='flex flex-col gap-1'>
              Delete Menu
            </ModalHeader>
            <ModalBody>
              <div>
                <p>
                  Apakah anda yakin akan menghapus menu{' '}
                  <strong>{queryName}</strong>
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={isLoading}
                color='primary'
                type='submit'
              >
                Delete
              </Button>
            </ModalFooter>
          </div>
        )
    }
  }

  return (
    <ModalContent>
      {onClose => showModalType(queryAction, onClose)}
    </ModalContent>
  )
}

export default ModalMenu
