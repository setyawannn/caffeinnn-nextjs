export interface ITransaksi {
  id: number;
  resi: string;
  nama_pelanggan: string;
  nama_kasir: string;
  status: string;
  tgl_transaksi: string;
  nomor_meja: number;
  total_harga: number;
}
