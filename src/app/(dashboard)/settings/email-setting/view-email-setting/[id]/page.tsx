'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import EmailSettingForm from '@/components/forms/email-setting.form';
import { getEmailSettingById } from '@/services/email-setting.service';

export default function ViewEmailSetting() {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ['email-setting', id],
    queryFn: () => getEmailSettingById(Number(id))
  });

  return (
    <div>
      <EmailSettingForm initialValues={data} />
    </div>
  );
}
