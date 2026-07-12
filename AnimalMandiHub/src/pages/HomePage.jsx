import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ArrowRight, Shield, Clock, Users, Heart, Star, Phone,
  MapPin, BadgeIndianRupee, TrendingUp, Award, CheckCircle, Bird, PawPrint
} from 'lucide-react';
import AnimalCard from '../components/AnimalCard';
import { usePosts } from '../context/PostContext';
import { categories, testimonials, cities } from '../data/animals';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function HomePage() {
  const { posts } = usePosts();
  const featuredPosts = posts.filter((p) => p.status === 'approved').slice(0, 6);

  const stats = [
    { label: 'Active Listings', value: '2,500+', icon: TrendingUp },
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Verified Sellers', value: '500+', icon: Award },
    { label: 'Cities Covered', value: '50+', icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-dark via-stone-dark to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, rgba(194,149,74,0.2) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white/70">
                  Pakistan's Trusted Livestock Marketplace
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                Find Your Perfect
                <span className="block text-primary mt-2">
                  Livestock Partner
                </span>
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-lg">
                Explore a world where sellers and buyers interact through technology… all breeds of pets, livestock and other animals, under one roof.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/listings">
                  <Button variant="primary" size="xl" icon={Search}>
                    Browse Animals
                  </Button>
                </Link>
                <Link to="/post-listing">
                  <Button
                    variant="outline"
                    size="xl"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Post Free Ad
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>100% Free to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in-up">
              <div className="space-y-4">
                <div className="bg-white/8 rounded-xl p-5 hover:bg-white/12 transition-colors">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                    <Bird className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-1">Premium Birds</h3>
                  <p className="text-sm text-white/50">Rare & exotic breeds available</p>
                </div>
                <div className="bg-white/8 rounded-xl p-5 hover:bg-white/12 transition-colors">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                    <PawPrint className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-1">Quality Pets</h3>
                  <p className="text-sm text-white/50">Healthy & vaccinated companions</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/8 rounded-xl p-5 hover:bg-white/12 transition-colors">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-1">Trusted Sellers</h3>
                  <p className="text-sm text-white/50">Verified & reliable partners</p>
                </div>
                <div className="bg-white/8 rounded-xl p-5 hover:bg-white/12 transition-colors">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-1">Fast & Easy</h3>
                  <p className="text-sm text-white/50">Quick listing in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-elevated border border-stone-dark/5 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold font-display text-primary-dark mb-0.5">{stat.value}</div>
                <div className="text-xs text-stone-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="primary" size="md" className="mb-3">
            Browse Categories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
            Explore Our Categories
          </h2>
          <p className="text-stone-light max-w-lg mx-auto">
            From livestock to pets, birds to exotic animals — find everything you need in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/listings?category=${encodeURIComponent(cat.name)}`}
              className="bg-white rounded-xl border border-stone-dark/5 p-5 text-center hover:shadow-card-hover hover:border-primary/20 transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold font-display text-primary-dark group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-stone-light mt-1">
                {cat.count}+ Available
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-surface-warm/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="accent" size="md" className="mb-3">
                Featured
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark">
                Latest Listings
              </h2>
              <p className="text-stone-light mt-2">
                Handpicked animals from our most trusted sellers.
              </p>
            </div>
            <Link to="/listings">
              <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
                View All
              </Button>
            </Link>
          </div>

          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <AnimalCard key={post.id} animal={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-stone-dark/5">
              <div className="text-5xl mb-4">🐄</div>
              <h3 className="text-xl font-bold font-display text-primary-dark mb-2">
                No Listings Yet
              </h3>
              <p className="text-stone-light mb-6">
                Be the first to post an animal listing!
              </p>
              <Link to="/post-listing">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Post Free Ad
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="primary" size="md" className="mb-3">
              Why Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
              Why Choose AnimalMandiHub?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trusted & Verified',
                desc: 'Every seller is verified to ensure you get healthy, quality animals.',
              },
              {
                icon: Clock,
                title: 'Fast & Convenient',
                desc: 'List your animals in minutes and reach thousands of buyers.',
              },
              {
                icon: Heart,
                title: 'Community First',
                desc: 'Join a thriving community of animal lovers and traders.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-dark/5 p-7 text-center hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-display text-primary-dark mb-2">{item.title}</h3>
                <p className="text-sm text-stone-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-3">
              What Our Community Says
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Hear from thousands of satisfied farmers and animal lovers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white/8 rounded-xl p-6 border border-white/8"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{testimonial.name}</div>
                    <div className="text-xs text-white/40">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" size="md" className="mb-3">
              Locations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
              Popular Cities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {cities.map((city) => (
              <Link
                key={city.name}
                to={`/listings?city=${encodeURIComponent(city.name)}`}
                className="bg-white rounded-xl border border-stone-dark/5 p-4 text-center hover:shadow-card-hover hover:border-primary/20 transition-all duration-200"
              >
                <MapPin className="w-5 h-5 text-primary/60 mx-auto mb-2" />
                <h3 className="text-sm font-bold font-display text-primary-dark">{city.name}</h3>
                <p className="text-[10px] text-stone-light mt-0.5">{city.count}+ Listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary-dark via-stone-dark to-primary-dark rounded-2xl p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Ready to Find Your Perfect Animal?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Join thousands of farmers and animal lovers who trust AnimalMandiHub.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/listings">
                <Button variant="primary" size="xl" icon={Search}>
                  Start Browsing
                </Button>
              </Link>
              <Link to="/post-listing">
                <Button
                  variant="outline"
                  size="xl"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Post Free Ad
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
