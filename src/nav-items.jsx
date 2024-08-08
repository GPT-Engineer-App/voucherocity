import { Home, CreditCard, BarChart, Settings as SettingsIcon, HelpCircle } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Vouchers from "./pages/Vouchers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Vouchers",
    to: "/vouchers",
    icon: <CreditCard className="h-4 w-4" />,
    page: <Vouchers />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart className="h-4 w-4" />,
    page: <Analytics />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
  },
  {
    title: "Support",
    to: "/support",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <Support />,
  },
];
