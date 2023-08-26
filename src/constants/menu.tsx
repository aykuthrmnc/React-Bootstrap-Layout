import {
  FaBookOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaCube,
  FaCubes,
  FaHotdog,
  FaPrint,
  FaRegChartBar,
  FaUserCog,
  FaUsers,
  FaUserTie,
  FaUtensils,
  FaUtensilSpoon,
} from "react-icons/fa";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaTable } from "react-icons/fa6";

export type MenuItemTypes = {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: any;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
};

export const HESAPMEN_MENU: MenuItemTypes[] = [
  {
    key: "anasayfa",
    label: "Anasayfa",
    isTitle: false,
    icon: <BsHouseDoorFill className="nav-icon icon-xs me-2" />,
    url: "/",
  },
  {
    key: "table",
    label: "Tablo",
    isTitle: false,
    icon: <FaTable className="nav-icon icon-xs me-2" />,
    url: "/table",
  },
  {
    key: "cariler",
    label: "Cariler",
    isTitle: true,
  },
  {
    key: "cari",
    label: "Cari",
    isTitle: false,
    icon: <FaUsers className="nav-icon icon-xs me-2" />,
    children: [
      {
        key: "cariYonetim",
        label: "Cari Yönetimi",
        isTitle: false,
        url: "/hesapmen/cari/list",
        parentKey: "cari",
      },
      {
        key: "cariIslemler",
        label: "Cari İşlemleri",
        isTitle: false,
        parentKey: "cari",
        children: [
          {
            key: "gelenHavale",
            label: "Gelen Havale Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/61",
            parentKey: "cariIslemler",
          },
          {
            key: "gonderilenHavale",
            label: "Gönderilen Havale Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/60",
            parentKey: "cariIslemler",
          },
          {
            key: "tahsilat",
            label: "Tahsilat Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/59",
            parentKey: "cariIslemler",
          },
          {
            key: "tediye",
            label: "Tediye Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/58",
            parentKey: "cariIslemler",
          },
          {
            key: "kasaTahsilFisi",
            label: "Kasa Tahsil Fişi Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/66",
            parentKey: "cariIslemler",
          },
          {
            key: "kasaTediyeFisi",
            label: "Kasa Tediye Fişi Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/65",
            parentKey: "cariIslemler",
          },
          {
            key: "kkTahsilFisi",
            label: "KK Tahsil Fişi Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/68",
            parentKey: "cariIslemler",
          },
          {
            key: "kkTediyeFisi",
            label: "KK Tediye Fişi Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/67",
            parentKey: "cariIslemler",
          },
          {
            key: "alacakDekontu",
            label: "Alacak Dekontu Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/64",
            parentKey: "cariIslemler",
          },
          {
            key: "borcDekontu",
            label: "Borç Dekontu Oluştur",
            isTitle: false,
            url: "/hesapmen/cari-islemleri/63",
            parentKey: "cariIslemler",
          },
          {
            key: "devirBorc",
            label: "Devir Borcu Oluştur",
            isTitle: false,
            url: "/hesapmen/devir-islemleri/56",
            parentKey: "cariIslemler",
          },
          {
            key: "devirAlacak",
            label: "Devir Alacak Oluştur",
            isTitle: false,
            url: "/hesapmen/devir-islemleri/57",
            parentKey: "cariIslemler",
          },
        ],
      },
      {
        key: "cariHareket",
        label: "Cari Hareket",
        isTitle: false,
        url: "/hesapmen/cari-hareket",
        parentKey: "cari",
      },
      {
        key: "cariEkstre",
        label: "Cari Ekstre",
        isTitle: false,
        url: "/hesapmen/cari-ekstre",
        parentKey: "cari",
      },
      {
        key: "cariBakiye",
        label: "Cari Bakiye",
        isTitle: false,
        url: "/hesapmen/cari-bakiye?cardType=3",
        parentKey: "cari",
      },
    ],
  },
  {
    key: "stoklar",
    label: "Stoklar",
    isTitle: true,
  },
  {
    key: "stok",
    label: "Stok",
    isTitle: false,
    children: [
      {
        key: "stokYonetimi",
        label: "Stok Yönetimi",
        isTitle: false,
        url: "/hesapmen/stock",
        parentKey: "stok",
      },
      {
        key: "envanterDurumu",
        label: "Envanter Durumu",
        isTitle: false,
        url: "/hesapmen/inventories",
        parentKey: "stok",
      },
      {
        key: "stokFisi",
        label: "Stok Fişi Oluştur",
        isTitle: false,
        parentKey: "stok",
        children: [
          {
            key: "stokFisiGiris",
            label: "Giriş",
            isTitle: false,
            url: "/hesapmen/add-stock-receipt/53",
            parentKey: "stokFisi",
          },
          {
            key: "stokFisiCikis",
            label: "Çıkış",
            isTitle: false,
            url: "/hesapmen/add-stock-receipt/54",
            parentKey: "stokFisi",
          },
          {
            key: "stokFisiTransfer",
            label: "Transfer",
            isTitle: false,
            url: "/hesapmen/add-stock-receipt/55",
            parentKey: "stokFisi",
          },
        ],
      },
      {
        key: "stokKategori",
        label: "Stok Kategori",
        isTitle: false,
        url: "/hesapmen/stock-categories",
        parentKey: "stok",
      },
      {
        key: "stokHareket",
        label: "Stok Hareket",
        isTitle: false,
        url: "/hesapmen/stock-movement",
        parentKey: "stok",
      },
      {
        key: "stokEkstre",
        label: "Stok Ekstre",
        isTitle: false,
        url: "/hesapmen/stock-extract",
        parentKey: "stok",
      },
    ],
  },
  {
    key: "teklif",
    label: "Teklif",
    isTitle: false,
    children: [
      { key: "teklifler", label: "Teklifler", isTitle: false, url: "/hesapmen/offers", parentKey: "teklif" },
      {
        key: "teklifAlis",
        label: "Alış Teklifi Oluştur",
        isTitle: false,
        url: "/hesapmen/create-offer/74",
        parentKey: "teklif",
      },
      {
        key: "teklifSatis",
        label: "Satış Teklifi Oluştur",
        isTitle: false,
        url: "/hesapmen/create-offer/73",
        parentKey: "teklif",
      },
    ],
  },
  {
    key: "siparis",
    label: "Siparişler",
    isTitle: false,
    children: [
      {
        key: "siparisler",
        label: "Siparişler",
        isTitle: false,
        url: "/hesapmen/orders",
        parentKey: "siparis",
      },
      {
        key: "siparisAlis",
        label: "Alış Siparişi Oluştur",
        isTitle: false,
        url: "/hesapmen/create-order/76",
        parentKey: "siparis",
      },
      {
        key: "siparisSatis",
        label: "Satış Siparişi Oluştur",
        isTitle: false,
        url: "/hesapmen/create-order/75",
        parentKey: "siparis",
      },
    ],
  },
  {
    key: "irsaliye",
    label: "İrsaliye",
    isTitle: false,
    children: [
      {
        key: "irsaliyeAlis",
        label: "Alış",
        isTitle: false,
        parentKey: "irsaliye",
        children: [
          {
            key: "irsaliyeAlisElle",
            label: "Elle",
            url: "/hesapmen/create-bill/16",
            parentKey: "irsaliyeAlis",
          },
          {
            key: "irsaliyeAlisSiparisten",
            label: "Siparişten",
            url: "/hesapmen/create-bill/17",
            parentKey: "irsaliyeAlis",
          },
        ],
      },
      {
        key: "irsaliyeSatis",
        label: "Satış",
        isTitle: false,
        parentKey: "irsaliye",
        children: [
          {
            key: "irsaliyeSatisElle",
            label: "Elle",
            url: "/hesapmen/create-bill/13",
            parentKey: "irsaliyeSatis",
          },
          {
            key: "irsaliyeSatisSiparisten",
            label: "Siparişten",
            url: "/hesapmen/create-bill/14",
            parentKey: "irsaliyeSatis",
          },
        ],
      },
    ],
  },
  {
    key: "fatura",
    label: "Fatura",
    isTitle: false,

    children: [
      {
        key: "faturalar",
        label: "Faturalar",
        url: "/hesapmen/bills",
        parentKey: "fatura",
      },
      {
        key: "faturaAlis",
        label: "Alış Faturası Oluştur",
        parentKey: "fatura",
        children: [
          {
            key: "faturaAlisElle",
            label: "Elle",
            url: "/hesapmen/create-bill/5",
            parentKey: "faturaAlis",
          },
          {
            key: "faturaAlisSiparisten",
            label: "Siparişten",
            url: "/hesapmen/create-bill/6",
            parentKey: "faturaAlis",
          },
        ],
      },
      {
        key: "faturaSatis",
        label: "Satış Faturası Oluştur",
        parentKey: "fatura",
        children: [
          {
            key: "faturaSatisElle",
            label: "Elle",
            url: "/hesapmen/create-bill/1",
            parentKey: "faturaSatis",
          },
          {
            key: "faturaSatisSiparisten",
            label: "Siparişten",
            url: "/hesapmen/create-bill/2",
            parentKey: "faturaSatis",
          },
        ],
      },
      {
        key: "faturaAlimdanIade",
        label: "Alımdan İade Faturası Oluştur",
        parentKey: "fatura",
        children: [
          {
            key: "faturaAlimdanIadeElle",
            label: "Elle",
            url: "/hesapmen/create-bill/11",
            parentKey: "faturaAlimdanIade",
          },
          {
            key: "faturaAlimdanIadeSiparisten",
            label: "Siparişten",
            url: "/hesapmen/create-bill/12",
            parentKey: "faturaAlimdanIade",
          },
        ],
      },
      {
        key: "faturaSatistanIade",
        label: "Satıştan İade Faturası Oluştur",
        parentKey: "fatura",
        children: [
          {
            key: "elleSatistanIade",
            label: "Elle",
            url: "/hesapmen/create-bill/9",
            parentKey: "faturaSatistanIade",
          },
          {
            key: "siparistenSatistanIade",
            label: "Siparişten",
            url: "/hesapmen/create-bill/10",
            parentKey: "faturaSatistanIade",
          },
        ],
      },
      {
        key: "giderFaturasi",
        label: "Gider Faturası Oluştur",
        isTitle: false,
        url: "/hesapmen/expense-bill/90",
        parentKey: "fatura",
      },
    ],
  },
  {
    key: "cekSenet",
    label: "Çek - Senet",
    isTitle: false,

    children: [
      {
        key: "cekSenetler",
        label: "Çek-Senet Listesi",
        isTitle: false,
        url: "/hesapmen/check-and-bill",
        parentKey: "cekSenet",
      },
      {
        key: "cekGiris",
        label: "Çek Giriş",
        isTitle: false,
        url: "/hesapmen/create-check/1",
        parentKey: "cekSenet",
      },
      {
        key: "cekCikis",
        label: "Çek Çıkış",
        isTitle: false,
        url: "/hesapmen/create-check/2",
        parentKey: "cekSenet",
      },
    ],
  },
  {
    key: "firma",
    label: "Firma Ayarları",
    isTitle: false,
    url: "/hesapmen/settings",
    // children: [
    //     {
    //         key: 'sube',
    //         label: 'Şube',
    //         isTitle: false,
    //         url: '/hesapmen/branch',
    //         parentKey: 'firma',
    //     },
    //     {
    //         key: 'depo',
    //         label: 'Depo',
    //         isTitle: false,
    //         url: '/hesapmen/store',
    //         parentKey: 'firma',
    //     },
    //     {
    //         key: 'personel',
    //         label: 'Personel',
    //         isTitle: false,
    //         url: '/hesapmen/staff',
    //         parentKey: 'firma',
    //     },
    // ],
  },
];
