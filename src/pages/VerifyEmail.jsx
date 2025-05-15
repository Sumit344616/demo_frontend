import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyEmail } from '../services/api';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const email = location.state?.email || localStorage.getItem('verificationEmail');
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    } else {
      navigate('/register');
    }
  }, [location, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyEmail(formData);
      toast.success(response.message);
      localStorage.removeItem('verificationEmail');
      navigate('/admin/login');
    } catch (err) {
      if (err.status === 400) {
        toast.error('Invalid or expired OTP');
      } else if (err.status === 404) {
        toast.error('User not found');
      } else {
        toast.error(err.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setLoading(true);
    try {
      toast.success('OTP resent successfully');
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-form-container">
        <h2>Verify Your Email</h2>
        <p className="verification-info">
          Please enter the OTP sent to your email address
        </p>
        <form onSubmit={handleSubmit} className="verify-email-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter OTP"
              maxLength="6"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>

          <button 
            type="submit" 
            className="verify-button"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="resend-section">
            {!canResend ? (
              <p className="timer">Resend OTP in {timer} seconds</p>
            ) : (
              <button
                type="button"
                className="resend-button"
                onClick={handleResendOTP}
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail; 