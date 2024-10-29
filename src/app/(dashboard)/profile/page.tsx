import ChangePasswordForm from '@/components/forms/change-password.form';
import ProfileForm from '@/components/forms/profile.form';
import React from 'react';

const ProfileSetting = () => {
  return (
    <div>
      <ProfileForm />
      <ChangePasswordForm />
    </div>
  );
};

export default ProfileSetting;
