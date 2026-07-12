import { Link } from 'react-router-dom';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';
import { usePosts } from '../../context/PostContext';

export default function AdminDashboard() {
  const { posts } = usePosts();

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Posts', value: posts.filter((p) => p.status === 'active' || p.status === 'approved').length, icon: Eye, color: 'bg-primary-50 text-primary' },
    { label: 'Pending', value: posts.filter((p) => p.status === 'pending').length, icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
    { label: 'Rejected', value: posts.filter((p) => p.status === 'rejected').length, icon: Users, color: 'bg-red-50 text-red-600' },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-stone-dark mb-5" style={{ fontFamily: 'var(--font-display)' }}>Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-card border border-stone-dark/5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xl font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                  <div className="text-xs text-stone">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-dark/8 flex items-center justify-between">
          <h2 className="font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>Recent Posts</h2>
          <Link to="/admin/posts" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-warm text-left">
              <tr>
                <th className="px-5 py-3 font-semibold text-stone">Title</th>
                <th className="px-5 py-3 font-semibold text-stone">Category</th>
                <th className="px-5 py-3 font-semibold text-stone">Price</th>
                <th className="px-5 py-3 font-semibold text-stone">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-dark/5">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-warm transition-colors">
                  <td className="px-5 py-3 font-medium text-stone-dark max-w-[200px] truncate">{post.name}</td>
                  <td className="px-5 py-3 text-stone capitalize">{post.category}</td>
                  <td className="px-5 py-3 text-primary font-semibold">Rs. {post.price?.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'approved' ? 'bg-primary-50 text-primary' :
                      post.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
