import Link from 'next/link';
import { MusicIcon } from '../ui/Icons';

interface AppHeaderProps {
  user?: any;
  onSignOut?: () => void;
  showDashboardLink?: boolean;
}

export function AppHeader({ user, onSignOut, showDashboardLink = false }: AppHeaderProps) {
  return (
    <header className="bg-amber-700 text-white shadow-md">
      <div className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MusicIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold">音乐助手</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && <span className="font-medium">{user.name || user.email}</span>}
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="px-4 py-2 bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition font-medium"
            >
              退出
            </button>
          )}
          {showDashboardLink && (
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition font-medium"
            >
              主页
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
