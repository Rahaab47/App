import { useState, useMemo } from 'react';
import { Search, Trash2, Star, Eye, EyeOff, Edit2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/PostContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export default function AdminPosts() {
  const { posts, updatePost, deletePost } = usePosts();
  const toast = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (filterCategory) result = result.filter((p) => p.category === filterCategory);
    if (filterStatus) result = result.filter((p) => p.status === filterStatus);
    return result;
  }, [posts, search, filterCategory, filterStatus]);

  const toggleStar = (id) => {
    const post = posts.find((p) => p.id === id);
    updatePost(id, { isStarAd: !post.isStarAd });
    toast.success(post.isStarAd ? 'Star Ad removed' : 'Star Ad activated');
  };

  const toggleStatus = (id) => {
    const post = posts.find((p) => p.id === id);
    updatePost(id, { status: post.status === 'approved' ? 'inactive' : 'approved' });
    toast.success('Post status updated');
  };

  const handleApprove = (id) => {
    updatePost(id, { status: 'approved' });
    toast.success('Post approved');
  };

  const handleReject = (id) => {
    updatePost(id, { status: 'rejected' });
    toast.success('Post rejected');
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    deletePost(id);
    toast.success('Post deleted');
  };

  const saveEdit = () => {
    updatePost(editingPost.id, editingPost);
    setEditingPost(null);
    toast.success('Post updated');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-stone-dark" style={{ fontFamily: 'var(--font-display)' }}>Manage Posts</h1>
        <span className="text-sm text-stone">{posts.length} total posts</span>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 overflow-hidden">
        <div className="p-4 border-b border-stone-dark/8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-light" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-stone-dark/12 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors">
            <option value="">All Categories</option>
            <option value="Cows">Cows</option>
            <option value="Buffaloes">Buffaloes</option>
            <option value="Goats">Goats</option>
            <option value="Sheep">Sheep</option>
            <option value="Camels">Camels</option>
            <option value="Birds">Birds</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors">
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-warm text-left">
              <tr>
                <th className="px-5 py-3 font-semibold text-stone">Post</th>
                <th className="px-5 py-3 font-semibold text-stone">Category</th>
                <th className="px-5 py-3 font-semibold text-stone">Price</th>
                <th className="px-5 py-3 font-semibold text-stone">Status</th>
                <th className="px-5 py-3 font-semibold text-stone">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-dark/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-stone">No posts found</td>
                </tr>
              ) : filtered.map((post) => (
                <tr key={post.id} className="hover:bg-surface-warm transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
                      <div>
                        <div className="font-medium text-stone-dark max-w-[200px] truncate">{post.name}</div>
                        <div className="text-xs text-stone-light">{post.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize text-stone">{post.category}</td>
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
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      {post.status === 'pending' && (
                        <>
                          <Button size="icon-sm" variant="ghost" icon={Eye} onClick={() => handleApprove(post.id)} title="Approve" className="text-emerald-600" />
                          <Button size="icon-sm" variant="ghost" icon={EyeOff} onClick={() => handleReject(post.id)} title="Reject" className="text-red-600" />
                        </>
                      )}
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        icon={ExternalLink}
                        onClick={() => navigate(`/animal/${post.id}`)}
                        title="View"
                        className="text-blue-600"
                      />
                      <Button size="icon-sm" variant="ghost" icon={Edit2} onClick={() => setEditingPost({ ...post })} title="Edit" />
                      <Button size="icon-sm" variant="ghost-danger" icon={Trash2} onClick={() => handleDelete(post.id)} title="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingPost && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditingPost(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-elevated max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-stone-dark mb-4" style={{ fontFamily: 'var(--font-display)' }}>Edit Post</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Name</label>
                <input type="text" value={editingPost.name} onChange={(e) => setEditingPost({ ...editingPost, name: e.target.value })} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-stone-dark mb-1">Price (Rs.)</label>
                  <input type="number" value={editingPost.price} onChange={(e) => setEditingPost({ ...editingPost, price: parseInt(e.target.value) || 0 })} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-dark mb-1">Location</label>
                  <input type="text" value={editingPost.location} onChange={(e) => setEditingPost({ ...editingPost, location: e.target.value })} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Description</label>
                <textarea value={editingPost.description} onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })} rows={3} className="w-full border border-stone-dark/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
              <Button onClick={saveEdit}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
