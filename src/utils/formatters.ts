export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function formatCurrency(val: number | string | undefined | null): string {
  if (val === undefined || val === null || val === '') return '$0';
  const num = typeof val === 'string' ? parseFloat(val) : val;
  if (isNaN(num)) return String(val);
  return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function maskSensitiveText(val: string | undefined | null): string {
  if (!val) return '—';
  if (val.length <= 4) return '****';
  return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`;
}

export function formatRelativeTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    const now = new Date();
    const diffSecs = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSecs < 60) return 'just now';
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
}
