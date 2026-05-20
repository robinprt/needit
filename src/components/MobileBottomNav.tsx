import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Shirt, LayoutDashboard, Wallet } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Dressing', path: '/dressing', icon: Shirt },
    { name: 'Tester', path: '/tester', icon: PlusCircle, isMain: true },
    { name: 'Stats', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cashback', path: '/cashback', icon: Wallet },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E6DE] pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.isMain) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-center -mt-8 bg-[#0F3D2E] text-white rounded-full p-4 shadow-lg active:scale-95 transition-transform"
              >
                <Icon size={24} />
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[#0F3D2E]' : 'text-[#6B6B6B]'
              }`}
            >
              <Icon size={20} className={isActive ? 'stroke-2' : 'stroke-[1.5]'} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
