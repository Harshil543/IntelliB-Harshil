import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import React from 'react';

const ProfileSetting = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Company' }
  ];
  return (
    <div>
      <BreadcrumbWithCustomSeparator items={breadcrumbItems} />
      Profile Setting
    </div>
  );
};

export default ProfileSetting;
