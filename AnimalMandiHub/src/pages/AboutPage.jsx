import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, Award, Target, Eye, ArrowRight, CheckCircle, Star, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const values = [
  { icon: Shield, title: 'Trust & Safety', desc: 'We verify every seller to ensure healthy, quality animals.' },
  { icon: Heart, title: 'Animal Welfare', desc: 'We promote ethical treatment and proper care for all animals.' },
  { icon: Users, title: 'Community', desc: 'Building connections between farmers, breeders, and animal lovers.' },
  { icon: Award, title: 'Quality', desc: 'We maintain the highest standards across our platform.' },
];

const team = [
  { name: 'Muhammad Umair', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Dr. Ahmad Khan', role: 'Head of Veterinary', emoji: '👨‍⚕️' },
  { name: 'Fatima Ali', role: 'Community Manager', emoji: '👩‍💻' },
  { name: 'Hassan Malik', role: 'Lead Developer', emoji: '👨‍💻' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-dark via-stone-dark to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Badge variant="accent" size="md" className="mb-3">
            About Us
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
            Our Story
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We're on a mission to revolutionize how Pakistan buys, sells, and connects with livestock and pets.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-8 sm:p-10 animate-fade-in">
            <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display text-primary-dark mb-4">Our Mission</h2>
            <p className="text-stone leading-relaxed">
              To create Pakistan's most trusted and comprehensive livestock marketplace, connecting farmers,
              breeders, and animal lovers through technology.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-8 sm:p-10 animate-fade-in-up stagger-2">
            <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-accent-dark" />
            </div>
            <h2 className="text-2xl font-bold font-display text-primary-dark mb-4">Our Vision</h2>
            <p className="text-stone leading-relaxed">
              To become the go-to platform for all animal-related needs in South Asia, where every animal
              finds a caring home and every farmer has access to quality livestock.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface-warm/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="primary" size="md" className="mb-3">
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
              What We Stand For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-7 text-center hover:shadow-card-hover transition-all duration-200">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold font-display text-primary-dark mb-2">{value.title}</h3>
                <p className="text-sm text-stone-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="accent" size="md" className="mb-3">
            Our Journey
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
            Milestones
          </h2>
        </div>

        <div className="space-y-6">
          {[
            { year: '2023', title: 'The Idea', desc: 'Founded with a vision to digitize Pakistan\'s livestock market.', icon: '💡' },
            { year: '2024', title: 'Launch', desc: 'Platform launched with 100+ initial listings.', icon: '🚀' },
            { year: '2025', title: 'Growth', desc: 'Expanded to 50+ cities with 10,000+ listings.', icon: '📈' },
            { year: '2026', title: 'Today', desc: 'Serving 100,000+ users nationwide.', icon: '🏆' },
          ].map((milestone, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-xl">
                  {milestone.icon}
                </div>
                {i < 3 && <div className="w-0.5 h-12 bg-primary/20 mt-2" />}
              </div>
              <div className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-5 flex-1">
                <Badge variant="primary" size="sm" className="mb-2">{milestone.year}</Badge>
                <h3 className="text-lg font-bold font-display text-primary-dark mb-1">{milestone.title}</h3>
                <p className="text-sm text-stone-light">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-surface-warm/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" size="md" className="mb-3">
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
              Meet the Team
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 text-center hover:shadow-card-hover transition-all duration-200">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="text-base font-bold font-display text-primary-dark mb-0.5">{member.name}</h3>
                <p className="text-xs text-stone-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary-dark via-stone-dark to-primary-dark rounded-2xl p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Be a part of Pakistan's largest livestock marketplace.
            </p>
            <Link to="/auth">
              <Button variant="primary" size="xl" icon={ArrowRight} iconPosition="right">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
