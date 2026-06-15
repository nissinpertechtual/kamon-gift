import { createClient } from '@supabase/supabase-js';

// 管理操作の監査ログ（best-effort）。
// audit_logs テーブルが無い/失敗しても本処理は止めない。
// 必要なSQL:
//   create table audit_logs (
//     id uuid primary key default gen_random_uuid(),
//     actor text, action text not null, entity text not null,
//     entity_id text, detail jsonb, created_at timestamptz default now()
//   );
export async function logAudit(entry: {
  actor?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  detail?: unknown;
}): Promise<void> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return;
    const admin = createClient(url, key);
    await admin.from('audit_logs').insert({
      actor: entry.actor ?? null,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      detail: entry.detail ?? null,
    });
  } catch {
    // テーブル未作成・権限等は無視
  }
}
