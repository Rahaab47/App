import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import AnimalCard from '../components/AnimalCard';
import Badge from '../components/ui/Badge';

export default function BirdsPage() {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const birdPosts = posts.filter((p) => p.category === 'Birds' && p.status === 'approved');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return birdPosts;
    const term = searchTerm.toLowerCase();
    return birdPosts.filter(
      (p) => p.name.toLowerCase().includes(term) || p.breed.toLowerCase().includes(term)
    );
  }, [birdPosts, searchTerm]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-dark via-stone-dark to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-5xl mb-4">🦜</div>
          <Badge variant="accent" size="md" className="mb-3">
            Birds Collection
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Premium Birds for Sale
          </h1>
          <p className="text-white/60 max-w-lg mx-auto mb-6">
            Discover rare and exotic bird breeds from verified sellers.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-light" />
            <input
              type="text"
              placeholder="Search birds by name or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-white/95 text-sm text-primary-dark rounded-lg border-0 placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-elevated"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6 text-sm text-stone-light">
          <span className="font-bold text-primary-dark">{filteredPosts.length}</span> birds found
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <AnimalCard key={post.id} animal={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-dark/5">
            <div className="text-6xl mb-4">🦜</div>
            <h3 className="text-xl font-bold font-display text-primary-dark mb-2">No Birds Found</h3>
            <p className="text-stone-light">
              {searchTerm ? 'Try a different search term' : 'No bird listings available yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
