// src/lib/maptiler.ts
import * as maptiler from 'maptiler-js';

// Initialize MapTiler
export function initMapTiler() {
  maptiler.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
}

// Map configuration
export const mapConfig = {
  style: maptiler.MapStyle.STREETS,
  center: [6.1432, 46.2044] as [number, number], // Geneva coordinates
  zoom: 9,
  minZoom: 7,
  maxZoom: 18,
};

// Route coordinates for French Alps
export const routeCoordinates = {
  geneva: [6.1432, 46.2044],
  lyon: [4.8357, 45.7640],
  chambery: [5.9301, 45.5646],
  grenoble: [5.7167, 45.1667],
  valDisere: [6.9989, 45.4497],
  tignes: [6.9244, 45.4733],
  lesArcs: [6.8433, 45.5833],
  laPlagne: [6.6833, 45.5167],
  troisVallees: [6.5833, 45.4167],
};

// Create route line
export function createRouteLine(from: [number, number], to: [number, number]) {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [from, to],
    },
  };
}

// Calculate route distance (simplified)
export function calculateDistance(from: [number, number], to: [number, number]): number {
  const R = 6371; // Earth's radius in km
  const dLat = (to[1] - from[1]) * Math.PI / 180;
  const dLon = (to[0] - from[0]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(from[1] * Math.PI / 180) * Math.cos(to[1] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
} 