
'use client'
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CardSelection = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelectCard = (cardId: number) => {
    setSelectedCard(cardId);  // Set selected card
  };

  const cards = [
    { id: 1, title: 'Card 1', description: 'ไม่ออกกำลังกาย / ทำงานนั่งโต๊ะ', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478061.png' },
    { id: 2, title: 'Card 2', description: 'ออกกำลังกายเบาๆ (3-5 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478060.png' },
    { id: 3, title: 'Card 3', description: 'ออกกำลังกาย (3-5 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478057.png' },
    { id: 4, title: 'Card 4', description: 'ออกกำลังกาย (6-7 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478058.png' },
    { id: 5, title: 'Card 5', description: 'ออกกำลังกายทุกวัน (วันละ 2 เวลา)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478059.png' },
  ];

  return (
    <div className="p-8 max-w-full lg:max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Select an Option</h2>

      {/* Grid of Cards (1 Column) */}
      <div className="space-y-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleSelectCard(card.id)}
            className={`cursor-pointer transition-all rounded-lg ${
              selectedCard === card.id
                ? 'bg-green-500 text-white'
                : 'dark:bg-dark-bg border-2 border-gray-300 hover:bg-gray-300 dark:hover:bg-green-400 dark:hover:text-white'
            }`}
          >
            <CardHeader className="flex items-center space-x-4 p-4">
              {/* Card Image (on left side) */}
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Card Text (on right side) */}
              <div className="flex-1">
                {/* <CardTitle className="text-lg font-semibold">{card.title}</CardTitle> */}
                <CardDescription
                  className={`text-sm mt-2 ${
                    selectedCard === card.id ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {card.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex items-center">
              {selectedCard === card.id && <p className="text-sm">เลือก</p>}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Confirm Selection Button */}
      <div className="mt-6">
        {selectedCard && (
          <Button onClick={() => alert(`Selected Card: ${selectedCard}`)} className="w-full">
            Confirm Selection
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardSelection;
