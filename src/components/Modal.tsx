// src/components/Modal.tsx
// Enhanced Modal with sophisticated entrance/exit animations
// Features overlay fade, content scale, and focus management

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { motionTokens, useMotionSafeSimple } from '@/motion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  coordinateWithFixedBottom?: boolean;
  'data-testid'?: string;
}

export const Modal: React.FC<ModalProps> = React.memo(({
  isOpen,
  onClose,
  children,
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  coordinateWithFixedBottom = false,
  'data-testid': dataTestId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose, closeOnOverlayClick]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Add event listeners
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        
        // Restore focus to the previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, handleEscape]);

  const shouldAnimate = useMotionSafeSimple();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={shouldAnimate ? "hidden" : false}
          animate={shouldAnimate ? "visible" : undefined}
          exit={shouldAnimate ? "exit" : undefined}
          variants={motionTokens.components.modal.overlay}
          transition={{
            duration: motionTokens.d.medium,
            ease: motionTokens.e.fade
          }}
        >
          {/* Backdrop Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
            variants={motionTokens.components.modal.overlay}
            transition={{
              duration: motionTokens.d.medium,
              ease: motionTokens.e.fade
            }}
          />
          
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className={`
              relative w-full h-full overflow-y-auto
              bg-background-primary
              ${className}
            `}
            tabIndex={-1}
            role="document"
            data-testid={dataTestId}
            variants={motionTokens.components.modal.content}
            transition={{
              duration: motionTokens.d.medium,
              ease: motionTokens.e.brand,
              delay: coordinateWithFixedBottom ? 0 : (shouldAnimate ? motionTokens.stagger.xs : 0)
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = 'Modal'; 