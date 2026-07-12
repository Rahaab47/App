import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Truck, Clock, BadgeIndianRupee, CheckCircle, Phone, ArrowRight, Star, Stethoscope, Home as HomeIcon, Dog } from 'lucide-react';
import { services } from '../data/animals';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const serviceIcons = {
  'Veterinary Care': Stethoscope,
  'Pet Grooming': Dog,
  'Animal Transport': Truck,
  'Insurance': Shield,
  'Boarding': HomeIcon,
  'Training': Heart,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-dark via-stone-dark to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Badge variant="accent" size="md" className="mb-3">
            Our Services
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Premium Animal Services
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Professional care and support for your beloved animals.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.name] || Heart;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-display text-primary-dark mb-2">{service.name}</h3>
                <p className="text-sm text-stone-light leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-dark/5">
                  <div className="flex items-center gap-1 text-primary font-bold text-lg">
                    <BadgeIndianRupee className="w-4 h-4" />
                    {service.price}
                  </div>
                  <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-surface-warm/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="primary" size="md" className="mb-3">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
              Service Packages
            </h2>
            <p className="text-stone-light max-w-lg mx-auto">
              Choose the package that best fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic',
                price: '1,999',
                features: ['Basic Health Check', 'Vaccination Record', 'Email Support', '1 Animal'],
                popular: false,
              },
              {
                name: 'Standard',
                price: '4,999',
                features: ['Full Health Check', 'Vaccination + Deworming', 'Priority Support', 'Up to 3 Animals', 'Grooming Session'],
                popular: true,
              },
              {
                name: 'Premium',
                price: '9,999',
                features: ['Comprehensive Check', 'Full Vaccination', '24/7 Support', 'Unlimited Animals', 'Free Grooming', 'Transport Included'],
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border p-8 text-center ${
                  plan.popular ? 'border-primary shadow-elevated ring-1 ring-primary/20' : 'border-stone-dark/5 shadow-card'
                }`}
              >
                {plan.popular && (
                  <Badge variant="primary" size="md" className="mb-3">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold font-display text-primary-dark mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-6">
                  <BadgeIndianRupee className="w-5 h-5 text-primary" />
                  <span className="text-3xl font-bold font-display text-primary-dark">{plan.price}</span>
                  <span className="text-sm text-stone-light">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-stone">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" size="md" className="mb-3">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary-dark mb-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { q: 'How do I book a service?', a: 'Simply click on the service you need, select your preferred date and time, and confirm your booking.' },
            { q: 'Are your veterinarians certified?', a: 'Yes, all our veterinarians are fully certified with years of experience.' },
            { q: 'What areas do you cover?', a: 'We currently offer services in all major cities across Pakistan.' },
            { q: 'Can I cancel or reschedule?', a: 'Yes, you can cancel or reschedule up to 24 hours before your appointment.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-dark/5 shadow-card p-6">
              <h3 className="text-base font-bold font-display text-primary-dark mb-2">{faq.q}</h3>
              <p className="text-sm text-stone-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary-dark via-stone-dark to-primary-dark rounded-2xl p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect service.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="xl" icon={Phone}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
