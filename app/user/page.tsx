'use client'
import Title from '@/components/reusable/Title'
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Input,
  useDisclosure
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { EditIcon } from './icons/EyeIcon'
import { DeleteIcon } from './icons/DeleteIcon'
import { IUser } from '@/types/user-types'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import ModalUser from './ModalUser'

const statusColorMap: Record<string, any> = {
  kasir: 'success',
  admin: 'danger',
  manager: 'warning'
}

const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'NAME', uid: 'name' },
  { name: 'USERNAME', uid: 'username' },
  { name: 'ROLE', uid: 'role' },
  { name: 'ACTIONS', uid: 'actions' }
]

const MenuPage = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const token = getCookie('jwtToken')

  useEffect(() => {
    try {
      setIsLoading(true)
      const getMenu = async () => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            setUsers(res.data.data)
          })
      }

      getMenu()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [token])

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'id':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>{user.id}</p>
          </div>
        )
      case 'name':
        return (
          <div>
            <h4>{user.name}</h4>
          </div>
        )
      case 'username':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{user.username}</p>
          </div>
        )
      case 'role':
        return (
          <div>
            <p>{user.role}</p>
          </div>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Edit user'>
              <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalUser />
      </Modal>

      <div>
        <Title bold='User' normal='List' />
        <div className='mt-6'>
          <div className='mb-4'>
            <Button
              onClick={onOpen}
              color='success'
              className='text-white'
              radius='sm'
            >
              Add User
            </Button>
          </div>
          <Table removeWrapper>
            <TableHeader columns={columns}>
              {column => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {item => (
                <TableRow key={item.id}>
                  {columnKey => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default MenuPage
