import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Tag, Settings, LogOut, Menu, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/posts', icon: FileText, label: 'Posts' },
  { to: '/admin/categories', icon: Tag, label: 'Categories' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h2 className="text-2xl font-bold text-stone-dark mb-2" style={{ fontFamily: 'var(--font-display)' }}>Access Denied</h2>
          <p className="text-stone mb-5">You need admin privileges to access this page.</p>
          <p className="text-sm text-stone-light mb-4">Login with: <strong>admin@animalmandihub.com</strong> / <strong>admin123</strong></p>
          <Link to="/auth" className="inline-flex">
            <Button>Login as Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`w-64 shrink-0 ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50 bg-white shadow-xl p-4 pt-20' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-4 sticky top-28">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-dark/8">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user?.name?.[0] || 'A'}</span>
              </div>
              <div>
                <div className="font-semibold text-sm text-stone-dark">{user?.name}</div>
                <div className="text-xs text-primary font-medium">Admin</div>
              </div>
            </div>

            <nav className="space-y-0.5">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to, link.exact);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary'
                        : 'text-stone hover:bg-surface-warm hover:text-stone-dark'
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 pt-4 border-t border-stone-dark/8">
              <Button variant="ghost-danger" icon={LogOut} onClick={handleLogout} className="w-full justify-start">
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4 lg:hidden">
            <Button size="icon-md" variant="outline" icon={Menu} onClick={() => setSidebarOpen(true)} />
            <div className="flex items-center gap-2 text-sm text-stone">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} className="text-stone-light" />
              <span className="text-stone-dark font-medium">Admin</span>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
