import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAppStore } from '../store/useAppStore';

export default function Header() {
  const location = useLocation();
  const { stats } = useAppStore();

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Tester', path: '/tester' },
    { name: 'Dressing', path: '/dressing' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Cashback', path: '/cashback' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="NeedIt Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight text-[#1F1F1F]">
              Need<span className="text-[#0F3D2E]">It</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-[#0F3D2E]'
                    : 'text-[#6B6B6B] hover:text-[#0F3D2E]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#F7F5EF] px-3 py-1.5 rounded-full">
              <Leaf size={16} className="text-[#8FAF8D]" />
              <span className="text-sm font-semibold text-[#0F3D2E]">
                {stats.greenCashback.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
