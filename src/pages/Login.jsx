import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post('api/franchise/login', { email, password });

      // Expected to return accessToken & refreshToken
      if (response.data && response.data.accessToken) {
        // Adjust this depending on your AuthContext / apiClient setup
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      login('franchise');
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else if (err.response && err.response.status === 403) {
        setError('Franchise account is disabled');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-body">
      <div className="lg-bg">
        <div className="lg-blob lg-b1" />
        <div className="lg-blob lg-b2" />
        <div className="lg-blob lg-b3" />
        <div className="lg-blob lg-b4" />
      </div>

      <div className="lg-stage">
        <div className="lg-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Sign in</span>
        </div>

        <div className="lg-card">
          <h1>Welcome back</h1>
          <p className="lg-sub">Sign in to pick up where you left off.</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="lg-error" style={{ color: '#ea4335', marginBottom: '16px', textAlign: 'center', fontSize: '14px', background: 'rgba(234, 67, 53, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(234, 67, 53, 0.2)' }}>{error}</div>}
            <div className="lg-field">
              <input
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lg-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  opacity: 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  outline: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                onMouseOut={(e) => e.currentTarget.style.opacity = 0.6}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <div className="lg-row">
              <a href="#forgot">Forgot password?</a>
            </div>

            <button type="submit" className="lg-ai-btn" disabled={loading}>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <svg className="lg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Continue
                </>
              )}
            </button>
          </form>

          <p className="lg-foot">
            Don&apos;t have an account?
          </p>
        </div>
      </div>

      <style>{`
        .lg-body{
          --ink:#f5f5f7;
          --muted:rgba(245,245,247,.65);
          --blue:#4285f4;
          --red:#ea4335;
          --yellow:#fbbc05;
          --green:#34a853;
          --glass-fill: rgba(30,30,36,.35);
          --glass-fill-strong: rgba(40,40,48,.5);
          --glass-border: rgba(255,255,255,.18);
          --glass-shadow: rgba(0,0,0,.45);
          margin:0;
          min-height:100vh;
          color:var(--ink);
          font-family:"Google Sans Text","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          position:relative;
          overflow:hidden;
          background:#0f0f11;
        }
        .lg-body *{ box-sizing:border-box; }

        .lg-bg{
          position:fixed;
          inset:0;
          z-index:0;
          overflow:hidden;
          background:#0f0f11;
        }
        .lg-blob{
          position:absolute;
          border-radius:50%;
          filter:blur(60px);
          opacity:.55;
          will-change:transform;
        }
        .lg-b1{ width:46vmax; height:46vmax; background:radial-gradient(circle,var(--blue),transparent 70%); top:-14vmax; left:-12vmax; animation:lgFloat1 22s ease-in-out infinite; }
        .lg-b2{ width:38vmax; height:38vmax; background:radial-gradient(circle,var(--red),transparent 70%); bottom:-12vmax; right:-10vmax; animation:lgFloat2 26s ease-in-out infinite; }
        .lg-b3{ width:34vmax; height:34vmax; background:radial-gradient(circle,var(--yellow),transparent 70%); bottom:8vmax; left:-10vmax; animation:lgFloat3 19s ease-in-out infinite; }
        .lg-b4{ width:30vmax; height:30vmax; background:radial-gradient(circle,var(--green),transparent 70%); top:6vmax; right:4vmax; animation:lgFloat1 24s ease-in-out infinite reverse; }

        @keyframes lgFloat1{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(4vmax,3vmax) scale(1.08); } }
        @keyframes lgFloat2{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(-3vmax,-4vmax) scale(1.1); } }
        @keyframes lgFloat3{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(3vmax,-2vmax) scale(1.05); } }

        .lg-stage{ position:relative; z-index:1; width:100%; max-width:520px; }

        @keyframes lgRiseIn{ from{ opacity:0; transform:translateY(18px); } to{ opacity:1; transform:translateY(0); } }
        .lg-brand{ display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:24px; animation:lgRiseIn .7s cubic-bezier(.2,.8,.2,1) both; }
        .lg-brand svg{ width:28px; height:28px; filter:drop-shadow(0 1px 2px rgba(0,0,0,.15)); animation:lgIconFloat 5s ease-in-out infinite; }
        @keyframes lgIconFloat{ 0%,100%{ transform:translateY(0) rotate(0deg); } 50%{ transform:translateY(-3px) rotate(4deg); } }
        .lg-brand span{ font-size:21px; letter-spacing:-.01em; color:var(--ink); font-weight:500; text-shadow:0 1px 2px rgba(255,255,255,.3); }

        .lg-card{
          position:relative;
          background:var(--glass-fill);
          border-radius:32px;
          padding:48px 56px 40px;
          backdrop-filter:blur(28px) saturate(160%);
          -webkit-backdrop-filter:blur(28px) saturate(160%);
          border:1px solid var(--glass-border);
          box-shadow:0 20px 50px var(--glass-shadow), inset 0 1px 1px rgba(255,255,255,.6), inset 0 -1px 1px rgba(255,255,255,.1);
          overflow:hidden;
          animation:lgRiseIn .8s .1s cubic-bezier(.2,.8,.2,1) both;
          transition:transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s ease, background .4s ease;
        }
        .lg-card:hover{
          transform:translateY(-4px);
          background:var(--glass-fill-strong);
          box-shadow:0 28px 64px var(--glass-shadow), inset 0 1px 1px rgba(255,255,255,.7), inset 0 -1px 1px rgba(255,255,255,.12);
        }
        .lg-card::before{
          content:"";
          position:absolute;
          top:0; left:-20%;
          width:140%; height:60px;
          background:linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.55) 45%, rgba(255,255,255,0) 70%);
          transform:rotate(-3deg);
          pointer-events:none;
          opacity:.7;
        }

        .lg-card h1{ font-size:24px; font-weight:500; text-align:center; margin:0 0 6px; letter-spacing:-.01em; }
        .lg-sub{ text-align:center; color:var(--muted); font-size:14.5px; margin:0 0 30px; line-height:1.5; }

        .lg-field{ position:relative; margin-bottom:16px; animation:lgRiseIn .6s cubic-bezier(.2,.8,.2,1) both; }
        .lg-field:nth-of-type(1){ animation-delay:.3s; }
        .lg-field:nth-of-type(2){ animation-delay:.38s; }
        .lg-field input{
          width:100%;
          padding:14px 16px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.5);
          background:rgba(255,255,255,.22);
          backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px);
          color:var(--ink);
          font-size:15px;
          font-family:inherit;
          outline:none;
          transition:border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        @media (prefers-color-scheme: dark){ .lg-field input{ background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.15); } }
        .lg-field input::placeholder{ color:var(--muted); opacity:.9; }
        .lg-field input:hover{ background:rgba(255,255,255,.3); border-color:rgba(255,255,255,.7); }
        .lg-field input:focus{ border-color:rgba(66,133,244,.6); box-shadow:0 0 0 4px rgba(66,133,244,.16); background:rgba(255,255,255,.34); }

        .lg-row{ display:flex; justify-content:flex-end; margin:-2px 0 24px; animation:lgRiseIn .6s .44s cubic-bezier(.2,.8,.2,1) both; }
        .lg-row a{ font-size:13.5px; color:var(--ink); opacity:.75; text-decoration:none; }
        .lg-row a:hover{ opacity:1; text-decoration:underline; }

        .lg-ai-btn{
          --r: 999px;
          position:relative;
          width:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          padding:15px 20px;
          border-radius:var(--r);
          border:none;
          cursor:pointer;
          background:rgba(255,255,255,.35);
          backdrop-filter:blur(14px) saturate(180%);
          -webkit-backdrop-filter:blur(14px) saturate(180%);
          color:var(--ink);
          font-family:inherit;
          font-size:16px;
          font-weight:500;
          letter-spacing:-.01em;
          isolation:isolate;
          transition:transform .15s ease, box-shadow .25s ease, background .2s ease;
          box-shadow:0 8px 20px rgba(20,20,40,.18), inset 0 1px 1px rgba(255,255,255,.8), inset 0 -1px 2px rgba(255,255,255,.2);
          animation:lgRiseIn .6s .5s cubic-bezier(.2,.8,.2,1) both;
        }
        .lg-ai-btn:hover{
          background:rgba(255,255,255,.5);
          transform:translateY(-2px);
          box-shadow:0 14px 28px rgba(20,20,40,.22), inset 0 1px 1px rgba(255,255,255,.85), inset 0 -1px 2px rgba(255,255,255,.25);
        }
        .lg-ai-btn:active{ transform:scale(.985) translateY(0); }
        .lg-ai-btn::before{
          content:"";
          position:absolute;
          inset:0;
          border-radius:var(--r);
          padding:1.5px;
          background:conic-gradient(from var(--angle,0deg), var(--blue), var(--red), var(--yellow), var(--green), var(--blue));
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;
          mask-composite:exclude;
          z-index:-1;
          animation:lgSpin 4s linear infinite;
          opacity:.85;
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .lg-ai-btn::after{
          content:"";
          position:absolute;
          inset:-8px;
          border-radius:var(--r);
          background:conic-gradient(from var(--angle,0deg), var(--blue), var(--red), var(--yellow), var(--green), var(--blue));
          filter:blur(18px);
          opacity:.4;
          z-index:-2;
          animation:lgSpin 4s linear infinite;
          transition:opacity .3s ease;
        }
        .lg-ai-btn:hover::after{ opacity:.6; }
        @keyframes lgSpin{ to{ --angle:360deg; } }
        .lg-icon{ width:20px; height:20px; flex:none; transition:transform .3s ease; }
        .lg-ai-btn:hover .lg-icon{ transform:rotate(-8deg) scale(1.08); }

        .lg-divider{ display:flex; align-items:center; gap:14px; margin:26px 0; color:var(--muted); font-size:13px; animation:lgRiseIn .6s .56s cubic-bezier(.2,.8,.2,1) both; }
        .lg-divider::before,.lg-divider::after{ content:""; flex:1; height:1px; background:rgba(255,255,255,.4); }

        .lg-alt{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          width:100%;
          padding:13px 16px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.5);
          background:rgba(255,255,255,.24);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          color:var(--ink);
          font-family:inherit;
          font-size:14.5px;
          font-weight:500;
          cursor:pointer;
          transition:background .25s ease, transform .25s ease, border-color .25s ease;
          animation:lgRiseIn .6s .62s cubic-bezier(.2,.8,.2,1) both;
        }
        .lg-alt:hover{ background:rgba(255,255,255,.42); border-color:rgba(255,255,255,.8); transform:translateY(-2px); }
        .lg-alt:active{ transform:translateY(0) scale(.98); }
        .lg-alt svg{ width:18px; height:18px; }

        .lg-foot{ text-align:center; margin-top:26px; font-size:14px; color:var(--muted); animation:lgRiseIn .6s .68s cubic-bezier(.2,.8,.2,1) both; }
        .lg-foot a{ color:var(--ink); font-weight:600; text-decoration:none; }
        .lg-foot a:hover{ text-decoration:underline; }

        @media (prefers-reduced-motion: reduce){
          .lg-blob, .lg-brand, .lg-brand svg, .lg-card, .lg-field, .lg-row, .lg-ai-btn, .lg-ai-btn::before, .lg-ai-btn::after, .lg-divider, .lg-alt, .lg-foot{
            animation:none;
          }
        }
      `}</style>
    </div>
  );
}
