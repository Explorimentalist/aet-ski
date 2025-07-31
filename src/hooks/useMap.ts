// src/hooks/useMap.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { Route } from '@/types';

export function useMap(containerId: string) {
  const mapRef = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Implement MapTiler integration
    console.log('MapTiler integration pending for container:', containerId);
    setIsLoaded(true);
  }, [containerId]);

  // Add route to map
  const addRoute = useCallback((route: Route) => {
    console.log('Adding route to map:', route);
  }, []);

  // Remove route from map
  const removeRoute = useCallback((routeId: string) => {
    console.log('Removing route from map:', routeId);
  }, []);

  // Fly to location
  const flyTo = useCallback((coordinates: [number, number], zoom: number = 12) => {
    console.log('Flying to:', coordinates, 'zoom:', zoom);
  }, []);

  // Fit bounds to show all routes
  const fitBounds = useCallback((routes: Route[]) => {
    console.log('Fitting bounds for routes:', routes);
  }, []);

  return {
    map: mapRef.current,
    isLoaded,
    error,
    addRoute,
    removeRoute,
    flyTo,
    fitBounds,
  };
} 