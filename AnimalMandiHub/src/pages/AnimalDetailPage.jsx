import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Phone, User, BadgeIndianRupee, Shield, Clock, Heart, Share2, ArrowLeft, CheckCircle, Flag } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import { useParams } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function AnimalDetailPage() {
  const { id } = useParams();
  const { posts } = usePosts();
  const animal = posts.find((p) => p.id === id);

  if (!animal) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-card border border-stone-dark/5 p-12 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold font-display text-primary-dark mb-2">Animal Not Found</h2>
          <p className="text-stone-light mb-6">This listing may have been removed or doesn't exist.</p>
          <Link to="/listings">
            <Button variant="primary" icon={ArrowLeft}>Browse Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 animate-fade-in">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card overflow-hidden animate-fade-in-up">
              <div className="relative aspect-video">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {animal.badge && (
                    <Badge variant="primary" size="lg" dot>{animal.badge}</Badge>
                  )}
                  {animal.gender && (
                    <Badge variant={animal.gender === 'Male' ? 'info' : 'accent'} size="lg">
                      {animal.gender}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-stone hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-stone hover:text-primary transition-colors shadow-sm">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 sm:p-8 animate-fade-in-up stagger-2">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary-dark mb-2">
                    {animal.name}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-stone-light">
                    <MapPin className="w-4 h-4" />
                    <span>{animal.location}</span>
                    <span className="text-stone-dark/20">•</span>
                    <Clock className="w-4 h-4" />
                    <span>Listed {new Date(animal.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant="success" size="lg" dot>
                  {animal.status === 'approved' ? 'Available' : animal.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface-warm rounded-lg p-4 text-center">
                  <span className="block text-[10px] text-stone-light uppercase tracking-wider mb-1">Breed</span>
                  <span className="text-sm font-bold text-primary-dark">{animal.breed}</span>
                </div>
                <div className="bg-surface-warm rounded-lg p-4 text-center">
                  <span className="block text-[10px] text-stone-light uppercase tracking-wider mb-1">Age</span>
                  <span className="text-sm font-bold text-primary-dark">{animal.age}</span>
                </div>
                <div className="bg-surface-warm rounded-lg p-4 text-center">
                  <span className="block text-[10px] text-stone-light uppercase tracking-wider mb-1">Gender</span>
                  <span className="text-sm font-bold text-primary-dark">{animal.gender}</span>
                </div>
                <div className="bg-surface-warm rounded-lg p-4 text-center">
                  <span className="block text-[10px] text-stone-light uppercase tracking-wider mb-1">Category</span>
                  <span className="text-sm font-bold text-primary-dark">{animal.category}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold font-display text-primary-dark mb-3">Description</h3>
                <p className="text-stone leading-relaxed">
                  {animal.description || `Beautiful ${animal.breed} ${animal.category.toLowerCase()} available for sale. This ${animal.gender.toLowerCase()} ${animal.name} is ${animal.age} old and is located in ${animal.location}. Healthy and well-maintained, ready for a new home. Contact for more details and pricing.`}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-stone-dark/5">
                <Button variant="primary" size="lg" icon={Phone}>
                  Contact Seller
                </Button>
                <Button variant="secondary" size="lg" icon={Flag}>
                  Report
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 animate-fade-in-up stagger-3">
              <div className="text-center mb-6">
                <span className="block text-[10px] text-stone-light uppercase tracking-wider mb-2">Asking Price</span>
                <div className="flex items-center justify-center gap-2">
                  <BadgeIndianRupee className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold font-display text-primary-dark">{animal.price}</span>
                </div>
              </div>
              <Button variant="primary" size="xl" className="w-full" icon={Phone}>
                Call Seller
              </Button>
              <Button variant="outline" size="lg" className="w-full mt-3" icon={Share2}>
                Share Listing
              </Button>
            </div>

            {/* Seller Card */}
            <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 animate-fade-in-up stagger-4">
              <h3 className="text-lg font-bold font-display text-primary-dark mb-4">Seller Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary-dark">{animal.sellerName || 'Verified Seller'}</div>
                    <div className="flex items-center gap-1 text-xs text-stone-light">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 font-medium">Verified Member</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-stone-light" />
                    <span className="text-stone font-medium">{animal.sellerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin className="w-4 h-4 text-stone-light" />
                    <span className="text-stone font-medium">{animal.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 animate-fade-in-up stagger-5">
              <h3 className="text-lg font-bold font-display text-primary-dark mb-4">Safety Tips</h3>
              <ul className="space-y-2.5">
                {[
                  'Meet in a public place',
                  'Inspect the animal before paying',
                  'Use secure payment methods',
                  'Verify seller identity',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
