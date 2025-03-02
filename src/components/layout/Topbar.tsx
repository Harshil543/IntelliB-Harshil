import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Icon } from '@iconify/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define the type for the data prop
interface TopbarProps {
  data: {
    data?: {
      profilePicture?: string;
    };
  };
}

const Topbar: React.FC<TopbarProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* Notification Icon */}
        <button
          className="relative rounded-full"
          onClick={() => {
            router.push('/reminder');
          }}
        >
          <Icon icon="jam:bell" className="h-6 w-6" />
          <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Avatar */}
        <Link href={'/profile'}>
          {data?.data?.profilePicture ? (
            <Avatar>
              <AvatarImage
                src={
                  data?.data?.profilePicture
                    ? data?.data?.profilePicture
                    : 'https://picsum.photos/40'
                }
                alt="User Name"
                className="rounded-full"
              />
            </Avatar>
          ) : (
            <Icon icon="mdi:user-circle" className="h-10 w-10 rounded-full" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
