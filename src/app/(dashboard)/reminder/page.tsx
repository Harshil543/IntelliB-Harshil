import ReminderItem from '@/components/CommonComponents/reminderItem';
import React from 'react';

export default function page() {
  const reminder = [
    {
      id: 1,
      title: 'Bill Generated',
      description:
        'New Bill Generated for Unit #101. Amount: $500. Due Date: Nov 15.'
    },
    {
      id: 1,
      title: 'Bill Generated',
      description:
        'New Bill Generated for Unit #101. Amount: $500. Due Date: Nov 15.'
    },
    {
      id: 1,
      title: 'Bill Generated',
      description:
        'New Bill Generated for Unit #101. Amount: $500. Due Date: Nov 15.'
    }
  ];
  return (
    <div className="mt-[24px] rounded-[20px] bg-[#ffffff] p-[15px]">
      {reminder.map((item, i) => (
        <div key={i}>
          <ReminderItem {...item} isLast={i === reminder.length - 1} />
        </div>
      ))}
    </div>
  );
}
