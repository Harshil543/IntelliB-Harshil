import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';
import React from 'react';

const ProfileSetting = () => {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Profile" />
    </div>
  );
};

export default ProfileSetting;
