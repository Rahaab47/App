import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera, MapPin, BadgeIndianRupee, Tag, FileText, Phone, User,
  CheckCircle, ArrowLeft, ArrowRight, Upload, X, Info, PawPrint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { categories, cities, breeds } from '../data/animals';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const steps = [
  { id: 1, title: 'Animal Details', icon: PawPrint },
  { id: 2, title: 'Photos & Location', icon: Camera },
  { id: 3, title: 'Contact Info', icon: Phone },
];

export default function PostListingPage() {
  const { user } = useAuth();
  const { addPost } = usePosts();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    breed: '',
    age: '',
    gender: '',
    price: '',
    location: '',
    description: '',
    image: '',
    sellerName: user?.name || '',
    sellerPhone: user?.phone || '',
  });

  const availableBreeds = formData.category ? (breeds[formData.category] || []) : [];

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.breed) newErrors.breed = 'Breed is required';
      if (!formData.age.trim()) newErrors.age = 'Age is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.price.trim()) newErrors.price = 'Price is required';
    }
    if (step === 2) {
      if (!formData.location) newErrors.location = 'Location is required';
    }
    if (step === 3) {
      if (!formData.sellerName.trim()) newErrors.sellerName = 'Name is required';
      if (!formData.sellerPhone.trim()) newErrors.sellerPhone = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      addPost({
        ...formData,
        sellerId: user?.id,
        status: 'pending',
        image: formData.image || `https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop`,
      });
      navigate('/listings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-elevated border border-stone-dark/5 p-12 text-center max-w-md animate-fade-in">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold font-display text-primary-dark mb-3">
            Sign In Required
          </h2>
          <p className="text-stone-light mb-6">
            You need to be signed in to post a listing.
          </p>
          <Link to="/auth">
            <Button variant="primary" size="lg" icon={User}>
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-display text-primary-dark mb-2">
            Post a Free Listing
          </h1>
          <p className="text-stone-light">
            List your animal in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 animate-fade-in-up">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === step.id
                  ? 'bg-primary text-white'
                  : currentStep > step.id
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-surface-warm text-stone-light border border-stone-dark/8'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 rounded-full transition-colors ${
                  currentStep > step.id ? 'bg-emerald-400' : 'bg-stone-dark/10'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-elevated border border-stone-dark/5 p-6 sm:p-8 animate-fade-in-up">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-primary-dark mb-4">
                Tell us about your animal
              </h2>
              <Input
                label="Animal Name"
                placeholder="e.g., Bobby"
                icon={Tag}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-stone-dark">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => { handleChange('category', e.target.value); handleChange('breed', ''); }}
                    className="w-full h-10 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-stone-dark">Breed</label>
                  <select
                    value={formData.breed}
                    onChange={(e) => handleChange('breed', e.target.value)}
                    disabled={!formData.category}
                    className="w-full h-10 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  >
                    <option value="">Select breed</option>
                    {availableBreeds.map((breed) => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                  {errors.breed && <p className="text-xs text-red-500">{errors.breed}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Age"
                  placeholder="e.g., 2 years"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  error={errors.age}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-stone-dark">Gender</label>
                  <div className="flex gap-3">
                    {['Male', 'Female'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleChange('gender', g)}
                        className={`flex-1 h-10 rounded-lg text-sm font-medium border transition-colors ${
                          formData.gender === g
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white border-stone-dark/12 text-stone hover:border-primary/30'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                </div>
              </div>

              <Input
                label="Asking Price (PKR)"
                type="number"
                placeholder="e.g., 50000"
                icon={BadgeIndianRupee}
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                error={errors.price}
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-stone-dark">Description (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Describe your animal's health, vaccination status, etc..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-stone-light resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold font-display text-primary-dark mb-4">
                Photos & Location
              </h2>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-stone-dark">Photo URL (optional)</label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  icon={Camera}
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
                <p className="text-xs text-stone-light flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Paste a direct link to your animal's photo
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-stone-dark">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-stone-dark/12 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select your city</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
                {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-primary-dark mb-4">
                Contact Information
              </h2>
              <Input
                label="Your Name"
                placeholder="e.g., Ahmed Khan"
                icon={User}
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                error={errors.sellerName}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="03000000000"
                icon={Phone}
                value={formData.sellerPhone}
                onChange={(e) => handleChange('sellerPhone', e.target.value)}
                error={errors.sellerPhone}
              />

              <div className="bg-surface-warm rounded-lg p-4 border border-stone-dark/8">
                <h4 className="text-sm font-bold text-primary-dark mb-3">Preview Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-stone-light">Name:</span> <span className="font-medium text-primary-dark">{formData.name || '—'}</span></div>
                  <div><span className="text-stone-light">Category:</span> <span className="font-medium text-primary-dark">{formData.category || '—'}</span></div>
                  <div><span className="text-stone-light">Breed:</span> <span className="font-medium text-primary-dark">{formData.breed || '—'}</span></div>
                  <div><span className="text-stone-light">Price:</span> <span className="font-medium text-primary-dark">Rs. {formData.price || '—'}</span></div>
                  <div><span className="text-stone-light">Location:</span> <span className="font-medium text-primary-dark">{formData.location || '—'}</span></div>
                  <div><span className="text-stone-light">Phone:</span> <span className="font-medium text-primary-dark">{formData.sellerPhone || '—'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-dark/8">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              icon={ArrowLeft}
            >
              Back
            </Button>

            {currentStep < 3 ? (
              <Button variant="primary" onClick={handleNext} icon={ArrowRight} iconPosition="right">
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                loading={loading}
                icon={CheckCircle}
              >
                Post Listing
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
