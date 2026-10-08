import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { authService } from '../services/authService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('humayoonkhan003@gmail.com');
  const [password, setPassword] = useState('adminehsasprogram');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authService.login(email, password, rememberMe);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo-password');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-600)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: '0 8px 16px -4px rgba(5, 150, 105, 0.4)',
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Administrator Portal
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            احساس قومی ریلیف پورٹل • Ehsaas Relief Portal
          </p>
        </div>

        {/* Login Card */}
        <div
          className="card"
          style={{
            padding: '2rem',
            backgroundColor: '#ffffff',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              <AlertCircle size={18} className="alert-icon" />
              <div className="alert-content">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Admin Email Address"
              placeholder="admin@ehsasreliefprogram.vercel.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password / Access Key"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                fontSize: '0.8125rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: 'var(--navy-700)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session</span>
              </label>

              <span style={{ color: 'var(--navy-500)', fontSize: '0.75rem' }}>
                Local Dev Mode
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={<Key size={18} />}
            >
              Sign In to Admin Panel
            </Button>
          </form>

          {/* Demo Quick Credentials Fill */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--navy-800)', marginBottom: '0.5rem' }}>
              Quick Demo Accounts:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@citizengrantportal.org')}
                style={{
                  background: 'var(--navy-50)',
                  border: '1px solid var(--navy-200)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.6rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
              >
                <span><strong>Super Admin:</strong> admin@citizengrantportal.org</span>
                <span style={{ color: 'var(--primary-700)', fontWeight: 600 }}>Use</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('reviewer@citizengrantportal.org')}
                style={{
                  background: 'var(--navy-50)',
                  border: '1px solid var(--navy-200)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.6rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
              >
                <span><strong>Case Reviewer:</strong> reviewer@citizengrantportal.org</span>
                <span style={{ color: 'var(--primary-700)', fontWeight: 600 }}>Use</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back to Public Portal Link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link
            to="/"
            style={{
              color: '#94a3b8',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
