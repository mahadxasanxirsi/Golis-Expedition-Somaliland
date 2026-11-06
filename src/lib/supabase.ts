import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Environment variables for Supabase (safe for both Vite and Node.js test runner)
const env = (import.meta as any)?.env || {};
const rawSupabaseUrl = env.VITE_SUPABASE_URL || 'https://xxcarxtrjjjzyexljrkr.supabase.co';
const supabaseUrl = rawSupabaseUrl
  .trim()
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

const rawAnonKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.vITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  '';

const supabaseAnonKey = rawAnonKey
  .trim()
  .replace(/^["']|["']$/g, '');

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'your-supabase-anon-key' &&
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

// Authorized administrator emails
export const AUTHORIZED_ADMIN_EMAILS = [
  'mahdxasan0062@gmail.com',
  'mahdxasan0062z@gmail.com',
];

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.some((admin) => admin.toLowerCase() === clean);
}

// Local storage fallback key for offline demonstration / before live credentials are bound
const LOCAL_INQUIRIES_KEY = 'golis_supabase_inquiries_cache';

// Seed containing the real customer inquiry cb85fbb8-9775-4835-84f2-219868af9c77 from Supabase
const INITIAL_LOCAL_INQUIRIES: Inquiry[] = [
  {
    id: 'cb85fbb8-9775-4835-84f2-219868af9c77',
    name: 'Xaawa is maacil',
    email: 'xaawa2z@gmail.com',
    phone: '+252 63 444 3322',
    inquiry_subject: 'Sanaag',
    message: 'Thanks again 👍',
    status: 'New',
    created_at: '2026-03-01T10:15:00.000Z',
    updated_at: '2026-03-01T10:15:00.000Z',
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
      return [...INITIAL_LOCAL_INQUIRIES];
    }
    const parsed = JSON.parse(raw);
    const cleaned = (Array.isArray(parsed) ? parsed : []).filter(
      (inq: any) =>
        inq &&
        !inq.id?.startsWith('inq-00') &&
        inq.name !== 'Cabdi Salaan' &&
        inq.name !== 'Dr. Marian Egal'
    );
    return cleaned.length > 0 ? cleaned : [...INITIAL_LOCAL_INQUIRIES];
  } catch {
    return [...INITIAL_LOCAL_INQUIRIES];
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
 * Uses pure .insert() without .select() because anonymous public visitors
 * have INSERT permissions under Supabase RLS, but do NOT have SELECT permissions.
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

  const createdItem: Inquiry = {
    ...sanitized,
    id: `inq-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      // NOTE: Pure .insert() without .select() or .single()!
      // This is crucial for Supabase RLS: public visitors can insert but cannot read.
      const { error } = await supabase
        .from('inquiries')
        .insert([sanitized]);

      if (error) {
        console.error('Supabase inquiry insert error:', error.message, error.details);
        return { success: false, error: error.message };
      }

      // Mirror in local store for immediate responsiveness
      saveLocalInquiries([createdItem, ...getLocalInquiries()]);
      return { success: true, data: createdItem };
    } catch (err: any) {
      console.error('Supabase submission network error:', err);
      return { success: false, error: err?.message || 'Network error' };
    }
  }

  // Local store when Supabase is offline
  saveLocalInquiries([createdItem, ...getLocalInquiries()]);
  return { success: true, data: createdItem };
}

/**
 * Fetches all inquiries with search, filter, and sorting
 */
export async function fetchInquiries(options?: {
  search?: string;
  status?: string;
  sortBy?: 'newest' | 'oldest';
}): Promise<{ inquiries: Inquiry[]; error?: string; fromLiveSupabase?: boolean }> {
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
          `name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,inquiry_subject.ilike.%${s}%,message.ilike.%${s}%`
        );
      }

      query = query.order('created_at', { ascending: sortBy === 'oldest' });

      const { data, error } = await query;

      if (!error && data) {
        saveLocalInquiries(data as Inquiry[]);
        return { inquiries: data as Inquiry[], fromLiveSupabase: true };
      }
      console.warn('Supabase query error, falling back to cached inquiries:', error?.message);
      return {
        inquiries: getLocalInquiries(),
        error: error?.message || 'Database query returned an error',
        fromLiveSupabase: false,
      };
    } catch (err: any) {
      console.warn('Supabase fetch failed, falling back to local cache:', err);
      return {
        inquiries: getLocalInquiries(),
        error: err?.message || 'Network error connecting to Supabase',
        fromLiveSupabase: false,
      };
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

  // 1. Authorize matching admin emails directly (supports both with and without 'z')
  if (isAuthorizedAdminEmail(user.email)) {
    return true;
  }

  // 2. Check public.admin_users allowlist table
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
