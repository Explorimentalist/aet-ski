// src/data/locations.ts
import { CategorizedOption } from '@/types';

export const collectionPoints: CategorizedOption[] = [
  {
    type: 'category',
    label: 'Airports, Train Stations & Cities',
    children: [
      {
        type: 'option',
        label: 'Geneva Airport (GVA)',
        value: 'geneva-airport',
        icon: 'airport'
      },
      {
        type: 'option',
        label: 'Geneva Hotel',
        value: 'geneva-hotel',
        icon: 'hotel'
      },
      {
        type: 'option',
        label: 'Lyon St. Exupéry Airport (LYS)',
        value: 'lyon-airport',
        icon: 'airport'
      },
      {
        type: 'option',
        label: 'Lyon Hotel',
        value: 'lyon-hotel',
        icon: 'hotel'
      },
      {
        type: 'option',
        label: 'Grenoble Alps Isère Airport (GNB)',
        value: 'grenoble-airport',
        icon: 'airport'
      },
      {
        type: 'option',
        label: 'Chambéry-Aix Airport (CMF)',
        value: 'chambery-airport',
        icon: 'airport'
      },
      {
        type: 'option',
        label: 'Bourg-St-Maurice Train Station',
        value: 'bourg-st-maurice-station',
        icon: 'train-station'
      },
      {
        type: 'option',
        label: 'Moutiers Train Station',
        value: 'moutiers-station',
        icon: 'train-station'
      }
    ]
  },
  {
    type: 'category',
    label: 'Ski Resorts & Towns',
    children: [
      {
        type: 'option',
        label: 'Mutiers',
        value: 'mutiers',
        icon: 'ski-resort'
      },
      {
        type: 'subcategory',
        label: 'Les 3 vallées',
        children: [
          {
            type: 'option',
            label: 'Brides-les-Bains',
            value: 'brides-les-bains',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Méribel Les Allues',
            value: 'meribel-les-allues',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Méribel Village',
            value: 'meribel-village',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Méribel',
            value: 'meribel',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Méribel Mottaret',
            value: 'meribel-mottaret',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'La Tania',
            value: 'la-tania',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Courchevel Le Praz (1300)',
            value: 'courchevel-le-praz',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Courchevel Village (1550)',
            value: 'courchevel-village',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Courchevel Moriond (1650)',
            value: 'courchevel-moriond',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Courchevel (1850)',
            value: 'courchevel-1850',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'St. Martin de Belleville',
            value: 'st-martin-de-belleville',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Menuires',
            value: 'les-menuires',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val Thorens',
            value: 'val-thorens',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'subcategory',
        label: 'Paradiski',
        children: [
          {
            type: 'option',
            label: 'La Plagne 1800',
            value: 'la-plagne-1800',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'La Plagne Aime 2000',
            value: 'la-plagne-aime-2000',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'La Plagne Bellecôte',
            value: 'la-plagne-bellecote',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'La Plagne Villages',
            value: 'la-plagne-villages',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'La Plagne Belle Plagne',
            value: 'la-plagne-belle-plagne',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Montalbert',
            value: 'montalbert',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Montchavin',
            value: 'montchavin',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Champagny-en-Vanoise',
            value: 'champagny-en-vanoise',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Arcs 1600',
            value: 'les-arcs-1600',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Arcs 1800',
            value: 'les-arcs-1800',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Arcs 1950',
            value: 'les-arcs-1950',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Arcs 2000',
            value: 'les-arcs-2000',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Peisey / Vallandry',
            value: 'peisey-vallandry',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'subcategory',
        label: 'Espace Killy',
        children: [
          {
            type: 'option',
            label: 'Tignes Val Claret',
            value: 'tignes-val-claret',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Tignes Le Lac',
            value: 'tignes-le-lac',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Tignes Les Brévières',
            value: 'tignes-les-brevieres',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Tignes Le Lavachet',
            value: 'tignes-le-lavachet',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Tignes Les Boisses',
            value: 'tignes-les-boisses',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val d\'Isère',
            value: 'val-disere',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val d\'Isère La Daille',
            value: 'val-disere-la-daille',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val d\'Isère Le Fornet',
            value: 'val-disere-le-fornet',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'option',
        label: 'La Rosière',
        value: 'la-rosiere',
        icon: 'ski-resort'
      },
      {
        type: 'option',
        label: 'Sainte Foy Tarentaise',
        value: 'sainte-foy-tarentaise',
        icon: 'ski-resort'
      }
    ]
  }
];

export const destinations: CategorizedOption[] = [
  {
    type: 'category',
    label: 'Ski Resorts',
    children: [
      {
        type: 'subcategory',
        label: 'Les 3 vallées',
        children: [
          {
            type: 'option',
            label: 'Méribel',
            value: 'meribel',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Courchevel',
            value: 'courchevel',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val Thorens',
            value: 'val-thorens',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'subcategory',
        label: 'Paradiski',
        children: [
          {
            type: 'option',
            label: 'La Plagne',
            value: 'la-plagne',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Les Arcs',
            value: 'les-arcs',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'subcategory',
        label: 'Espace Killy',
        children: [
          {
            type: 'option',
            label: 'Tignes',
            value: 'tignes',
            icon: 'ski-resort'
          },
          {
            type: 'option',
            label: 'Val d\'Isère',
            value: 'val-disere',
            icon: 'ski-resort'
          }
        ]
      },
      {
        type: 'option',
        label: 'La Rosière',
        value: 'la-rosiere',
        icon: 'ski-resort'
      },
      {
        type: 'option',
        label: 'Sainte Foy Tarentaise',
        value: 'sainte-foy-tarentaise',
        icon: 'ski-resort'
      }
    ]
  }
];

// Helper function to flatten categorized options for search
export const flattenCategorizedOptions = (options: CategorizedOption[]): CategorizedOption[] => {
  const flattened: CategorizedOption[] = [];
  
  const flatten = (items: CategorizedOption[]) => {
    items.forEach(item => {
      if (item.type === 'option') {
        flattened.push(item);
      }
      if (item.children) {
        flatten(item.children);
      }
    });
  };
  
  flatten(options);
  return flattened;
};

// Helper function to find option by value
export const findOptionByValue = (options: CategorizedOption[], value: string): CategorizedOption | null => {
  const flattened = flattenCategorizedOptions(options);
  return flattened.find(option => option.value === value) || null;
};

// Export locations for use in components
export const locations = collectionPoints; 