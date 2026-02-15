import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [otp, setOtp] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, role);
      setIsLoading(false);
      setShowTwoFactor(true);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } else {
      setError("Invalid OTP. Please enter 6 digits (e.g. 123456)");
    }
  };

  // For demo purposes, pre-filled credentials
  const fillDemoCredentials = (userRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-primary-600 p-3 rounded-xl shadow-lg shadow-primary-200">
            <Building2 className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Business Nexus
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connect with investors and entrepreneurs
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center text-sm">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={showTwoFactor ? handleVerifyOtp : handleSubmit}>
            {!showTwoFactor ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`flex items-center justify-center p-3 border-2 rounded-xl transition-all ${role === 'entrepreneur'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      onClick={() => setRole('entrepreneur')}
                    >
                      <Building2 size={18} className="mr-2" />
                      <span className="font-semibold text-sm">Entrepreneur</span>
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-center p-3 border-2 rounded-xl transition-all ${role === 'investor'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      onClick={() => setRole('investor')}
                    >
                      <CircleDollarSign size={18} className="mr-2" />
                      <span className="font-semibold text-sm">Investor</span>
                    </button>
                  </div>
                </div>

                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  startAdornment={<User size={18} className="text-gray-400" />}
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" weight="medium" className="text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">Two-Factor Authentication</h4>
                    <p className="text-xs text-blue-700 mt-1">For security, please enter the 6-digit code sent to your mobile device.</p>
                    <p className="text-xs font-mono bg-white inline-block px-2 py-1 rounded mt-2 border border-blue-200 text-blue-800">Mock Code: 123456</p>
                  </div>
                </div>
                <Input
                  label="One-Time Password (OTP)"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  fullWidth
                  placeholder="123456"
                  className="text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                />
              </div>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                size="lg"
                leftIcon={<LogIn size={18} />}
              >
                {showTwoFactor ? 'Verify & Login' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium whitespace-nowrap">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('entrepreneur')}
                leftIcon={<Building2 size={16} />}
              >
                Entrepreneur
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('investor')}
                leftIcon={<CircleDollarSign size={16} />}
              >
                Investor
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
