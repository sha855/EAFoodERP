import React from 'react';

interface ShowConsumerInfoProps {
  ingredients: string;
  allergens: string[];
  consumingGuide: string;
  storingConditions: string;
}

export default function ShowConsumerInfo({
  ingredients,
  allergens,
  consumingGuide,
  storingConditions,
}: ShowConsumerInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold mb-1">Ingredients</h3>
        <p
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: ingredients }}
        ></p>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-1">Allergens</h3>
        <p className="text-sm text-gray-700">
          {Array.isArray(allergens) ? allergens.join(', ') : allergens}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-1">Consuming Guide</h3>
        <p
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: consumingGuide }}
        ></p>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-1">Storing Conditions</h3>
        <p
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: storingConditions }}
        ></p>
      </div>
    </div>
  );
}
