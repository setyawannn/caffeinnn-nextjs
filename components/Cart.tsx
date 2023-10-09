'use client'
import React, { useEffect, useState } from 'react'
import Title from './reusable/Title'
import Image from 'next/image'
import { Input, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const StatusBayar = [
  {
    label: 'Lunas',
    value: 'lunas'
  },
  {
    label: 'Belum Lunas',
    value: 'belum'
  }
]

const tableBro = [
  {
    nomor_meja: '1',
    id: '1'
  },
  {
    nomor_meja: '2',
    id: '2'
  },
  {
    nomor_meja: '3',
    id: '3'
  }
]

interface typeDetailTransaksi {
  jumlah: number
  menuId: number
  harga: number
}

const Cart = () => {
  const [table, setTable] = useState([])
  const [tablePick, setTablePick] = useState('')
  const [detailTransaksi, setDetailTransaksi] = useState<
    Array<typeDetailTransaksi>
  >([])
  const [formData, setFormData] = useState({
    tgl_transaksi: '',
    nama_pelanggan: '',
    userId: '',
    mejaId: 0,
    detailTransaksi: []
  })

  const filteredTable = table.filter((item: any) => item.status === 'kosong')

  const token = getCookie('jwtToken')

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen dimuat.
    const storeditems = localStorage.getItem('detailTransaksi')

    if (storeditems) {
      // Mengurai data JSON jika ada data yang tersimpan.
      setDetailTransaksi(JSON.parse(storeditems))
    }
  }, [])

  useEffect(() => {
    // Menyimpan items ke dalam localStorage setiap kali berubah.
    localStorage.setItem('detailTransaksi', JSON.stringify(detailTransaksi))
  }, [detailTransaksi])

  useEffect(() => {
    try {
      const getMeja = async () => {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/meja`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            setTable(res.data.data)
          })
      }
      getMeja()
    } catch (error) {
      console.log(error)
    }
  }, [token])

  const addToCart = (menuId: number, harga: number) => {
    // Mengecek apakah item dengan menuId yang sama sudah ada di keranjang.
    const existingItem = detailTransaksi.find(item => item.menuId === menuId)

    if (existingItem) {
      // Jika ada, maka tambahkan ke jumlah yang ada.
      const updatedItems = detailTransaksi.map(item =>
        item.menuId === menuId ? { ...item, jumlah: item.jumlah + 1 } : item
      )

      setDetailTransaksi(updatedItems)
    } else {
      // Jika tidak ada, tambahkan item baru ke dalam keranjang.
      setDetailTransaksi([
        ...detailTransaksi,
        { menuId, jumlah: 1, harga } // MenuId baru dengan jumlah 1.
      ])
    }
  }

  const removeFromCart = (menuId: number) => {
    const updatedItems = detailTransaksi.map(item =>
      item.menuId === menuId && item.jumlah > 0
        ? { ...item, jumlah: item.jumlah - 1 }
        : item
    )

    setDetailTransaksi(updatedItems.filter(item => item.jumlah > 0))
  }

  const addToCartPast = (menuId: number, harga: number) => {
    // Menyalin array cartItems saat ini.
    const newDetailTransaksi = [...detailTransaksi]

    const newData = {
      menuId: menuId,
      harga: harga,
      jumlah: 1
    }

    // Menambahkan objek baru ke dalam array.
    newDetailTransaksi.push(newData)

    // Mengatur state cartItems dengan array yang diperbarui.
    setDetailTransaksi(newDetailTransaksi)
  }

  console.log(detailTransaksi)

  return (
    table && (
      <div>
        <div>
          <button onClick={() => addToCart(2, 16000)}>Tambah</button>
          <button onClick={() => removeFromCart(2)}>Kurang</button>
          <button onClick={() => addToCartPast(3, 10000)}>yang lama</button>
        </div>

        <Title bold='Your' normal='Order' />
        <div className='mt-6'>
          <div className='flex flex-col gap-y-4'>
            <div className='flex gap-x-4 '>
              <Input variant='flat' label='Nama Pembeli' type='text' />
              <Input variant='flat' label='Nama Pembeli' type='text' />
            </div>
            <div className='flex gap-x-4'>
              <Select
                fullWidth
                label='Meja'
                name='jenis'
                variant='flat'
                description={`value meja adalah ${tablePick}`}
                onChange={e => setTablePick(e.target.value)}
              >
                {filteredTable.map((item: any) => (
                  <SelectItem key={item.id} value={item.nomor_meja}>
                    {item.id}
                  </SelectItem>
                ))}
              </Select>
              <Select
                fullWidth
                label='Status Bayar'
                name='status'
                variant='flat'
                description={`value meja adalah`}
              >
                {StatusBayar.map((item: any) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className='mt-8 flex items-center gap-4'>
            <div className='flex h-16 w-32 items-center justify-center rounded-xl bg-orange-100'>
              <Image
                src={
                  'https://ik.imagekit.io/setyawanlearn/ukk-cafe/menu/Coffee_Latte_1696742449432_VKCpwW991'
                }
                alt=''
                width={100}
                height={100}
                className='object-cover'
              />
            </div>
            <div className='w-2/5'>
              <h4 className='text-lg font-semibold'>Burger Cina</h4>
              <p className='text-base font-medium text-zinc-500'>10K</p>
            </div>
            <div className='w-1/5'>
              <p>3x</p>
            </div>
            <div className='w-1/5'>
              <h4 className='text-lg font-semibold'>30K</h4>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Cart
