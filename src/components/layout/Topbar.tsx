import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Icon } from '@iconify/react'; // Import Icon from Iconify
import React from 'react';
import Link from 'next/link';

const Topbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative rounded-full">
          <Icon icon="jam:bell" className="h-6 w-6" />
          <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Avatar */}
        <Link href={'/profile'}>
          <Avatar>
            <AvatarImage
              src="https://picsum.photos/40"
              alt="User Name"
              className="rounded-full"
            />
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
