import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Headphones, Globe, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-dark via-stone-dark to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Badge variant="accent" size="md" className="mb-3">
            Get in Touch
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Have a question or need assistance? We're here to help you 24/7.
          </p>
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Phone, label: 'Phone', value: '03000000000', sub: 'Call us anytime' },
            { icon: Mail, label: 'Email', value: 'hello@animalmandihub.com', sub: '24/7 email support' },
            { icon: MapPin, label: 'Office', value: 'Lahore, Pakistan', sub: 'Head office' },
            { icon: Clock, label: 'Hours', value: '24/7 Support', sub: 'Always available' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 text-center hover:shadow-card-hover transition-all duration-200">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-primary-dark mb-1">{card.label}</h3>
              <p className="text-sm font-medium text-primary-dark">{card.value}</p>
              <p className="text-xs text-stone-light mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-elevated border border-stone-dark/5 p-8 animate-fade-in">
            <h2 className="text-2xl font-bold font-display text-primary-dark mb-6">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold font-display text-primary-dark mb-2">Message Sent!</h3>
                <p className="text-stone-light">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="03000000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-stone-dark">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-stone-light resize-none"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-card border border-stone-dark/5 p-8 animate-fade-in-up stagger-2">
              <h3 className="text-xl font-bold font-display text-primary-dark mb-5">
                Why Contact Us?
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Headphones, title: '24/7 Support', desc: 'Our team is available around the clock.' },
                  { icon: MessageSquare, title: 'Quick Response', desc: 'We respond within 24 hours.' },
                  { icon: Globe, title: 'Nationwide', desc: 'We cover all major cities.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-dark">{item.title}</h4>
                      <p className="text-sm text-stone-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-dark to-stone-dark rounded-xl p-8 text-white animate-fade-in-up stagger-3">
              <h3 className="text-xl font-bold font-display mb-3">Emergency?</h3>
              <p className="text-white/60 mb-4 text-sm">
                For urgent animal emergencies, call our 24/7 hotline.
              </p>
              <Button variant="primary" size="lg" icon={Phone}>
                Call Now: 03000000000
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
