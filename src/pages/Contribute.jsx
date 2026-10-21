import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Lock, Phone, RefreshCw, Send } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Contribute = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('2');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [response, setResponse] = useState(null);
  const [primaryMsisdn, setPrimaryMsisdn] = useState(null);
  const [isLoadingMsisdn, setIsLoadingMsisdn] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifyStatus, setVerifyStatus] = useState('idle');
  const [verifyError, setVerifyError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const quickAmounts = [2, 50, 100, 500];

  const loadMsisdn = async () => {
    setIsLoadingMsisdn(true);
    setLoadError(null);
    try {
      const res = await api.getMyMsisdn();
      setPrimaryMsisdn(res.data);
      if (!res.data.msisdn && res.data.reason) {
        setLoadError({ kind: 'no_number', message: res.data.reason });
      }
    } catch (err) {
      const status = err.response?.status;
      let kind = 'unknown';
      let message = 'Could not fetch your M-Pesa number.';

      if (status === 401) {
        kind = 'unauthorized';
        message = 'Your session has expired. Please log in again.';
      } else if (status === 404) {
        kind = 'not_found';
        message = 'The M-Pesa endpoint is not available. Contact support.';
      } else if (status === 500) {
        kind = 'server_error';
        message = 'Server error while loading your number. Try again or contact support.';
      } else if (!err.response) {
        kind = 'network';
        message = 'Cannot reach the server. Check your connection.';
      } else if (err.response?.data?.detail) {
        message = err.response.data.detail;
      }

      setLoadError({ kind, message });
      setPrimaryMsisdn({
        msisdn: null,
        verified: false,
        display: null,
        reason: message,
      });
    } finally {
      setIsLoadingMsisdn(false);
    }
  };

  useEffect(() => {
    loadMsisdn();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleRequestOtp = async () => {
    setVerifyStatus('sending');
    setVerifyError('');
    try {
      await api.requestMsisdnVerification();
      setVerifyStatus('sent');
      setResendCooldown(30);
    } catch (err) {
      setVerifyStatus('idle');
      setVerifyError(
        err.response?.data?.detail || 'Could not send verification code. Try again.'
      );
    }
  };

  const handleConfirmOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setVerifyError('Enter the 6-digit code.');
      return;
    }
    setVerifyStatus('confirming');
    setVerifyError('');
    try {
      const res = await api.confirmMsisdnVerification(otp);
      if (res.data.verified) {
        setVerifyStatus('verified');
        await loadMsisdn();
        setTimeout(() => {
          setShowVerifyModal(false);
          setVerifyStatus('idle');
          setOtp('');
        }, 1200);
      }
    } catch (err) {
      setVerifyStatus('sent');
      setVerifyError(err.response?.data?.detail || 'Invalid code. Try again.');
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!primaryMsisdn?.msisdn) {
      setErrorMsg(primaryMsisdn?.reason || 'No M-Pesa number linked to your account.');
      return;
    }
    if (!primaryMsisdn.verified) {
      setShowVerifyModal(true);
      return;
    }
    const amountMinor = Math.round(Number(amount) * 100);
    if (!amountMinor || amountMinor < 200) {
      setErrorMsg('Minimum contribution is KSh 2.00');
      return;
    }
    setStatus('processing');
    setErrorMsg('');
    try {
      const res = await api.initiateContribution({ amount_minor: amountMinor });
      setResponse(res.data);
      setStatus('success');
      loadMsisdn();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || 'Could not reach M-Pesa. Please try again.');
    }
  };

  if (status === 'success' && response) {
    const isConfirmed = response.status === 'CONFIRMED';
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-4 py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isConfirmed ? 'Contribution Confirmed!' : 'Check Your Phone'}
        </h2>
        <p className="text-gray-500 text-sm max-w-xs">
          {isConfirmed
            ? `KSh ${Number(amount).toFixed(2)} has been recorded in your ledger.`
            : response.customer_message || 'Enter your M-Pesa PIN to complete this contribution.'}
        </p>
        <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-100 text-left mt-4 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Reference</span>
            <span className="font-mono font-bold text-gray-900">{response.internal_ref}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">M-Pesa Number</span>
            <span className="font-bold text-gray-900">{primaryMsisdn?.display}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-gray-900">KSh {Number(amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Status</span>
            <span className={`font-bold ${isConfirmed ? 'text-green-600' : 'text-amber-600'}`}>
              {response.status}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard/contributions')}
          className="mt-6 bg-[#dc2626] text-white px-8 py-3 rounded-xl font-bold text-sm w-full hover:bg-[#b91c1c] transition-colors"
        >
          View Contribution History
        </button>
        <button
          onClick={() => {
            setStatus('idle');
            setAmount('2');
            setResponse(null);
          }}
          className="mt-2 text-gray-500 text-sm font-medium hover:underline"
        >
          Contribute again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-6 pb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Make a Contribution</h2>
          <p className="text-sm text-gray-500 mt-1">
            Contributions are made from the M-Pesa number registered to your account.
          </p>
        </div>

        <form
          onSubmit={handleContribute}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">M-Pesa Number</label>
              <button
                type="button"
                onClick={loadMsisdn}
                disabled={isLoadingMsisdn}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingMsisdn ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {isLoadingMsisdn ? (
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ) : primaryMsisdn?.msisdn ? (
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-gray-200">
                    <Phone className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 tracking-wide">
                      {primaryMsisdn.display}
                    </p>
                    <p className="text-[10px] mt-0.5">
                      {primaryMsisdn.verified ? (
                        <span className="text-green-600 font-semibold">● Verified</span>
                      ) : (
                        <span className="text-amber-600 font-semibold">● Not yet verified</span>
                      )}
                    </p>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            ) : (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{primaryMsisdn?.reason || 'No primary M-Pesa number found.'}</p>
                  {loadError?.kind === 'unauthorized' && (
                    <button
                      onClick={() => {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/#/login';
                      }}
                      className="mt-2 text-[#dc2626] font-bold underline"
                    >
                      Log in again
                    </button>
                  )}
                </div>
              </div>
            )}

            {primaryMsisdn?.msisdn && !primaryMsisdn.verified && (
              <button
                type="button"
                onClick={() => {
                  setShowVerifyModal(true);
                  if (verifyStatus === 'idle') handleRequestOtp();
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-bold text-[#dc2626] hover:bg-[#fef2f2] py-2 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Verify this number now
              </button>
            )}

            <p className="text-[10px] text-gray-400 mt-2">
              This is the number you registered with. To change it, contact support to start a
              verification process.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select</label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`py-2 rounded-xl text-sm font-bold border transition-colors ${
                    amount === val.toString()
                      ? 'bg-[#fef2f2] border-[#dc2626] text-[#dc2626]'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  KSh {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 font-bold">
                KSh
              </span>
              <input
                type="number"
                min="2"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={status === 'processing'}
                required
                className="block w-full pl-14 pr-4 py-4 text-2xl font-bold border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] focus:border-[#dc2626] bg-white text-gray-900 disabled:bg-gray-50"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Minimum contribution is KSh 2.00</p>
          </div>

          <div className="bg-[#fef2f2] rounded-xl p-4 border border-[#fee2e2] flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-[#fee2e2]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#dc2626]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">M-Pesa STK Push</p>
              <p className="text-xs text-gray-600 mt-1">
                You will receive a prompt on your phone to enter your M-Pesa PIN.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl flex items-start gap-2 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'processing' || !primaryMsisdn?.msisdn || !primaryMsisdn?.verified}
            className={`w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-sm text-sm font-bold text-white transition-colors ${
              status === 'processing' || !primaryMsisdn?.msisdn || !primaryMsisdn?.verified
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#dc2626] hover:bg-[#b91c1c]'
            }`}
          >
            {status === 'processing'
              ? 'Contacting M-Pesa...'
              : !primaryMsisdn?.msisdn
              ? 'No M-Pesa number on file'
              : !primaryMsisdn?.verified
              ? 'Verify your M-Pesa number first'
              : `Pay KSh ${amount}`}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Secured by Safaricom M-Pesa</span>
          </div>
        </form>
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#dc2626]" />
                Verify M-Pesa Number
              </h3>
              <button
                onClick={() => {
                  setShowVerifyModal(false);
                  setOtp('');
                  setVerifyError('');
                  setVerifyStatus('idle');
                }}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                Close
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">
                We sent a 6-digit code to{' '}
                <span className="font-bold text-gray-900">{primaryMsisdn?.display}</span>.
                Enter it below.
              </p>

              {verifyStatus === 'verified' ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-green-700">
                    M-Pesa number verified successfully!
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You can now make contributions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmOtp} className="space-y-4">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="block w-full text-center text-2xl font-bold tracking-[0.5em] px-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] focus:border-[#dc2626] bg-white"
                    autoFocus
                  />

                  {verifyError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>{verifyError}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={otp.length !== 6 || verifyStatus === 'confirming'}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-colors ${
                        otp.length !== 6 || verifyStatus === 'confirming'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#dc2626] hover:bg-[#b91c1c]'
                      }`}
                    >
                      {verifyStatus === 'confirming' ? 'Verifying...' : 'Confirm Code'}
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={resendCooldown > 0 || verifyStatus === 'sending'}
                      className="px-4 py-3 rounded-xl text-sm font-bold text-[#dc2626] hover:bg-[#fef2f2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {resendCooldown > 0 ? `${resendCooldown}s` : 'Resend'}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-gray-400">
                    Check your Django terminal for the OTP in development mode.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contribute;
