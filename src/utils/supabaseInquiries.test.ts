import test from 'node:test';
import assert from 'node:assert/strict';
import {
  submitInquiry,
  fetchInquiries,
  fetchInquiryStats,
  updateInquiryStatus,
  checkIsAdmin,
  filterAndSortInquiries,
  sendLeadSubmission,
} from '../lib/supabase.ts';

test('submitInquiry records valid customer inquiries', async () => {
  const result = await submitInquiry({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    phone: '+252 63 999 8888',
    inquiry_subject: 'Laas Geel Prehistoric Tour',
    message: 'Looking for a private 3-day excursion to the cave shelters.',
  });

  assert.equal(result.success, true);
  assert.ok(result.data?.id);
  assert.equal(result.data?.status, 'New');
  assert.equal(result.data?.name, 'Sarah Connor');
});

test('fetchInquiryStats returns correct counts across statuses', async () => {
  const stats = await fetchInquiryStats();

  assert.ok(stats.total >= 1);
  assert.ok(typeof stats.newCount === 'number');
  assert.ok(typeof stats.inProgressCount === 'number');
  assert.ok(typeof stats.repliedCount === 'number');
  assert.ok(typeof stats.closedCount === 'number');
  assert.equal(
    stats.total,
    stats.newCount + stats.inProgressCount + stats.repliedCount + stats.closedCount
  );
});

test('updateInquiryStatus updates an existing inquiry status', async () => {
  const { inquiries } = await fetchInquiries({ status: 'All' });
  assert.ok(inquiries.length > 0);
  const target = inquiries[0];

  const updateResult = await updateInquiryStatus(target.id, 'Replied');
  assert.equal(updateResult.success, true);

  const { inquiries: updatedList } = await fetchInquiries({ status: 'All' });
  const updatedItem = updatedList.find((i) => i.id === target.id);
  assert.equal(updatedItem?.status, 'Replied');
});

test('checkIsAdmin authorizes both mahdxasan0062@gmail.com and mahdxasan0062z@gmail.com', async () => {
  const adminUserZ = {
    id: 'user-primary-admin-z',
    email: 'mahdxasan0062z@gmail.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as any;

  assert.equal(await checkIsAdmin(adminUserZ), true);

  const adminUserNoZ = {
    id: 'user-primary-admin-no-z',
    email: 'mahdxasan0062@gmail.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as any;

  assert.equal(await checkIsAdmin(adminUserNoZ), true);

  const regularUser = {
    id: 'user-random-visitor',
    email: 'visitor@unknown.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as any;

  assert.equal(await checkIsAdmin(regularUser), false);
});

test('fetchInquiries retrieves the real existing inquiry cb85fbb8-9775-4835-84f2-219868af9c77', async () => {
  const { inquiries } = await fetchInquiries({ status: 'All' });
  const found = inquiries.find((i) => i.id === 'cb85fbb8-9775-4835-84f2-219868af9c77');
  assert.ok(found, 'Existing customer inquiry must be present');
  assert.equal(found?.name, 'Xaawa is maacil');
  assert.equal(found?.inquiry_subject, 'Sanaag');
  assert.equal(found?.message, 'Thanks again 👍');
});

test('filterAndSortInquiries filters by status, search term, and sorts newest/oldest', () => {
  const sample = [
    {
      id: '1',
      name: 'Alpha Guest',
      email: 'alpha@example.com',
      phone: '+252631111111',
      inquiry_subject: 'Berbera Tour',
      message: 'Beach inquiry details',
      status: 'New' as const,
      created_at: '2026-01-01T10:00:00.000Z',
      updated_at: '2026-01-01T10:00:00.000Z',
    },
    {
      id: '2',
      name: 'Beta Guest',
      email: 'beta@example.com',
      phone: '+252632222222',
      inquiry_subject: 'Laas Geel Tour',
      message: 'Rock art permits',
      status: 'Replied' as const,
      created_at: '2026-02-01T10:00:00.000Z',
      updated_at: '2026-02-01T10:00:00.000Z',
    },
    {
      id: '3',
      name: 'Gamma Guest',
      email: 'gamma@example.com',
      phone: '+252633333333',
      inquiry_subject: 'Daallo Forest',
      message: 'Mountain camping',
      status: 'New' as const,
      created_at: '2026-03-01T10:00:00.000Z',
      updated_at: '2026-03-01T10:00:00.000Z',
    },
  ];

  const onlyNewOldest = filterAndSortInquiries(sample, {
    status: 'New',
    sortBy: 'oldest',
  });
  assert.equal(onlyNewOldest.length, 2);
  assert.equal(onlyNewOldest[0].id, '1');
  assert.equal(onlyNewOldest[1].id, '3');

  const searchResult = filterAndSortInquiries(sample, {
    status: 'All',
    search: 'rock art',
    sortBy: 'newest',
  });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, '2');
});

test('sendLeadSubmission saves lead inquiries cleanly when offline', async () => {
  const result = await sendLeadSubmission({
    name: 'Booking Tester',
    email: 'booking@example.com',
    phone: '+252 63 555 1234',
    inquiry_subject: '[Booking HEX-31OCT26-1001] Somaliland Grand Discovery Tour',
    message: 'Departure: 31-Oct-2026 | Adults: 2 | Total: $700',
  });

  assert.equal(result.success, true);
  assert.equal(result.dbSaved, true);
  assert.equal(result.data?.name, 'Booking Tester');
});
