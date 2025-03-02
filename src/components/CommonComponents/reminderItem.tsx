import React from 'react';

interface props {
  title: string;
  description: string;
  isLast: boolean;
}

export default function ReminderItem({ title, description, isLast }: props) {
  return (
    <div
      className={`flex items-center justify-between py-[10px] ${!isLast ? 'border-b' : ''}`}
    >
      <div>
        <div className="poppins-semibold text-[16px] text-[#1B2559]">
          {title}
        </div>
        <div className="poppins-medium text-[#3a3a3a]">{description}</div>
      </div>
      <div className="poppins-medium rounded-[12px] bg-[#FE9901] px-[16px] py-[6px] text-[#ffffff]">
        View Bill
      </div>
    </div>
  );
}
