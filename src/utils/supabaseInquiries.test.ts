import test from 'node:test';
import assert from 'node:assert/strict';
import {
  submitInquiry,
  fetchInquiries,
  fetchInquiryStats,
  updateInquiryStatus,
  checkIsAdmin,
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

  assert.ok(stats.total >= 4);
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

test('checkIsAdmin authorizes the primary administrator email', async () => {
  const adminUser = {
    id: 'user-primary-admin',
    email: 'mahdxasan0062z@gmail.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as any;

  const isAuthorized = await checkIsAdmin(adminUser);
  assert.equal(isAuthorized, true);

  const regularUser = {
    id: 'user-random-visitor',
    email: 'visitor@unknown.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as any;

  const isRegularAuthorized = await checkIsAdmin(regularUser);
  assert.equal(isRegularAuthorized, false);
});
