import { useState, useMemo } from 'react';
import { Search, Trash2, Shield, ShieldOff, Edit2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

const USERS_KEY = 'animalmandihub_users';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export default function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useState(() => getUsers());
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, search]);

  const toggleRole = (id) => {
    const updated = users.map((u) => u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u);
    setUsers(updated);
    saveUsers(updated);
    toast.success('User role updated');
  };

  const deleteUser = (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
    toast.success('User deleted');
  };

  const saveEdit = () => {
    const updated = users.map((u) => u.id === editingUser.id ? editingUser : u);
    setUsers(updated);
    saveUsers(updated);
    setEditingUser(null);
    toast.success('User updated');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>Manage Users</h1>
        <span className="text-sm text-stone">{users.length} total users</span>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 overflow-hidden">
        <div className="p-4 border-b border-stone-dark/8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-stone-dark/12 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-warm text-left">
              <tr>
                <th className="px-6 py-3 font-semibold text-stone">Name</th>
                <th className="px-6 py-3 font-semibold text-stone">Email</th>
                <th className="px-6 py-3 font-semibold text-stone">Phone</th>
                <th className="px-6 py-3 font-semibold text-stone">Role</th>
                <th className="px-6 py-3 font-semibold text-stone">Joined</th>
                <th className="px-6 py-3 font-semibold text-stone">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-dark/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone">No users found</td>
                </tr>
              ) : filtered.map((u) => (
                <tr key={u.id} className="hover:bg-surface-warm transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{u.name?.[0] || '?'}</span>
                      </div>
                      <span className="font-medium text-stone-dark">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-stone">{u.email}</td>
                  <td className="px-6 py-3 text-stone">{u.phone || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === 'admin' ? 'bg-primary-light text-primary-dark' : 'bg-surface-warm text-stone'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-stone text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        icon={u.role === 'admin' ? ShieldOff : Shield}
                        onClick={() => toggleRole(u.id)}
                        title={u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                        className={u.role === 'admin' ? 'text-accent-dark' : 'text-primary'}
                      />
                      <Button size="icon-sm" variant="ghost" icon={Edit2} onClick={() => setEditingUser({ ...u })} title="Edit user" className="text-blue-600" />
                      <Button size="icon-sm" variant="ghost-danger" icon={Trash2} onClick={() => deleteUser(u.id)} title="Delete user" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditingUser(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Edit User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Phone</label>
                <input
                  type="tel"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
              <Button onClick={saveEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
