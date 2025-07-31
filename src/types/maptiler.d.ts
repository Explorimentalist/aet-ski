// src/types/maptiler.d.ts
declare module 'maptiler-js' {
  export class Map {
    constructor(options: {
      container: string;
      style: string;
      center: [number, number];
      zoom: number;
      minZoom?: number;
      maxZoom?: number;
    });
    
    on(event: string, callback: (e?: unknown) => void): void;
    remove(): void;
    addSource(id: string, source: unknown): void;
    addLayer(layer: unknown): void;
    removeLayer(id: string): void;
    removeSource(id: string): void;
    getLayer(id: string): unknown;
    getSource(id: string): unknown;
    flyTo(options: { center: [number, number]; zoom: number; duration: number }): void;
    fitBounds(bounds: unknown, options: { padding: number; duration: number }): void;
  }
  
  export class LngLatBounds {
    constructor(sw: [number, number], ne: [number, number]);
    extend(point: [number, number]): LngLatBounds;
  }
  
  export const config: {
    apiKey: string;
  };
  
  export const MapStyle: {
    STREETS: string;
  };
} 