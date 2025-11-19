import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildArticleQuery,
  buildSubscriberQuery,
  buildCalculationQuery,
  buildAuditLogQuery,
} from '../../lib/admin/query';

test('buildArticleQuery encodes filters and stats flag', () => {
  const query = buildArticleQuery({
    page: 2,
    limit: 10,
    includeStats: true,
    status: 'draft',
    category: 'news',
    search: 'roi',
  });

  assert.equal(
    query,
    'page=2&limit=10&stats=true&status=draft&category=news&search=roi'
  );

  const defaultQuery = buildArticleQuery({ page: 1, limit: 20 });
  assert.equal(defaultQuery, 'page=1&limit=20&stats=false');
});

test('buildSubscriberQuery handles optional filters', () => {
  const query = buildSubscriberQuery({
    page: 3,
    limit: 25,
    isConfirmed: 'true',
    search: 'contact@laser',
  });

  assert.equal(
    query,
    'page=3&limit=25&is_confirmed=true&search=contact%40laser'
  );
});

test('buildCalculationQuery includes all fields', () => {
  const query = buildCalculationQuery({
    page: 4,
    limit: 50,
    toolType: 'energy',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    country: 'US',
  });

  assert.equal(
    query,
    'page=4&limit=50&tool_type=energy&start_date=2024-01-01&end_date=2024-02-01&country=US'
  );
});

test('buildAuditLogQuery emits only provided params', () => {
  const query = buildAuditLogQuery({
    page: 1,
    limit: 100,
    keyword: 'delete',
    module: 'articles',
    from: '2024-01-10',
  });

  assert.equal(
    query,
    'page=1&limit=100&q=delete&module=articles&from=2024-01-10'
  );
});
