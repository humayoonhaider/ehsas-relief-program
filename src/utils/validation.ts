export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidPakistaniMobile(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  // 11 digits starting with 03 (e.g. 03001234567) or 12 digits starting with 923 (e.g. 923001234567)
  if (digits.length === 11 && digits.startsWith('03')) return true;
  if (digits.length === 12 && digits.startsWith('923')) return true;
  if (digits.length === 10 && digits.startsWith('3')) return true;
  return digits.length >= 10 && digits.length <= 14;
}

export function isValidCNIC(cnic: string): boolean {
  if (!cnic) return false;
  const digits = cnic.replace(/\D/g, '');
  // CNIC must have exactly 13 digits
  return digits.length === 13;
}

export function formatCNIC(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
}

export function formatMobileNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function validateRequired(val: any): boolean {
  if (val === undefined || val === null) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  if (typeof val === 'number') return !isNaN(val);
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'boolean') return true;
  return Boolean(val);
}
