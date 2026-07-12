import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

const CATEGORIES_KEY = 'animalmandihub_categories';

const defaultCategories = [
  { id: 'cow', name: 'Cows', icon: '🐄', count: 2340 },
  { id: 'buffalo', name: 'Buffaloes', icon: '🐃', count: 1856 },
  { id: 'goat', name: 'Goats', icon: '🐐', count: 3120 },
  { id: 'sheep', name: 'Sheep', icon: '🐑', count: 1540 },
  { id: 'camel', name: 'Camels', icon: '🐪', count: 420 },
  { id: 'bull', name: 'Bulls', icon: '🐂', count: 890 },
  { id: 'bird', name: 'Birds', icon: '🐦', count: 2100 },
  { id: 'pet', name: 'Pets', icon: '🐕', count: 1650 },
];

function loadCategories() {
  try {
    const stored = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
    if (stored && stored.length > 0) return stored;
  } catch {}
  return defaultCategories;
}

function saveCategories(cats) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
}

export default function AdminCategories() {
  const toast = useToast();
  const [categories, setCategories] = useState(() => loadCategories());
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', icon: '' });

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const saveEdit = () => {
    setCategories((prev) => prev.map((c) => c.id === editing.id ? editing : c));
    setEditing(null);
    toast.success('Category updated');
  };

  const addCategory = () => {
    if (!newCat.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    const id = newCat.name.toLowerCase().replace(/\s+/g, '-');
    setCategories((prev) => [...prev, { id, name: newCat.name, icon: newCat.icon || '🏷️', count: 0 }]);
    setNewCat({ name: '', icon: '' });
    setShowAdd(false);
    toast.success('Category added');
  };

  const deleteCategory = (id) => {
    if (!confirm('Delete this category?')) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category deleted');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>Manage Categories</h1>
        <Button icon={Plus} onClick={() => setShowAdd(true)}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl p-5 shadow-card border border-stone-dark/5 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>{cat.name}</h3>
                  <span className="text-xs text-stone-light">{cat.count} listings</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon-sm" variant="ghost" icon={Edit2} onClick={() => setEditing({ ...cat })} />
                <Button size="icon-sm" variant="ghost-danger" icon={Trash2} onClick={() => deleteCategory(cat.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Add Category</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Icon (emoji)</label>
                <input type="text" value={newCat.icon} onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })} placeholder="e.g., 🐔" className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Name</label>
                <input type="text" value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} placeholder="e.g., Poultry" className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button onClick={addCategory}>Add</Button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Edit Category</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Icon</label>
                <input type="text" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-dark mb-1">Name</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={saveEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
