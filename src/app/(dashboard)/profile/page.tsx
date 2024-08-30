import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import ChangePasswordForm from '@/components/forms/change-password.form';
import ProfileForm from '@/components/forms/profile.form';
import React from 'react';

const ProfileSetting = () => {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Profile" />
      <ProfileForm />
      <Heading children="Change Password" />
      <ChangePasswordForm />
    </div>
  );
};

export default ProfileSetting;
