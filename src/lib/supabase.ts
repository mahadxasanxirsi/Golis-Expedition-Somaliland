import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Environment variables for Supabase (safe for both Vite and Node.js test runner)
const env = (import.meta as any)?.env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('YOUR_SUPABASE')
);

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export type InquiryStatus = 'New' | 'In Progress' | 'Replied' | 'Closed';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry_subject: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface InquiryStats {
  total: number;
  newCount: number;
  inProgressCount: number;
  repliedCount: number;
  closedCount: number;
}

// Local storage fallback key for offline demonstration / before live credentials are bound
const LOCAL_INQUIRIES_KEY = 'golis_supabase_inquiries_cache';

const INITIAL_LOCAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-001',
    name: 'Cabdi Salaan',
    email: 'cabdi.salaan@example.so',
    phone: '+252 63 442 1189',
    inquiry_subject: 'Saahil & Berbera Coast Tour',
    message: 'Hello Golis team, we are a family of 4 planning a 5-day private excursion to the Saahil coast and Sheikh mountains next month. Please send pricing and availability.',
    status: 'New',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'inq-002',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@travelhorn.com',
    phone: '+252 63 699 1234',
    inquiry_subject: 'Berbera Tour Logistics & SPU Escort',
    message: 'We are organizing an investment delegation to Berbera port and require 4WD vehicles with verified SPU ministerial escort for 3 days.',
    status: 'Replied',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'inq-003',
    name: 'Mohamed Hassan',
    email: 'mohamed.hassan@heritage.org',
    phone: '+252 63 411 9900',
    inquiry_subject: 'Somaliland Grand Tour & Laas Geel',
    message: 'Interested in the 7-day archaeological expedition covering Laas Geel and Zeila ancient ruins. Do you arrange airport pick-up at Egal International Airport (HGA)?',
    status: 'In Progress',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'inq-004',
    name: 'Dr. Marian Egal',
    email: 'marian.egal@archaeology-uk.org',
    phone: '+44 7911 882233',
    inquiry_subject: 'Daallo Cloud Forest & Mt Shimbiris Trek',
    message: 'Research expedition to the Sanaag highlands and Maydi frankincense groves. Need veteran guides and high clearance 4x4 Land Cruisers.',
    status: 'Closed',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Memory fallback when running outside browser environment (e.g. Node.js unit tests)
let memoryInquiriesStore: Inquiry[] | null = null;

function getLocalInquiries(): Inquiry[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    if (!memoryInquiriesStore) {
      memoryInquiriesStore = [...INITIAL_LOCAL_INQUIRIES];
    }
    return memoryInquiriesStore;
  }
  try {
    const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(INITIAL_LOCAL_INQUIRIES));
      return INITIAL_LOCAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOCAL_INQUIRIES;
  }
}

function saveLocalInquiries(inquiries: Inquiry[]) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    memoryInquiriesStore = inquiries;
    return;
  }
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch (err) {
    console.error('Failed to save inquiries to local storage:', err);
  }
}

/**
 * Inserts a new customer inquiry into Supabase
 */
export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  inquiry_subject: string;
  message: string;
}): Promise<{ success: boolean; data?: Inquiry; error?: string }> {
  const sanitized = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    inquiry_subject: data.inquiry_subject.trim(),
    message: data.message.trim(),
    status: 'New' as InquiryStatus,
  };

  // Always mirror in local storage so administrator sees it immediately in preview
  const localNew: Inquiry = {
    ...sanitized,
    id: `inq-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const locals = getLocalInquiries();
  saveLocalInquiries([localNew, ...locals]);

  if (isSupabaseConfigured) {
    try {
      const { data: inserted, error } = await supabase
        .from('inquiries')
        .insert([sanitized])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning:', error.message);
        return { success: true, data: localNew };
      }
      return { success: true, data: inserted as Inquiry };
    } catch (err) {
      console.warn('Supabase submission network error:', err);
      return { success: true, data: localNew };
    }
  }

  return { success: true, data: localNew };
}

/**
 * Fetches all inquiries with search, filter, and sorting
 */
export async function fetchInquiries(options?: {
  search?: string;
  status?: string;
  sortBy?: 'newest' | 'oldest';
}): Promise<{ inquiries: Inquiry[]; error?: string }> {
  const { search = '', status = 'All', sortBy = 'newest' } = options || {};

  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('inquiries').select('*');

      if (status && status !== 'All') {
        query = query.eq('status', status);
      }

      if (search.trim()) {
        const s = search.trim();
        query = query.or(
          `name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,inquiry_subject.ilike.%${s}%`
        );
      }

      query = query.order('created_at', { ascending: sortBy === 'oldest' });

      const { data, error } = await query;

      if (!error && data) {
        return { inquiries: data as Inquiry[] };
      }
      console.warn('Supabase query error, falling back to cached inquiries:', error?.message);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local cache:', err);
    }
  }

  // Local filtered fallback
  let list = getLocalInquiries();

  if (status && status !== 'All') {
    list = list.filter((item) => item.status.toLowerCase() === status.toLowerCase());
  }

  if (search.trim()) {
    const s = search.toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.phone.toLowerCase().includes(s) ||
        item.inquiry_subject.toLowerCase().includes(s) ||
        item.message.toLowerCase().includes(s)
    );
  }

  list.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortBy === 'oldest' ? timeA - timeB : timeB - timeA;
  });

  return { inquiries: list };
}

/**
 * Updates status of an inquiry in Supabase
 */
export async function updateInquiryStatus(
  id: string,
  newStatus: InquiryStatus
): Promise<{ success: boolean; error?: string }> {
  // Update local storage
  const locals = getLocalInquiries().map((inq) =>
    inq.id === id ? { ...inq, status: newStatus, updated_at: new Date().toISOString() } : inq
  );
  saveLocalInquiries(locals);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  return { success: true };
}

/**
 * Computes dashboard statistics from inquiries
 */
export async function fetchInquiryStats(): Promise<InquiryStats> {
  const { inquiries } = await fetchInquiries({ status: 'All' });

  return {
    total: inquiries.length,
    newCount: inquiries.filter((i) => i.status === 'New').length,
    inProgressCount: inquiries.filter((i) => i.status === 'In Progress').length,
    repliedCount: inquiries.filter((i) => i.status === 'Replied').length,
    closedCount: inquiries.filter((i) => i.status === 'Closed').length,
  };
}

/**
 * Verifies if an authenticated user is on the database admin allowlist
 */
export async function checkIsAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  // The primary authorized administrator email
  const PRIMARY_ADMIN_EMAIL = 'mahdxasan0062z@gmail.com';
  if (user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return true;
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle();

      if (!error && data) {
        return true;
      }
    } catch (err) {
      console.warn('Admin check error:', err);
    }
  }

  return false;
}
