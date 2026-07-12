import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, MapPin, Calendar, Phone, X, BadgeIndianRupee } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import AnimalCard from '../components/AnimalCard';
import { categories, cities } from '../data/animals';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function ListingsPage() {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const approvedPosts = posts.filter((p) => p.status === 'approved');

  const filteredPosts = useMemo(() => {
    let result = approvedPosts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.breed.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedCity) {
      result = result.filter((p) => p.location === selectedCity);
    }

    if (priceRange.min) {
      result = result.filter((p) => parseInt(p.price) >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter((p) => parseInt(p.price) <= parseInt(priceRange.max));
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case 'price-high':
        result = [...result].sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case 'oldest':
        result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [approvedPosts, searchTerm, selectedCategory, selectedCity, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedCity || priceRange.min || priceRange.max;

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-dark via-stone-dark to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Animal Listings
            </h1>
            <p className="text-white/60 mb-6">
              Find your perfect livestock from thousands of verified sellers across Pakistan.
            </p>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-light" />
                <input
                  type="text"
                  placeholder="Search by name, breed, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-white/95 text-sm text-primary-dark rounded-lg border-0 placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-elevated"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-surface-warm transition-colors"
                  >
                    <X className="w-4 h-4 text-stone-light" />
                  </button>
                )}
              </div>
              <Button
                variant="secondary"
                size="lg"
                icon={SlidersHorizontal}
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/95 border-0 shadow-elevated"
              >
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-primary-dark">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" icon={X} onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Min Price</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-dark mb-1">Max Price</label>
                <Input
                  type="number"
                  placeholder="999999"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-stone-light">
            <span className="font-bold text-primary-dark">{filteredPosts.length}</span> animals found
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex bg-white border border-stone-dark/12 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-50 text-primary' : 'text-stone-light hover:text-primary-dark'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary-50 text-primary' : 'text-stone-light hover:text-primary-dark'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        {filteredPosts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <AnimalCard key={post.id} animal={post} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <AnimalCard key={post.id} animal={post} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-dark/5">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold font-display text-primary-dark mb-2">No animals found</h3>
            <p className="text-stone-light mb-6">Try adjusting your search or filters</p>
            <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
