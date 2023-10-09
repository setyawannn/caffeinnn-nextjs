'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
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
import Title from '@/components/reusable/Title'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { EditIcon } from '../user/icons/EyeIcon'
import { DeleteIcon } from '../user/icons/DeleteIcon'
import ModalMenu from './ModalMenu'
import { IMenu } from '@/types/menu-types'
import Image from 'next/image'

const columns = [
  { name: 'ID', uid: 'id' },
  { name: 'NAMA MENU', uid: 'nama_menu' },
  { name: 'JENIS', uid: 'jenis' },
  { name: 'HARGA', uid: 'harga' },
  { name: 'DESKRIPSI', uid: 'deskripsi' },
  { name: 'GAMBAR', uid: 'gambar' },
  { name: 'ACTIONS', uid: 'actions' }
]

const MenuPage = () => {
  const [menus, setMenus] = useState<IMenu[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const router = useRouter()

  const token = getCookie('jwtToken')
  const role = getCookie('role')

  if (role !== 'ADMIN') {
    redirect('/404')
  }

  useEffect(() => {
    try {
      setIsLoading(true)

      const getMenu = async () => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            setMenus(res.data.data)
          })
      }

      getMenu()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [token])

  const formatIDR = (amount: number): string => {
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const renderCell = React.useCallback(
    (menu: any, columnKey: any, id: number, name: string) => {
      const cellValue = menu[columnKey]

      switch (columnKey) {
        case 'id':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm'>{menu.id}</p>
            </div>
          )
        case 'nama_menu':
          return (
            <div>
              <h4>{menu.nama_menu}</h4>
            </div>
          )
        case 'jenis':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>{menu.jenis}</p>
            </div>
          )
        case 'harga':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm'>{formatIDR(menu.harga)}</p>
            </div>
          )
        case 'deskripsi':
          return (
            <div>
              <p>{menu.deskripsi}</p>
            </div>
          )
        case 'gambar':
          return (
            <div className=''>
              {menu.gambar ? (
                <Image src={menu.gambar} alt='' width={100} height={100} />
              ) : (
                <p>Gambar tidak ada</p>
              )}
            </div>
          )
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <Tooltip content='Edit user'>
                <Link
                  onClick={onOpen}
                  href={`menu?action=edit&id=${id}`}
                  className='cursor-pointer text-lg text-default-400 active:opacity-50'
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip color='danger' content='Delete user'>
                <Link
                  onClick={onOpen}
                  href={`menu?action=delete&id=${id}&name=${name}`}
                  className='cursor-pointer text-lg text-danger active:opacity-50'
                >
                  <DeleteIcon />
                </Link>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [onOpen]
  )

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalMenu />
      </Modal>

      <div>
        <Title bold='Menu' normal='List' />
        <div className='mt-6'>
          <div className='mb-4'>
            <Button
              onPress={onOpen}
              onClick={() => router.push(`menu?action=add`)}
              color='primary'
              className='text-white'
              radius='sm'
            >
              Add Menu
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
            <TableBody items={menus}>
              {item => (
                <TableRow key={item.id}>
                  {columnKey => (
                    <TableCell>
                      {renderCell(item, columnKey, item.id, item.nama_menu)}
                    </TableCell>
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
