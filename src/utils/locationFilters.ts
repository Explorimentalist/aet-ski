// src/utils/locationFilters.ts
import { CategorizedOption } from '@/types';

/**
 * Filters destination options to exclude the selected collection point
 * This prevents users from selecting the same location for both collection and destination
 * 
 * @param options - The original categorized options from locations data
 * @param selectedCollectionPoint - The currently selected collection point value
 * @returns Filtered categorized options with the collection point removed from destination options
 */
export const filterDestinationOptions = (
  options: CategorizedOption[],
  selectedCollectionPoint: string
): CategorizedOption[] => {
  // If no collection point is selected, return all options
  if (!selectedCollectionPoint) {
    return options;
  }

  return options.map(category => ({
    ...category,
    children: category.children?.map(subcategory => {
      if (subcategory.type === 'subcategory') {
        // Filter subcategory children to exclude the selected collection point
        const filteredChildren = subcategory.children?.filter(option => 
          option.type === 'option' && option.value !== selectedCollectionPoint
        );
        
        // Only return subcategory if it has remaining children
        return filteredChildren && filteredChildren.length > 0
          ? {
              ...subcategory,
              children: filteredChildren
            }
          : null;
      }
      
      // For direct options, filter out the selected collection point
      if (subcategory.type === 'option') {
        return subcategory.value !== selectedCollectionPoint ? subcategory : null;
      }
      
      return subcategory;
    }).filter(Boolean) // Remove null entries
  })).filter(category => 
    // Only return categories that have children after filtering
    category.children && category.children.length > 0
  );
};

/**
 * Gets helper text for the destination field based on the selected collection point
 * Provides user guidance on what to select
 * 
 * @param collectionPoint - The selected collection point
 * @returns Helper text string
 */
export const getDestinationHelperText = (collectionPoint: string): string => {
  if (!collectionPoint) return '';
  
  // You can customize this based on your business logic
  return `Choose a different location from your collection point (${collectionPoint})`;
};

/**
 * Validates that collection and destination points are different
 * 
 * @param collectionPoint - The selected collection point
 * @param destinationPoint - The selected destination point
 * @returns Validation result with isValid boolean and optional error message
 */
export const validateDifferentLocations = (
  collectionPoint: string,
  destinationPoint: string
): { isValid: boolean; error?: string } => {
  if (!collectionPoint || !destinationPoint) {
    return { isValid: false };
  }
  
  if (collectionPoint === destinationPoint) {
    return {
      isValid: false,
      error: 'Destination cannot be the same as collection point'
    };
  }
  
  return { isValid: true };
};

