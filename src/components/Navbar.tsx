import { Bell, ShoppingCart, User } from "lucide-react";

interface NavbarProps {
  username?: string;
}

export default function Navbar({ username = "Peserta" }: NavbarProps) {
  return (
    <header className="bg-blue-700 text-white h-13 flex items-center justify-between px-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <button className="p-1.5 hover:bg-white/10 rounded transition-colors touch-manipulation">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="font-bold text-sm sm:text-base tracking-wide">Simulasi CPNS</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation">
          <Bell size={17} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">1</span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation hidden sm:flex">
          <ShoppingCart size={17} />
        </button>
        <div className="flex items-center gap-1.5 pl-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            <User size={14} />
          </div>
          <span className="text-xs font-medium hidden md:block">{username}</span>
        </div>
      </div>
    </header>
  );
}
