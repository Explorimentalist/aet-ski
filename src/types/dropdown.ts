// src/types/dropdown.ts

/**
 * Position configuration for dropdown placement
 */
export type DropdownPosition = 'top' | 'bottom' | 'auto';

/**
 * Viewport boundary information for positioning calculations
 */
export interface ViewportBounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

/**
 * Element position and dimensions for trigger element
 */
export interface ElementBounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Calculated positioning coordinates for dropdown
 */
export interface DropdownCoordinates {
  x: number;
  y: number;
  position: 'top' | 'bottom';
  maxHeight?: number;
}

/**
 * Configuration options for portal dropdown hook
 */
export interface PortalDropdownConfig {
  /** Preferred position (auto will calculate best fit) */
  position?: DropdownPosition;
  /** Offset from trigger element in pixels */
  offset?: number;
  /** Maximum height constraint for dropdown */
  maxHeight?: number;
  /** Minimum distance from viewport edges */
  viewportPadding?: number;
  /** Z-index value for portal dropdown */
  zIndex?: number;
  /** Custom portal container (defaults to document.body) */
  portalContainer?: HTMLElement | null;
  /** Enable/disable position recalculation on window resize */
  enableResize?: boolean;
  /** Debounce delay for resize events in milliseconds */
  resizeDebounce?: number;
}

/**
 * Portal dropdown state and methods returned by hook
 */
export interface PortalDropdownState {
  /** Whether dropdown is currently open */
  isOpen: boolean;
  /** Calculated position coordinates */
  coordinates: DropdownCoordinates | null;
  /** Whether dropdown should render above trigger */
  shouldOpenUpward: boolean;
  /** Portal container element reference */
  portalContainer: HTMLElement | null;
  /** Error state if portal rendering fails */
  error: string | null;
}

/**
 * Portal dropdown actions returned by hook
 */
export interface PortalDropdownActions {
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle dropdown state */
  toggle: () => void;
  /** Manually recalculate position */
  recalculatePosition: () => void;
  /** Update configuration */
  updateConfig: (config: Partial<PortalDropdownConfig>) => void;
}

/**
 * Complete return type for usePortalDropdown hook
 */
export interface UsePortalDropdownReturn {
  /** Current state */
  state: PortalDropdownState;
  /** Available actions */
  actions: PortalDropdownActions;
  /** Ref to attach to trigger element */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Ref to attach to dropdown content */
  dropdownRef: React.RefObject<HTMLElement | null>;
  /** Portal render function for dropdown content */
  renderPortal: (content: React.ReactNode) => React.ReactPortal | React.ReactNode;
}

/**
 * Props for components that use portal dropdowns
 */
export interface PortalDropdownProps {
  /** Portal dropdown configuration */
  portalConfig?: Partial<PortalDropdownConfig>;
  /** Custom portal container */
  portalContainer?: HTMLElement | null;
  /** Whether to disable portal rendering (fallback to inline) */
  disablePortal?: boolean;
}

/**
 * Error types that can occur during portal dropdown operations
 */
export type PortalDropdownError = 
  | 'PORTAL_CONTAINER_NOT_FOUND'
  | 'TRIGGER_ELEMENT_NOT_FOUND'
  | 'POSITIONING_CALCULATION_FAILED'
  | 'PORTAL_RENDERING_FAILED';

/**
 * Event handler types for portal dropdown interactions
 */
export interface PortalDropdownEventHandlers {
  onOpen?: () => void;
  onClose?: () => void;
  onPositionChange?: (coordinates: DropdownCoordinates) => void;
  onError?: (error: PortalDropdownError, message: string) => void;
}