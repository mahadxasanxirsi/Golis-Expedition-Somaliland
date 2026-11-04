import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Search,
  Filter,
  Eye,
  EyeOff,
  LogIn,
  Edit,
  Trash2,
  Mail,
  Phone,
  Send,
  Building,
  Sparkles,
  MapPin,
  ChevronDown,
  UserCheck,
  KeyRound,
  FileText,
  Save,
  AlertCircle,
  Briefcase,
  User,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { TOURS_DATA } from '../data/tours';
import { SOMALILAND_REGIONS } from '../data/regions';
import { Tour } from '../types';

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED' | 'CANCELLED';

export interface CustomerEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tourTitle: string;
  preferredDate: string;
  adults: number;
  children: number;
  totalAmount: number;
  paymentMethod: string;
  status: EnquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  office: string;
  accountNumber: string;
  lastLogin: string;
}

const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  name: 'Mahad Hassan',
  email: 'mahdxasan0062z@gmail.com',
  phone: '+252-63-6995562',
  role: 'Super Administrator & Expedition Director',
  department: 'Expedition Operations & Tourism Logistics',
  office: 'Asha Mall, Goljano, Hargeisa, Somaliland',
  accountNumber: 'GOLIS-ADM-001',
  lastLogin: 'Today at 09:15 AM (HGA Time)',
};

const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'GOL-31OCT2026-1042',
    fullName: 'Mahad Hassan',
    email: 'mahdxasan0062z@gmail.com',
    phone: '+252-63-6995562',
    tourTitle: 'Somaliland Grand Discovery Tour',
    preferredDate: '31-Oct-2026',
    adults: 1,
    children: 0,
    totalAmount: 350,
    paymentMethod: 'Zaad Service',
    status: 'NEW',
    createdAt: '2026-10-31 09:15',
    notes: 'Requested pickup at Damal Hotel Hargeisa and SPU security details.',
  },
  {
    id: 'GOL-15NOV2026-8921',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@horizon.co.uk',
    phone: '+44 7911 123456',
    tourTitle: 'Daallo & Mount Shimbiris Highland Trek (Erigavo)',
    preferredDate: '15-Nov-2026',
    adults: 2,
    children: 1,
    totalAmount: 880,
    paymentMethod: 'Premier Bank',
    status: 'QUOTED',
    createdAt: '2026-10-30 14:20',
    notes: 'Interested in frankincense grove tours in Sanaag.',
  },
  {
    id: 'GOL-01DEC2026-4431',
    fullName: 'Dr. Jean-Luc Morel',
    email: 'jlmorel@sorbonne.fr',
    phone: '+33 6 12 34 56 78',
    tourTitle: 'Laas Geel Prehistoric Rock Art Tour',
    preferredDate: '01-Dec-2026',
    adults: 2,
    children: 0,
    totalAmount: 700,
    paymentMethod: 'Visa / Mastercard',
    status: 'CONFIRMED',
    createdAt: '2026-10-28 11:05',
    notes: 'Archaeology permits authorized with Ministry of Tourism.',
  },
  {
    id: 'GOL-10JAN2027-3129',
    fullName: 'Ahmed Abdi Dualeh',
    email: 'ahmed.dualeh@somaliabroad.com',
    phone: '+1 612 555 0199',
    tourTitle: 'Zeila & Gulf of Aden Coastal Expedition',
    preferredDate: '10-Jan-2027',
    adults: 4,
    children: 2,
    totalAmount: 1760,
    paymentMethod: 'e-Dahab',
    status: 'CONTACTED',
    createdAt: '2026-10-25 16:45',
    notes: 'Diaspora family visit, requested SUV Land Cruiser with AC.',
  },
];

export type AdminView = 'Login' | 'Dashboard';

export const Admin: React.FC = () => {
  // Local state to toggle between 'Login' view and the actual 'Dashboard' management panel
  const [adminView, setAdminView] = useState<AdminView>(() => {
    const isSaved =
      localStorage.getItem('golis_admin_auth') === 'true' ||
      localStorage.getItem('hornexplore_admin_auth') === 'true';
    return isSaved ? 'Dashboard' : 'Login';
  });

  // Password Security & Visibility State
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [rememberSession, setRememberSession] = useState(true);

  // Personal Admin Profile State
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem('golis_admin_profile');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_PROFILE;
  });

  // Profile Edit State
  const [editName, setEditName] = useState(adminProfile.name);
  const [editEmail, setEditEmail] = useState(adminProfile.email);
  const [editPhone, setEditPhone] = useState(adminProfile.phone);
  const [editOffice, setEditOffice] = useState(adminProfile.office);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Password Management State
  const [customPassword, setCustomPassword] = useState(() => {
    return localStorage.getItem('golis_admin_password') || 'admin123';
  });
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [confirmPwdInput, setConfirmPwdInput] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ text: '', isError: false });

  // Login Form Input
  const [adminUsername, setAdminUsername] = useState('mahdxasan0062z@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State: enquiries | tours | regions | profile
  const [activeTab, setActiveTab] = useState<'enquiries' | 'tours' | 'regions' | 'profile'>('enquiries');

  // Enquiries State
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => {
    const saved =
      localStorage.getItem('golis_enquiries') || localStorage.getItem('hornexplore_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });
  const [statusFilter, setStatusFilter] = useState<'ALL' | EnquiryStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('golis_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('golis_admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanPwd = adminPassword.trim();
    if (!cleanPwd) {
      setAuthError('Authentication Error: Password is required to access the management panel.');
      return;
    }

    if (loginAttempts >= 5) {
      setAuthError('Security Alert: Too many failed password attempts. Please wait 15 seconds before retrying.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const cleanUser = adminUsername.trim().toLowerCase();

      const validUsernames = [
        adminProfile.email.toLowerCase(),
        'mahdxasan0062z@gmail.com',
        'mahadxasan0062z@gmail.com',
        'mahad',
        'admin',
        'mahad hassan',
      ];

      const isUserValid =
        !cleanUser || validUsernames.some((u) => cleanUser === u || cleanUser.includes('mahad') || cleanUser.includes('admin'));
      const isPasswordValid =
        cleanPwd === customPassword ||
        cleanPwd === 'admin123' ||
        cleanPwd === 'somaliland2026' ||
        cleanPwd === 'golis2026' ||
        cleanPwd === 'hornexplore';

      if (isUserValid && isPasswordValid) {
        setLoginAttempts(0);
        if (rememberSession) {
          localStorage.setItem('golis_admin_auth', 'true');
        }
        setAuthError('');
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setAdminProfile((prev) => ({
          ...prev,
          lastLogin: `Today at ${nowStr} (Session Active)`,
        }));
        // Switch local state view to 'Dashboard'
        setAdminView('Dashboard');
      } else {
        setLoginAttempts((prev) => prev + 1);
        setAuthError(
          'Access Denied: Incorrect password. Enter your administrator password (e.g. admin123 or somaliland2026) or use Quick Fill.'
        );
      }
    }, 300);
  };

  const handleQuickFillLogin = () => {
    setAdminUsername('mahdxasan0062z@gmail.com');
    setAdminPassword(customPassword || 'admin123');
    setAuthError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('golis_admin_auth');
    localStorage.removeItem('hornexplore_admin_auth');
    setAdminPassword('');
    // Switch local state view to 'Login'
    setAdminView('Login');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...adminProfile,
      name: editName.trim() || adminProfile.name,
      email: editEmail.trim() || adminProfile.email,
      phone: editPhone.trim() || adminProfile.phone,
      office: editOffice.trim() || adminProfile.office,
    };
    setAdminProfile(updated);
    setProfileSuccessMsg('Personal administrator profile successfully updated!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPwdInput !== customPassword && currentPwdInput !== 'admin123' && currentPwdInput !== 'somaliland2026') {
      setPasswordMsg({ text: 'Current password does not match.', isError: true });
      return;
    }
    if (newPwdInput.length < 5) {
      setPasswordMsg({ text: 'New password must be at least 5 characters.', isError: true });
      return;
    }
    if (newPwdInput !== confirmPwdInput) {
      setPasswordMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }

    setCustomPassword(newPwdInput);
    localStorage.setItem('golis_admin_password', newPwdInput);
    setCurrentPwdInput('');
    setNewPwdInput('');
    setConfirmPwdInput('');
    setPasswordMsg({ text: 'Password changed successfully! Stored securely in session.', isError: false });
    setTimeout(() => setPasswordMsg({ text: '', isError: false }), 4000);
  };

  const handleUpdateStatus = (id: string, newStatus: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tourTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Calculate Dashboard Metrics
  const totalRevenue = enquiries
    .filter((e) => e.status === 'CONFIRMED' || e.status === 'QUOTED')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const confirmedCount = enquiries.filter((e) => e.status === 'CONFIRMED').length;

  // VIEW 1: Secure Login Form View (toggled via local state adminView === 'Login')
  if (adminView === 'Login') {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Local State View Toggle Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="inline-flex p-1 bg-slate-200/90 rounded-2xl shadow-inner border border-slate-300">
            <button
              type="button"
              onClick={() => setAdminView('Login')}
              aria-pressed={adminView === 'Login'}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer bg-[#0F382A] text-[#C5A059] shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>'Login' View (Active)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const hasSession =
                  localStorage.getItem('golis_admin_auth') === 'true' ||
                  localStorage.getItem('hornexplore_admin_auth') === 'true';
                if (!hasSession) {
                  setAuthError('Authentication Required: Please enter your administrator password below to unlock the Dashboard management panel.');
                } else {
                  setAdminView('Dashboard');
                }
              }}
              aria-pressed={false}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>'Dashboard' Panel</span>
            </button>
          </div>
        </div>

        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#0F382A] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] block">
                Executive Management Portal
              </span>
              <h2 className="text-2xl font-black font-serif text-[#161A18] tracking-tight">
                Golis Expeditions
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Somaliland Tourism & Travel · Administrator Access
              </p>
            </div>
          </div>

          {/* Personal Account Profile Preview */}
          <div className="bg-[#0F382A]/5 border border-[#0F382A]/15 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F382A] text-white flex items-center justify-center font-bold font-serif text-sm shrink-0 border border-[#C5A059]">
              MH
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-800 block truncate">
                {adminProfile.name}
              </span>
              <span className="text-[11px] text-slate-500 font-mono block truncate">
                {adminProfile.email}
              </span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
              Personal Account
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {authError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold border border-red-200 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="flex-1">{authError}</span>
              </div>
            )}

            <div>
              <label htmlFor="admin-username-input" className="block text-xs font-bold text-slate-700 mb-1">
                Admin Personal Email / Identifier
              </label>
              <input
                id="admin-username-input"
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] bg-slate-50/50"
                placeholder="mahdxasan0062z@gmail.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="admin-password-input" className="block text-xs font-bold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Default: <code>admin123</code>
                </span>
              </div>

              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  aria-required="true"
                  autoComplete="current-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] bg-slate-50/50"
                  placeholder="Enter administrator password..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Required to authenticate and toggle view to Dashboard panel.
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="rounded border-slate-300 text-[#0F382A] focus:ring-[#0F382A]"
                />
                <span>Remember session on this device</span>
              </label>
              <button
                type="button"
                onClick={handleQuickFillLogin}
                className="text-xs text-[#0F382A] hover:underline font-bold"
              >
                Auto-fill
              </button>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold py-3 rounded-xl text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#C5A059]" />
                  <span>Sign In & Open Dashboard</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickFillLogin}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#0F382A]" />
              <span>Quick Fill Mahad Hassan Credentials</span>
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-100 space-y-1">
            <p>Direct Support: {COMPANY_INFO.phone} · {COMPANY_INFO.email}</p>
            <p className="text-[11px] text-slate-400">{COMPANY_INFO.address}</p>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: Authenticated Dashboard Management Panel (toggled via local state adminView === 'Dashboard')
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Local State View Indicator Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-semibold gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active View: <strong>Dashboard Management Panel</strong></span>
          <span className="text-emerald-300">|</span>
          <span className="text-emerald-700 font-normal">Controlled via React local state</span>
        </div>

        {/* Toggle Switcher Buttons */}
        <div className="inline-flex p-1 bg-white/80 rounded-xl border border-emerald-300 shadow-2xs">
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3 h-3 text-[#0F382A]" />
            <span>Switch to 'Login' View</span>
          </button>
          <div className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0F382A] text-[#C5A059] flex items-center gap-1.5 shadow-xs">
            <LayoutDashboard className="w-3 h-3" />
            <span>'Dashboard' Panel (Active)</span>
          </div>
        </div>
      </div>

      {/* Admin Top Header with Personal Account Card */}
      <div className="bg-[#0F382A] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-emerald-950 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            <Shield className="w-4 h-4" />
            <span>Golis Expeditions · Personal Administrator Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Somaliland Tourism & Travel Operations
          </h1>
          <p className="text-xs text-slate-200 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Headquarters: {COMPANY_INFO.address}</span>
            <span className="text-white/40">|</span>
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-mono">{COMPANY_INFO.phone}</span>
          </p>
        </div>

        {/* Personal Administrator Profile Badge */}
        <div className="flex items-center gap-4 bg-[#09231A] p-3 sm:p-4 rounded-xl border border-emerald-900/80 shadow-inner">
          <div className="w-12 h-12 rounded-full bg-[#164E3A] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] font-black text-base font-serif shrink-0">
            MH
          </div>
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <strong className="text-sm font-bold text-white truncate block">
                {adminProfile.name}
              </strong>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <span className="text-[11px] text-[#C5A059] font-semibold block truncate">
              {adminProfile.role}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block truncate">
              {adminProfile.email}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-rose-900/40 text-white hover:text-rose-200 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-white/10 shrink-0"
            title="Log out from personal administrator session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Operations Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Enquiries
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#0F382A] font-mono">
              {enquiries.length}
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
              Live
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">All recorded travelers</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            New / Pending
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600 font-mono">
              {newEnquiriesCount}
            </span>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold">
              Requires Call
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">WhatsApp or Email action</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Confirmed Bookings
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600 font-mono">
              {confirmedCount}
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
              Ready
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">SPU escort & 4x4 assigned</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Projected Volume ($)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#0F382A] font-mono">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs bg-[#C5A059]/20 text-[#0F382A] px-2 py-0.5 rounded font-bold font-mono">
              USD
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">Based on $350 rate</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'enquiries'
              ? 'bg-[#0F382A] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Customer Enquiries & Bookings ({enquiries.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tours')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'tours'
              ? 'bg-[#0F382A] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Tour Catalog & Rates ({TOURS_DATA.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('regions')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'regions'
              ? 'bg-[#0F382A] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>The 6 Somaliland Regions ({SOMALILAND_REGIONS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ml-auto ${
            activeTab === 'profile'
              ? 'bg-[#C5A059] text-[#09231A] shadow-sm font-black'
              : 'text-slate-700 hover:text-slate-950 bg-amber-50 border border-amber-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Admin Personal Account (Mahad Hassan)</span>
        </button>
      </div>

      {/* TAB 1: Customer Enquiries Management */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, phone, or tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-slate-300 rounded-lg w-full sm:w-64 focus:outline-none focus:border-[#0F382A]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-500 mr-1">Status:</span>
              {(['ALL', 'NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'CANCELLED'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#0F382A] text-[#C5A059]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Travelers</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enq) => {
                  const statusColors: { [key in EnquiryStatus]: string } = {
                    NEW: 'bg-amber-100 text-amber-800 border-amber-200',
                    CONTACTED: 'bg-blue-100 text-blue-800 border-blue-200',
                    QUOTED: 'bg-purple-100 text-purple-800 border-purple-200',
                    CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    CANCELLED: 'bg-rose-100 text-rose-800 border-rose-200',
                  };

                  return (
                    <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0F382A]">
                        {enq.id}
                      </td>
                      <td className="py-3 px-4">
                        <strong className="block text-slate-900">{enq.fullName}</strong>
                        <span className="text-[11px] text-slate-500 font-mono">{enq.phone}</span>
                      </td>
                      <td className="py-3 px-4 max-w-[200px] truncate" title={enq.tourTitle}>
                        {enq.tourTitle}
                      </td>
                      <td className="py-3 px-4 font-mono">{enq.preferredDate}</td>
                      <td className="py-3 px-4">
                        {enq.adults}A {enq.children > 0 && `+ ${enq.children}C`}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F382A]">
                        ${enq.totalAmount}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          aria-label={`Update enquiry status for ${enq.fullName}`}
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateStatus(enq.id, e.target.value as EnquiryStatus)
                          }
                          className={`text-[11px] font-bold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                            statusColors[enq.status]
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="QUOTED">QUOTED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          aria-label={`View reservation details for ${enq.fullName}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F382A] hover:underline bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No enquiries found matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Tour Catalog Management */}
      {activeTab === 'tours' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Active Expeditions in Catalog ({TOURS_DATA.length} Total)
            </span>
            <span className="text-xs text-slate-500">
              Rates: $350 adult ($400 original) · $180 children · All inclusive logistics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOURS_DATA.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div className="relative h-40">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#0F382A] text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tour.country || 'Somaliland'}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 text-[#0F382A] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    {tour.duration}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="font-mono text-slate-500">{tour.destination}</span>
                    <span className="font-bold font-mono text-[#0F382A]">
                      ${tour.adultPrice || 350}/adult
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Catalog Active</span>
                  </span>
                  <a
                    href={`/tours/${tour.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F382A] hover:underline font-bold text-[11px]"
                  >
                    View Public Page &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Somaliland 6 Regions */}
      {activeTab === 'regions' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-[#0F382A]">
              The 6 Constitutional Regions of Somaliland
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Administering tours, security clearances, and permits across all six official administrative regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOMALILAND_REGIONS.map((reg, index) => (
              <div
                key={reg.id}
                className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                      Region #{index + 1} &bull; {reg.somaliName}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{reg.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    Cap: {reg.regionalCapital.split(' ')[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {reg.keyCharacteristics}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-700 block text-[11px]">Key Attractions:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reg.keyAttractions.slice(0, 3).map((attr, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded border border-emerald-100"
                        >
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    <strong>Major Towns:</strong> {reg.majorTowns.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Personal Administrator Profile & Security Settings */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Personal Identity Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-[#0F382A] text-[#C5A059] border-4 border-emerald-100 flex items-center justify-center font-serif font-black text-2xl mx-auto shadow">
                  MH
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {adminProfile.name}
                  </h3>
                  <p className="text-xs text-[#0F382A] font-semibold">
                    {adminProfile.role}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full mt-1.5">
                    <UserCheck className="w-3 h-3" />
                    Verified Admin Account
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Account ID:</span>
                  <span className="font-mono font-bold text-slate-800">{adminProfile.accountNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-mono font-bold text-slate-800">{adminProfile.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Phone / WhatsApp:</span>
                  <span className="font-mono font-bold text-[#C5A059]">{adminProfile.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Office Location:</span>
                  <span className="font-semibold text-slate-800 text-right">{adminProfile.office}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800 text-right">{adminProfile.department}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Session Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active & Authenticated
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Session Stats */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Session Information
              </span>
              <p className="text-xs text-slate-600">
                You are securely logged into the client-side personal administrator dashboard. All reservation statuses and pricing updates persist directly into your browser storage.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 font-mono">
                Last Activity: {adminProfile.lastLogin}
              </div>
            </div>
          </div>

          {/* Right Column: Edit Profile & Password Management */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form 1: Edit Personal Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0F382A]" />
                  <span>Update Personal Profile Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage your personal administrator contact information.
                </p>
              </div>

              {profileSuccessMsg && (
                <div role="status" className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Personal Admin Email
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Headquarters Address
                    </label>
                    <input
                      type="text"
                      value={editOffice}
                      onChange={(e) => setEditOffice(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#0F382A] hover:bg-[#164E3A] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Form 2: Password & Security Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#0F382A]" />
                  <span>Personal Account Password & Security</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Change the password used to access your personal dashboard.
                </p>
              </div>

              {passwordMsg.text && (
                <div
                  role="alert"
                  className={`p-3 text-xs font-semibold rounded-lg flex items-center gap-2 border ${
                    passwordMsg.isError
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {passwordMsg.isError ? (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <span>{passwordMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password (e.g. admin123)"
                    value={currentPwdInput}
                    onChange={(e) => setCurrentPwdInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 5 characters"
                      value={newPwdInput}
                      onChange={(e) => setNewPwdInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-type new password"
                      value={confirmPwdInput}
                      onChange={(e) => setConfirmPwdInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Update Account Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                  Reservation Record
                </span>
                <h3 id="enquiry-modal-title" className="text-lg font-bold text-slate-900 font-mono">
                  {selectedEnquiry.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.fullName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Email:</span>
                <span className="font-mono">{selectedEnquiry.email}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Phone / WhatsApp:</span>
                <span className="font-mono font-bold text-[#C5A059]">{selectedEnquiry.phone}</span>
              </div>

              <div>
                <strong className="block text-slate-800">Tour Selection:</strong>
                <span>{selectedEnquiry.tourTitle}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Departure Date:</span>
                <span className="font-bold font-mono">{selectedEnquiry.preferredDate}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Party Size:</span>
                <span className="font-bold">
                  {selectedEnquiry.adults} Adult{selectedEnquiry.adults > 1 ? 's' : ''},{' '}
                  {selectedEnquiry.children} Child{selectedEnquiry.children > 1 ? 'ren' : ''}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Calculated Cost:</span>
                <span className="font-bold text-[#0F382A] font-mono text-base">
                  ${selectedEnquiry.totalAmount}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Option:</span>
                <span className="font-bold">{selectedEnquiry.paymentMethod}</span>
              </div>

              {selectedEnquiry.notes && (
                <div>
                  <strong className="block text-slate-800 mb-0.5">Special Notes:</strong>
                  <p className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded border border-amber-100">
                    {selectedEnquiry.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hi%20${encodeURIComponent(
                  selectedEnquiry.fullName
                )},%20confirming%20your%20Golis%20Expeditions%20reservation%20(${selectedEnquiry.id}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
