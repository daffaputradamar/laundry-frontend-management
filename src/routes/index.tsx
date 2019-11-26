import { Item } from "semantic-ui-react";
import Dasadmin from "../pages/Das_admin/index";
import Daskasir from "../pages/Das_kasir/index";
import Detail from "../pages/Detail";
import Diskon from "../pages/Diskon";
import Items from "../pages/Item";
import Itemins from "../pages/Itemin";
import Itemouts from "../pages/Itemout";
import Login from "../pages/Login";
import Member from "../pages/Member";
import Outcomes from "../pages/Outcome";
import Outcomeins from "../pages/Outcomein";
import Salary from "../pages/Salary";
import Service from "../pages/Service";

import Dreports from "../pages/Dreport";
import Mreports from "../pages/Mreport";
import App from "../pages/Struk";
import Transaction from "../pages/Transaction";
import TransactionNew from "../pages/Transaction_new";
import User from "../pages/User";

const routes: IRoute[] = [
  {
    component: Dasadmin,
    label: "Dasboard Admin",
    icon: "book",
    path: "/dashboard_admin",
    private: true,
    role: ["admin"]
  },
  {
    component: Daskasir,
    label: "Dasboard Kasir",
    icon: "book",
    path: "/dashboard_kasir",
    private: true,
    role: ["kasir"]
  },
  {
    component: Transaction,
    label: "Transaksi",
    icon: "clipboard list",
    path: "/",
    hide: true,
    private: true,
    role: ["admin", "kasir"]
  },
  {
    component: Transaction,
    label: "Transaksi",
    icon: "clipboard list",
    path: "/transaction",
    private: true,
    role: ["admin", "kasir"]
  },
  {
    component: Member,
    label: "Member",
    icon: "address book",
    path: "/member",
    private: true,
    role: ["admin", "kasir"]
  },
  {
    component: Diskon,
    label: "Diskon",
    icon: "percent",
    path: "/diskon",
    private: true,
    role: ["admin"]
  },
  {
    component: Service,
    label: "Layanan Laundry",
    icon: "pencil",
    path: "/service",
    private: true,
    role: ["admin"]
  },
  {
    component: User,
    label: "User",
    icon: "user",
    path: "/user",
    private: true,
    role: ["admin"]
  },
  {
    component: Items,
    label: "Barang",
    icon: "window restore outline",
    path: "/item",
    private: true,
    role: ["admin"]
  },
  {
    component: Itemins,
    label: "Barang Masuk",
    icon: "pencil",
    path: "/itemin",
    private: true,
    role: ["admin", "kasir"]
  },
  {
    component: Itemouts,
    label: "Barang Keluar",
    icon: "pencil",
    path: "/itemout",
    private: true,
    role: ["admin", "kasir"]
  },
  {
    component: Salary,
    label: "Gaji karyawan",
    icon: "money bill alternate",
    path: "/salary",
    private: true,
    role: ["admin"]
  },
  {
    component: TransactionNew,
    label: "Transaksi Baru",
    icon: "clipboard list",
    path: "/transaction/new",
    private: true,
    hide: true,
    role: ["admin", "kasir"]
  },
  {
    component: App,
    label: "Struk",
    icon: "clipboard list",
    path: "/transaction/struk",
    private: true,
    hide: true,
    role: ["admin", "kasir"]
  },

  {
    component: Detail,
    label: "Detail Transaksi",
    icon: "file text",
    path: "/transaction/detail",
    hide: true,
    private: true,
    role: ["admin", "kasir"]
  },

  {
    component: Outcomeins,
    label: "Jenis Pengeluaran",
    icon: "list layout",
    path: "/outcomein",
    private: true,
    role: ["admin", "kasir"]
  },

  {
    component: Outcomes,
    label: "Pengeluaran",
    icon: "money bill alternate outline",
    path: "/outcome",
    private: true,
    role: ["admin", "kasir"]
  },

  {
    component: Mreports,
    label: "Laporan",
    icon: "book",
    path: "/laporan",
    private: true,
    role: ["admin"]
  },

  {
    component: Dreports,
    label: "Laporan Harian",
    icon: "book",
    path: "/laporan_harian",
    private: true,
    role: ["admin"],
    hide: true
  },

  {
    component: Login,
    path: "/login",
    hide: true,
    role: ["admin", "kasir"]
  }
];

export default routes;
