import { Home, CreditCard, BarChart, Settings as SettingsIcon, HelpCircle, Users, FileText } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Vouchers from "./pages/Vouchers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import UsersManagement from "./pages/UsersManagement";
import BankPartnersManagement from "./pages/BankPartnersManagement";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Dashboard />,
    roles: ['user', 'admin'],
  },
  {
    title: "Vouchers",
    to: "/vouchers",
    icon: <CreditCard className="h-4 w-4" />,
    page: <Vouchers />,
    roles: ['user', 'admin'],
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart className="h-4 w-4" />,
    page: <Analytics />,
    roles: ['user', 'admin'],
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
    roles: ['user', 'admin'],
  },
  {
    title: "Support",
    to: "/support",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <Support />,
    roles: ['user', 'admin'],
  },
  {
    title: "Users Management",
    to: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    page: <UsersManagement />,
    roles: ['admin'],
  },
  {
    title: "Bank Partners",
    to: "/admin/bank-partners",
    icon: <FileText className="h-4 w-4" />,
    page: <BankPartnersManagement />,
    roles: ['admin'],
  },
];
