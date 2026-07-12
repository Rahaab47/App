import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const passwordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthLabel = (score) => {
    if (score <= 1) return { label: 'Weak', color: 'danger' };
    if (score <= 2) return { label: 'Fair', color: 'warning' };
    if (score <= 3) return { label: 'Good', color: 'info' };
    if (score <= 4) return { label: 'Strong', color: 'success' };
    return { label: 'Very Strong', color: 'success' };
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!isLogin && !formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isLogin && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          setErrors({ email: result.error });
        }
      } else {
        const result = await register(formData.name, formData.email, formData.phone, formData.password);
        if (!result.success) {
          setErrors({ email: result.error });
        }
      }
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

  const strength = passwordStrength(formData.password);
  const strengthInfo = strengthLabel(strength);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-dark to-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🐾</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-display text-primary-dark mb-2">
            {isLogin ? 'Welcome Back' : 'Join AnimalMandiHub'}
          </h1>
          <p className="text-stone-light">
            {isLogin ? 'Sign in to continue your journey' : 'Create your account and start exploring'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-elevated border border-stone-dark/5 p-8 animate-fade-in-up">
          <div className="flex bg-surface-warm rounded-lg p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setErrors({}); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogin ? 'bg-white text-primary-dark shadow-sm' : 'text-stone hover:text-primary-dark'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrors({}); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? 'bg-white text-primary-dark shadow-sm' : 'text-stone hover:text-primary-dark'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Umair"
                icon={User}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
            />

            {!isLogin && (
              <Input
                label="Phone Number"
                type="tel"
                placeholder="03000000000"
                icon={Phone}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={errors.phone}
              />
            )}

            <div className="relative">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
              />
              {!isLogin && formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strength
                            ? strength <= 1 ? 'bg-red-400' :
                              strength <= 2 ? 'bg-amber-400' :
                              strength <= 3 ? 'bg-blue-400' :
                              'bg-emerald-400'
                            : 'bg-stone-dark/10'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-stone-light">
                      Password strength
                    </span>
                    <Badge variant={strengthInfo.color} size="sm">
                      {strengthInfo.label}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
              />
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-stone-dark/12 text-primary focus:ring-primary/20" />
                  <span className="text-sm text-stone-light">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.general}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-stone-dark/8 text-center">
            <p className="text-sm text-stone-light">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                className="text-primary font-medium hover:text-primary-dark transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-stone-light mt-5">
          By continuing, you agree to our{' '}
          <Link to="/about" className="text-primary font-medium">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/about" className="text-primary font-medium">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
