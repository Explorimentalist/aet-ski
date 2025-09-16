// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BookingFormData } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique quote ID
export function generateQuoteId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `AET-${timestamp}-${random}`.toUpperCase();
}

// Format currency
export function formatCurrency(amount: number, currency: string = '€'): string {
  return `${currency}${amount.toFixed(2)}`;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Build admin email subject from booking data
export function buildQuoteSubject(booking: BookingFormData): string {
  const isReturn = booking.journey?.type === 'return';
  const prefix = `R-${isReturn ? 'D' : 'S'}`; // R = Request, D = Double (return), S = Single (one way)

  // Name: "Surname, First name"
  const fullName = (booking.passenger?.name || '').trim();
  let namePart = 'Unknown';
  if (fullName) {
    const tokens = fullName.split(/\s+/);
    if (tokens.length === 1) {
      namePart = `${tokens[0]}`;
    } else {
      const surname = tokens[tokens.length - 1];
      const firstNames = tokens.slice(0, -1).join(' ');
      namePart = `${surname}, ${firstNames}`;
    }
  }

  // Passenger counts
  const adults = booking.people?.adults ?? 0;
  const children = booking.people?.children ?? 0;

  // Points
  const from = booking.journey?.collectionPoint || 'Unknown collection point';
  const to = booking.journey?.destinationPoint || 'Unknown destination';

  // Date formatting helper: "Saturday 10/10/26"
  const formatSubjectDate = (value?: Date | string | null): string => {
    if (!value) return 'Flexible';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return 'Flexible';
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const weekday = days[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${weekday} ${dd}/${mm}/${yy}`;
  };

  const collectionDate = formatSubjectDate(booking.dates?.collectionDate ?? null);
  const returnDate = isReturn ? formatSubjectDate(booking.dates?.returnDate ?? null) : undefined;

  const parts = [
    prefix,
    namePart,
    `Adults: ${adults}`,
    `Child: ${children}`,
    from,
    to,
    collectionDate,
  ];

  if (isReturn && returnDate) {
    parts.push(returnDate);
  }

  return parts.join(' - ');
}
