'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Inquiry } from '@/types/supabase';

const STATUS_OPTIONS: { value: Inquiry['status']; label: string }[] = [
  { value: 'new', label: '新規' },
  { value: 'in_progress', label: '対応中' },
  { value: 'done', label: '完了' },
];

const STATUS_COLORS: Record<Inquiry['status'], string> = {
  new: '#c9a84c',
  in_progress: '#6ea8fe',
  done: '#444',
};

export default function InquiryStatusSelect({
  inquiryId,
  currentStatus,
}: {
  inquiryId: string;
  currentStatus: Inquiry['status'];
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Inquiry['status'];
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.from('inquiries').update({ status: newStatus }).eq('id', inquiryId);
      setStatus(newStatus);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={saving}
      style={{
        background: '#1a1a1a',
        border: `0.5px solid ${STATUS_COLORS[status]}`,
        color: STATUS_COLORS[status],
        fontSize: '9px',
        letterSpacing: '0.08em',
        padding: '4px 10px',
        cursor: saving ? 'not-allowed' : 'pointer',
        fontFamily: 'Georgia, serif',
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        paddingRight: '24px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 8 5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%23555'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 8px center',
      }}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
