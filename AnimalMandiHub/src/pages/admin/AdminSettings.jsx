import { useState } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

const SETTINGS_KEY = 'animalmandihub_settings';

const defaults = {
  siteName: 'AnimalMandiHub',
  tagline: "Pakistan's Largest Online Livestock Marketplace",
  phone: '03000000000',
  email: 'hello@animalmandihub.com',
  address: '',
  freeListings: 5,
  starAdPrice: 499,
  paidAdPrice: 299,
  bannerAdPrice: 1999,
  deliveryEnabled: true,
  codEnabled: true,
  maintenanceMode: false,
};

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (stored) return { ...defaults, ...stored };
  } catch {}
  return defaults;
}

export default function AdminSettings() {
  const toast = useToast();
  const [settings, setSettings] = useState(() => loadSettings());

  const update = (field, value) => setSettings({ ...settings, [field]: value });

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    toast.success('Settings saved successfully');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
        <Button icon={Save} onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-6">
          <h2 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Site Name</label>
              <input type="text" value={settings.siteName} onChange={(e) => update('siteName', e.target.value)} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Tagline</label>
              <input type="text" value={settings.tagline} onChange={(e) => update('tagline', e.target.value)} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => update('phone', e.target.value)} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Email</label>
              <input type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-dark mb-1">Address</label>
              <input type="text" value={settings.address} onChange={(e) => update('address', e.target.value)} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-6">
          <h2 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Pricing Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Free Listings Limit</label>
              <input type="number" value={settings.freeListings} onChange={(e) => update('freeListings', parseInt(e.target.value))} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Star Ad Price (Rs.)</label>
              <input type="number" value={settings.starAdPrice} onChange={(e) => update('starAdPrice', parseInt(e.target.value))} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-dark mb-1">Paid Ad Price (Rs.)</label>
              <input type="number" value={settings.paidAdPrice} onChange={(e) => update('paidAdPrice', parseInt(e.target.value))} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-6">
          <h2 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Feature Toggles</h2>
          <div className="space-y-4">
            {[
              { field: 'deliveryEnabled', label: 'Enable Delivery Service' },
              { field: 'codEnabled', label: 'Enable Cash on Delivery' },
              { field: 'maintenanceMode', label: 'Maintenance Mode' },
            ].map(({ field, label }) => (
              <label key={field} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-stone-dark">{label}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings[field]}
                    onChange={(e) => update(field, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-dark peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
