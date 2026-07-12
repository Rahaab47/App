import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, Heart, BadgeIndianRupee } from 'lucide-react';
import Badge from './ui/Badge';

export default function AnimalCard({ animal, featured = false }) {
  return (
    <Link
      to={`/animal/${animal.id}`}
      className="block bg-white rounded-xl border border-stone-dark/5 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {animal.badge && (
            <Badge variant="primary" size="md" dot>
              {animal.badge}
            </Badge>
          )}
          {animal.gender && (
            <Badge variant={animal.gender === 'Male' ? 'info' : 'accent'} size="md">
              {animal.gender}
            </Badge>
          )}
        </div>

        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-stone-light hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </button>

        {animal.price && (
          <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-2.5 py-1 shadow-md">
            <div className="flex items-center gap-1">
              <BadgeIndianRupee className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-bold text-primary-dark">{animal.price}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold font-display text-primary-dark leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {animal.name}
          </h3>
          {animal.breed && (
            <span className="text-[10px] font-medium text-stone-light bg-surface-warm px-2 py-0.5 rounded whitespace-nowrap">
              {animal.breed}
            </span>
          )}
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-light">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{animal.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-light">
            <Calendar className="w-3 h-3" />
            <span>{animal.age}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-stone-dark/5">
          <div className="flex items-center gap-1.5 text-xs text-stone-light">
            <Phone className="w-3 h-3" />
            <span className="font-medium">{animal.sellerPhone}</span>
          </div>
          <span className="text-[10px] font-medium text-stone-light bg-surface-warm px-2 py-0.5 rounded">
            {animal.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
