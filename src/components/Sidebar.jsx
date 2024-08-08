import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../nav-items';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.to} className="mb-2">
              <Link
                to={item.to}
                className={cn(
                  "flex items-center p-2 rounded-lg hover:bg-gray-700",
                  location.pathname === item.to && "bg-gray-700"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
