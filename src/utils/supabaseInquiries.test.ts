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
