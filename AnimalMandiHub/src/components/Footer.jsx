import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PawPrint, Phone, Mail, MapPin, Clock, Globe, MessageCircle,
  Camera, Play, ArrowRight, Heart, Shield
} from 'lucide-react';
import Button from './ui/Button';

const footerLinks = {
  'Quick Links': [
    { name: 'Home', path: '/' },
    { name: 'Animal Listings', path: '/listings' },
    { name: 'Birds', path: '/birds' },
    { name: 'Pets', path: '/pets' },
    { name: 'Services', path: '/services' },
  ],
  'Support': [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Terms of Service', path: '/about' },
    { name: 'Privacy Policy', path: '/about' },
  ],
};

const socialLinks = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold font-display text-white">
                  Animal<span className="text-primary">Mandi</span>Hub
                </div>
                <div className="text-[9px] text-white/40 tracking-wider uppercase leading-tight">
                  All animals, under one roof
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Explore a world where sellers and buyers interact through technology… all breeds of pets, livestock and other animals, under one roof.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold font-display text-white mb-4 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/40 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-bold font-display text-white mb-4 tracking-wide uppercase">
              Stay Connected
            </h4>
            <p className="text-sm text-white/40 mb-3">
              Get the latest updates on new animals and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full h-10 px-3 text-sm text-white bg-white/8 border border-white/10 rounded-lg placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                Subscribe
              </Button>
            </form>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>03000000000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>hello@animalmandihub.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-sm text-white/30">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-primary fill-primary" />
            <span>for animal lovers everywhere</span>
          </div>
          <div className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} AnimalMandiHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
