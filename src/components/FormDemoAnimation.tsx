'use client';

// src/components/FormDemoAnimation.tsx
// Scripted, looped walkthrough of the multi-step quote form using the live UI components

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JourneyStep } from '@/components/JourneyStep';
import { DatesStep } from '@/components/DatesStep';
import { PeopleStep } from '@/components/PeopleStep';
import { LuggageStep } from '@/components/LuggageStep';
import { PassengerStep } from '@/components/PassengerStep';
import { SummaryStep } from '@/components/SummaryStep';
import { SuccessStep } from '@/components/SuccessStep';
import { FormNavigation } from '@/components/FormNavigation';
import { Modal } from '@/components/Modal';
import { BookingFormData, FormValidation } from '@/types';
import { motionTokens, useMotionSafeSimple } from '@/motion';

type DemoTarget =
  | 'journey-type-return'
  | 'journey-collection'
  | 'journey-destination'
  | 'dates-collection-date'
  | 'dates-collection-time'
  | 'dates-return-date'
  | 'dates-return-time'
  | 'people-adults'
  | 'people-children'
  | 'luggage-skis'
  | 'luggage-snowboards'
  | 'luggage-suitcases'
  | 'luggage-notes'
  | 'passenger-name'
  | 'passenger-email'
  | 'passenger-notes'
  | 'navigation-next';

type DemoAction =
  | { type: 'pause'; delay: number; label?: string }
  | { type: 'set'; delay: number; label?: string; target?: DemoTarget; patch: Partial<BookingFormData>; markStep?: number }
  | { type: 'type'; delay: number; label?: string; target?: DemoTarget; path: string[]; value: string; formatter?: (value: string) => unknown; markStep?: number }
  | { type: 'next'; delay: number; label?: string; target?: DemoTarget }
  | { type: 'submit'; delay: number; label?: string; target?: DemoTarget };

interface PointerState {
  x: number;
  y: number;
  pulse: boolean;
}

interface PointerMotion {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  jitterX: number;
  jitterY: number;
  overshootX: number;
  overshootY: number;
  duration: number;
  settleDuration: number;
  easing: [number, number, number, number];
}

const totalSteps = 6;

const initialData: Partial<BookingFormData> = {
  journey: { type: 'one-way', collectionPoint: '', destinationPoint: '' },
  dates: {
    collectionDate: null,
    collectionTime: '',
    returnDate: null,
    returnTime: '',
    isCollectionFlexible: false,
    isReturnFlexible: false,
  },
  people: { adults: 1, children: 0 },
  luggage: { skis: 0, snowboards: 0, suitcases: 0, prams: 0, extraItems: [] },
  passenger: { name: '', email: '', phone: '+44 ', specialRequests: '' },
};

const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);

const scrollElementIntoView = async (element: HTMLElement) => {
  try {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    await waitFor(260); // Allow scroll and layout to settle so the pointer can align
  } catch {
    // No-op if scrolling fails
  }
};

const focusTarget = async (resolver: () => HTMLElement | null) => {
  const el = await waitForElement(resolver);
  if (!el) return null;
  if ('focus' in el && typeof el.focus === 'function') {
    el.focus();
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const value = el.value || '';
      try {
        el.setSelectionRange(value.length, value.length);
      } catch {
        // ignore unsupported selection
      }
    }
  }
  return el;
};

const mergeFormData = (
  base: Partial<BookingFormData>,
  patch: Partial<BookingFormData>
): Partial<BookingFormData> => {
  const result: Partial<BookingFormData> = { ...base };

  Object.entries(patch).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      const currentValue = isPlainObject(result[key as keyof BookingFormData])
        ? (result[key as keyof BookingFormData] as Record<string, unknown>)
        : {};
      result[key as keyof BookingFormData] = {
        ...currentValue,
        ...value,
      } as BookingFormData[keyof BookingFormData];
    } else {
      result[key as keyof BookingFormData] = value as BookingFormData[keyof BookingFormData];
    }
  });

  return result;
};

const resolveTarget = (target: DemoTarget): (() => HTMLElement | null) => {
  const numberInputPlus = (index: number) => () => {
    const input = document.querySelectorAll<HTMLInputElement>('input[type="number"]')[index];
    if (!input) return null;
    const buttons = input.parentElement?.querySelectorAll<HTMLButtonElement>('button');
    if (buttons && buttons.length > 1) {
      return buttons[buttons.length - 1];
    }
    return input;
  };

  const resolvers: Record<DemoTarget, () => HTMLElement | null> = {
    'journey-type-return': () =>
      document.querySelector('input[name="journeyType"][value="return"]')?.parentElement ?? null,
    'journey-collection': () => document.querySelectorAll<HTMLButtonElement>('button.form-dropdown')[0] ?? null,
    'journey-destination': () => document.querySelectorAll<HTMLButtonElement>('button.form-dropdown')[1] ?? null,
    'dates-collection-date': () => document.querySelectorAll<HTMLButtonElement>('button.form-calendar')[0] ?? null,
    'dates-collection-time': () => document.querySelectorAll<HTMLButtonElement>('button.form-calendar')[1] ?? null,
    'dates-return-date': () => document.querySelectorAll<HTMLButtonElement>('button.form-calendar')[2] ?? null,
    'dates-return-time': () => document.querySelectorAll<HTMLButtonElement>('button.form-calendar')[3] ?? null,
    'people-adults': numberInputPlus(0),
    'people-children': numberInputPlus(1),
    'luggage-suitcases': numberInputPlus(0),
    'luggage-skis': numberInputPlus(1),
    'luggage-snowboards': numberInputPlus(2),
    'luggage-notes': () => document.querySelector<HTMLTextAreaElement>('textarea'),
    'passenger-name': () => document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"], input[type="number"]')[0] ?? null,
    'passenger-email': () => document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"], input[type="number"]')[1] ?? null,
    'passenger-notes': () => document.querySelectorAll<HTMLTextAreaElement>('textarea')[0] ?? null,
    'navigation-next': () => {
      const nav = document.querySelector('[data-testid="form-navigation"]');
      if (!nav) return null;
      const buttons = Array.from(nav.querySelectorAll('button'));
      return buttons[buttons.length - 1] ?? null;
    },
  };

  return resolvers[target];
};

const waitForElement = async (resolver: () => HTMLElement | null, attempts = 12, delay = 80) => {
  for (let index = 0; index < attempts; index += 1) {
    const element = resolver();
    if (element) return element;
    await waitFor(delay);
  }
  return null;
};

export const FormDemoAnimation: React.FC = () => {
  const [formData, setFormData] = useState<Partial<BookingFormData>>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidationStates, setStepValidationStates] = useState<Record<number, boolean>>({ 1: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [pointer, setPointer] = useState<PointerState | null>(null);
  const [pointerMotion, setPointerMotion] = useState<PointerMotion | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const scriptRunId = useRef(0);
  const shouldAnimate = useMotionSafeSimple();

  const validation = useMemo<FormValidation>(() => ({
    isValid: Boolean(stepValidationStates[currentStep]),
    errors: {},
    touched,
  }), [currentStep, stepValidationStates, touched]);

  const updateFormData = useCallback((patch: Partial<BookingFormData>) => {
    setFormData(prev => mergeFormData(prev, patch));
  }, []);

  const setFieldValue = useCallback((path: string[], value: unknown) => {
    setFormData(prev => {
      const clone: Record<string, unknown> = Array.isArray(prev) ? [...(prev as unknown[])] as unknown[] : { ...prev };
      let cursor: Record<string, unknown> = clone;

      path.forEach((segment, index) => {
        if (index === path.length - 1) {
          cursor[segment] = value as never;
          return;
        }

        const next = cursor[segment];
        const nextValue = isPlainObject(next) ? { ...next } : {};
        cursor[segment] = nextValue;
        cursor = nextValue;
      });

      return clone as Partial<BookingFormData>;
    });
  }, []);

  const handleStepValidationChange = useCallback((step: number, isValid: boolean) => {
    setStepValidationStates(prev => {
      if (prev[step] === isValid) {
        return prev; // Avoid pointless state updates that can cause loops
      }
      return {
        ...prev,
        [step]: isValid,
      };
    });
  }, []);

  const markFieldAsTouched = useCallback((fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const resetDemo = useCallback(() => {
    setFormData(initialData);
    setCurrentStep(1);
    setShowSuccess(false);
    setStepValidationStates({ 1: false });
    setTouched({});
    setPointer(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setStepValidationStates(prev => ({ ...prev, [totalSteps]: true }));
    await waitFor(400);
    setShowSuccess(true);
    setPointer(null);
  }, []);

  const handleClose = useCallback(() => {
    resetDemo();
  }, [resetDemo]);

  const handleGoHome = useCallback(() => {
    resetDemo();
  }, [resetDemo]);

  const movePointer = useCallback(async (target: DemoTarget) => {
    if (typeof document === 'undefined') return;
    const resolver = resolveTarget(target);
    const element = await waitForElement(resolver);
    if (!element) return;

    await scrollElementIntoView(element);
    const rect = element.getBoundingClientRect();
    const isTextLikeTarget = (
      target === 'passenger-name' ||
      target === 'passenger-email' ||
      target === 'passenger-notes' ||
      target === 'luggage-notes'
    );

    const isDateTimeTarget = (
      target === 'dates-collection-date' ||
      target === 'dates-collection-time' ||
      target === 'dates-return-date' ||
      target === 'dates-return-time'
    );

    const x = isTextLikeTarget
      ? rect.left + rect.width * 0.08 // near left padding for text inputs
      : isDateTimeTarget
        ? rect.left + rect.width * 0.92 // right side for calendars/times
        : rect.left + rect.width * 0.5;
    const y = rect.top + rect.height * 0.5;

    const nextPointer: PointerState = {
      x,
      y,
      pulse: false,
    };

    // Humanized motion: pick a gentle ease and tiny overshoot
    const duration = 0.34 + Math.random() * 0.14; // 0.34s - 0.48s
    const settleDuration = 0.18 + Math.random() * 0.06; // 0.18s - 0.24s
    const easing: [number, number, number, number] = [0.25, 0.9, 0.35, 1]; // soft ease-out-ish
    const overshootScale = 0.02 + Math.random() * 0.015; // 2% - 3.5% overshoot
    const overshootX = x + (Math.random() > 0.5 ? 1 : -1) * rect.width * overshootScale;
    const overshootY = y + (Math.random() > 0.5 ? 1 : -1) * rect.height * overshootScale;
    const last = pointerStartRef.current ?? { x, y };
    const jitterMag = 2 + Math.random() * 4; // 2px - 6px
    const jitterX = last.x + (Math.random() > 0.5 ? 1 : -1) * jitterMag;
    const jitterY = last.y + (Math.random() > 0.5 ? 1 : -1) * jitterMag;

    setPointerMotion({
      startX: last.x,
      startY: last.y,
      targetX: x,
      targetY: y,
      jitterX,
      jitterY,
      overshootX,
      overshootY,
      duration,
      settleDuration,
      easing,
    });

    setPointer(nextPointer);
    pointerStartRef.current = { x, y };
    await waitFor(420); // wait for the travel animation to fully settle before interacting
  }, []);

  const clickWithAction = useCallback(async (
    runId: number | undefined,
    action?: () => Promise<void> | void
  ) => {
    setPointer(current => current ? { ...current, pulse: true } : current);
    await waitFor(100); // slight press-in before the action
    if (runId && scriptRunId.current !== runId) return;
    if (action) {
      await action();
    }
    await waitFor(150); // keep the pulse visible during the click
    setPointer(current => current ? { ...current, pulse: false } : current);
    await waitFor(160); // small pause after click
  }, []);

  const typeValue = useCallback(async (
    path: string[],
    value: string,
    formatter?: (value: string) => unknown,
    runId?: number,
    focusResolver?: () => HTMLElement | null
  ) => {
    let focusedEl: HTMLElement | null = null;
    if (focusResolver) {
      focusedEl = await focusTarget(focusResolver);
    }

    let current = '';
    for (const char of value) {
      if (runId && scriptRunId.current !== runId) return;
      current += char;
      setFieldValue(path, formatter ? formatter(current) : current);
      if (focusResolver) {
        // Keep caret visible and at the end while typing
        try {
          focusedEl = focusedEl ?? (await focusTarget(focusResolver));
          if (focusedEl instanceof HTMLInputElement || focusedEl instanceof HTMLTextAreaElement) {
            focusedEl.focus();
            focusedEl.setSelectionRange(current.length, current.length);
          } else if (focusedEl && 'focus' in focusedEl && typeof focusedEl.focus === 'function') {
            focusedEl.focus();
          }
        } catch {
          // ignore focus issues
        }
      }
      await waitFor(70);
    }
  }, [setFieldValue]);

  const performAction = useCallback(async (action: DemoAction, runId: number) => {
    if (scriptRunId.current !== runId) return;

    switch (action.type) {
      case 'pause':
        await waitFor(action.delay);
        break;
      case 'set':
        if (action.target) {
          await movePointer(action.target);
        }
        await clickWithAction(runId, () => {
          updateFormData(action.patch);
          if (action.markStep) {
            setStepValidationStates(prev => ({ ...prev, [action.markStep as number]: true }));
          }
        });
        await waitFor(action.delay);
        break;
      case 'type':
        if (action.target) {
          await movePointer(action.target);
        }
        const focusResolver = action.target ? resolveTarget(action.target) : undefined;
        if (action.target) {
          await clickWithAction(runId, () => focusResolver ? focusTarget(focusResolver) : undefined);
        } else {
          await clickWithAction(runId);
        }
        await typeValue(action.path, action.value, action.formatter, runId, focusResolver);
        if (action.markStep) {
          setStepValidationStates(prev => ({ ...prev, [action.markStep as number]: true }));
        }
        await waitFor(action.delay);
        break;
      case 'next':
        if (action.target) {
          await movePointer(action.target);
        }
        await clickWithAction(runId, handleNext);
        await waitFor(action.delay);
        break;
      case 'submit':
        if (action.target) {
          await movePointer(action.target);
        }
        await clickWithAction(runId, handleSubmit);
        await waitFor(action.delay);
        break;
      default:
        break;
    }
  }, [handleNext, handleSubmit, movePointer, clickWithAction, typeValue, updateFormData]);

  const runDemoSequence = useCallback(async () => {
    const runId = Date.now();
    scriptRunId.current = runId;
    resetDemo();
    const today = new Date();
    const collectionDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21);
    const returnDate = new Date(collectionDate.getFullYear(), collectionDate.getMonth(), collectionDate.getDate() + 7);

    const script: DemoAction[] = [
      { type: 'pause', delay: 900, label: 'Journey setup' },
      {
        type: 'set',
        target: 'journey-type-return',
        delay: 900,
        label: 'Return transfer selected',
        patch: { journey: { type: 'return' } },
      },
      {
        type: 'set',
        target: 'journey-collection',
        delay: 1100,
        label: 'Pickup: Geneva Airport',
        patch: { journey: { collectionPoint: 'geneva-airport' } },
      },
      {
        type: 'set',
        target: 'journey-destination',
        delay: 1100,
        label: 'Destination: Val d’Isère',
        patch: { journey: { destinationPoint: 'val-disere' } },
        markStep: 1,
      },
      { type: 'next', target: 'navigation-next', delay: 900, label: 'Move to dates' },
      {
        type: 'set',
        target: 'dates-collection-date',
        delay: 1000,
        label: 'Select collection date',
        patch: { dates: { collectionDate, isCollectionFlexible: false } },
      },
      {
        type: 'set',
        target: 'dates-collection-time',
        delay: 800,
        label: 'Add arrival time',
        patch: { dates: { collectionTime: '09:30' } },
      },
      {
        type: 'set',
        target: 'dates-return-date',
        delay: 1000,
        label: 'Select return date',
        patch: { dates: { returnDate, isReturnFlexible: false } },
      },
      {
        type: 'set',
        target: 'dates-return-time',
        delay: 800,
        label: 'Add departure time',
        patch: { dates: { returnTime: '17:00' } },
        markStep: 2,
      },
      { type: 'next', target: 'navigation-next', delay: 900, label: 'Move to passengers' },
      {
        type: 'set',
        target: 'people-adults',
        delay: 700,
        label: '2 adults travelling',
        patch: { people: { adults: 2 } },
      },
      {
        type: 'set',
        target: 'people-children',
        delay: 700,
        label: '1 child added',
        patch: { people: { adults: 2, children: 1 } },
        markStep: 3,
      },
      { type: 'next', target: 'navigation-next', delay: 900, label: 'Move to luggage' },
      {
        type: 'set',
        target: 'luggage-suitcases',
        delay: 650,
        label: 'Add 3 suitcases',
        patch: { luggage: { suitcases: 3 } },
      },
      {
        type: 'set',
        target: 'luggage-skis',
        delay: 650,
        label: 'Add 2 pairs of skis',
        patch: { luggage: { skis: 2 } },
      },
      {
        type: 'set',
        target: 'luggage-snowboards',
        delay: 650,
        label: 'Add 1 snowboard',
        patch: { luggage: { snowboards: 1 } },
      },
      {
        type: 'type',
        target: 'luggage-notes',
        delay: 800,
        label: 'Add special equipment',
        path: ['luggage', 'extraItems'],
        value: 'Foldable buggy',
        formatter: (text: string) => (text ? [text] : []),
        markStep: 4,
      },
      { type: 'next', target: 'navigation-next', delay: 900, label: 'Move to passenger' },
      {
        type: 'type',
        target: 'passenger-name',
        delay: 900,
        label: 'Typing full name',
        path: ['passenger', 'name'],
        value: 'Noah Finlay',
      },
      {
        type: 'type',
        target: 'passenger-email',
        delay: 1000,
        label: 'Typing email address',
        path: ['passenger', 'email'],
        value: 'noah@example.com',
        markStep: 5,
      },
      { type: 'next', target: 'navigation-next', delay: 900, label: 'Review summary' },
      {
        type: 'type',
        target: 'passenger-notes',
        delay: 900,
        label: 'Adding special request',
        path: ['passenger', 'specialRequests'],
        value: 'Booster seat for the child, please.',
      },
      { type: 'pause', delay: 1000, label: 'Reviewing details' },
      { type: 'submit', target: 'navigation-next', delay: 900, label: 'Get your quote' },
      { type: 'pause', delay: 1800, label: 'Confirmation' },
    ];

    for (const action of script) {
      if (scriptRunId.current !== runId) return;
      await performAction(action, runId);
    }

    if (scriptRunId.current !== runId) return;
    await waitFor(1200);
    if (scriptRunId.current !== runId) return;
    runDemoSequence();
  }, [performAction, resetDemo]);

  useEffect(() => {
    runDemoSequence();
    return () => {
      scriptRunId.current += 1;
    };
  }, [runDemoSequence]);

  const currentStepValidationChange = useMemo(
    () => (isValid: boolean) => handleStepValidationChange(currentStep, isValid),
    [currentStep, handleStepValidationChange]
  );

  const currentStepComponent = useMemo(() => {
    if (showSuccess) {
      return (
        <SuccessStep
          onClose={handleClose}
          onGoHome={handleGoHome}
        />
      );
    }

    const stepProps = {
      data: formData,
      onUpdate: updateFormData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      currentStep,
      totalSteps,
      validation,
      onEditStep: (step: number) => setCurrentStep(step),
      markFieldAsTouched,
      onValidationChange: currentStepValidationChange,
      isModalOpen: true,
      isFirstRender: false,
    };

    switch (currentStep) {
      case 1:
        return <JourneyStep {...stepProps} onClose={handleClose} />;
      case 2:
        return <DatesStep {...stepProps} onClose={handleClose} />;
      case 3:
        return <PeopleStep {...stepProps} onClose={handleClose} />;
      case 4:
        return <LuggageStep {...stepProps} onClose={handleClose} />;
      case 5:
        return <PassengerStep {...stepProps} onClose={handleClose} />;
      case 6:
      default:
        return (
          <SummaryStep
            {...stepProps}
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        );
    }
  }, [
    currentStep,
    formData,
    handleClose,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleStepValidationChange,
    currentStepValidationChange,
    markFieldAsTouched,
    showSuccess,
    updateFormData,
    validation,
  ]);

  return (
    <div className="relative w-full h-full">
      <Modal
        isOpen
        onClose={handleClose}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        coordinateWithFixedBottom
        data-testid="multi-step-form-demo"
      >
        <div className="relative min-h-full bg-background-primary">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={showSuccess ? 'success' : `step-${currentStep}`}
              initial={shouldAnimate ? 'enter' : false}
              animate={shouldAnimate ? 'center' : undefined}
              exit={shouldAnimate ? 'exit' : undefined}
              variants={motionTokens.components.multiStep.step}
              transition={{
                type: 'tween',
                duration: motionTokens.d.short,
                ease: motionTokens.e.brand,
              }}
              className="w-full"
            >
              <motion.div
                initial={shouldAnimate ? 'hidden' : false}
                animate={shouldAnimate ? 'visible' : undefined}
                variants={motionTokens.components.multiStep.content}
              >
                <motion.div
                  variants={motionTokens.patterns.entrance}
                  transition={{
                    duration: motionTokens.d.short,
                    ease: motionTokens.e.brand,
                  }}
                >
                  {currentStepComponent}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {!showSuccess && (
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={currentStep === totalSteps ? handleSubmit : handleNext}
              onPrevious={handlePrevious}
              isNextDisabled={!stepValidationStates[currentStep]}
              isPreviousDisabled={currentStep === 1}
              showProgressDots={currentStep < totalSteps}
              isVisible
              isFirstRender={false}
              nextButtonText={currentStep === totalSteps ? 'Get your quote' : 'Next'}
            />
          )}

          <AnimatePresence>
            {!showSuccess && pointer && (
              <motion.div
                key="pointer"
                className="pointer-events-none fixed z-[80] top-0 left-0"
                initial={{ opacity: 0, scale: 0.9, x: pointer.x, y: pointer.y }}
                animate={{
                  opacity: 1,
                  scale: pointer.pulse ? 0.9 : 1,
                  x: pointerMotion
                    ? [
                        pointerMotion.startX,
                        pointerMotion.jitterX,
                        pointerMotion.overshootX,
                        pointerMotion.targetX,
                      ]
                    : pointer.x,
                  y: pointerMotion
                    ? [
                        pointerMotion.startY,
                        pointerMotion.jitterY,
                        pointerMotion.overshootY,
                        pointerMotion.targetY,
                      ]
                    : pointer.y,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={
                  pointerMotion
                    ? {
                        type: 'tween',
                        duration: pointerMotion.duration + pointerMotion.settleDuration,
                        times: [
                          0,
                          0.12,
                          pointerMotion.duration /
                            (pointerMotion.duration + pointerMotion.settleDuration),
                          1,
                        ],
                        ease: [
                          pointerMotion.easing,
                          pointerMotion.easing,
                          [0.33, 1, 0.68, 1],
                        ],
                      }
                    : {
                        type: 'tween',
                        ease: [0.33, 1, 0.68, 1],
                        duration: 0.38,
                      }
                }
              >
                <div
                  className="w-6 h-6 rounded-full bg-[#1D4747] shadow-lg border border-white"
                  style={{ opacity: pointer.pulse ? 0.24 : 0.7 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </div>
  );
};

export default FormDemoAnimation;
