'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import EmailSettingColumn from '@/utils/tableColumn/email-setting.column';
import { getEmailSetting } from '@/services/email-setting.service';

export default function TenantPage() {
  const { status, data, error } = useQuery({
    queryKey: ['email-setting'],
    queryFn: getEmailSetting
  });
  console.log('data', data);

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <DataTable
        columns={EmailSettingColumn}
        data={data}
        path="/settings/email-setting/register-email-setting"
      />
    </div>
  );
}
