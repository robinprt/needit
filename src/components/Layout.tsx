import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans">
      <Header />
      <main className="flex-1 pb-20 md:pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}
