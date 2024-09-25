import { NavItem } from '@/types';

export const navItems: { [key: string]: NavItem[] } = {
  super_admin: [
    {
      title: 'Dashboard',
      href: '/',
      icon: 'view-dashboard',
      label: 'Dashboard',
      children: undefined
    },
    {
      title: 'Company',
      href: '/company/',
      icon: 'company',
      label: 'company',
      children: undefined
    }
  ],
  system_admin: [
    {
      title: 'Dashboard',
      href: '/',
      icon: 'view-dashboard',
      label: 'Dashboard',
      children: undefined
    },
    {
      title: 'Property Co-Admin',
      href: '/property-co-admin/',
      icon: 'user-group',
      label: 'property-co-admin',
      children: undefined
    },
    // {
    //   title: 'Property User',
    //   href: '/property-user/',
    //   icon: 'profile',
    //   label: 'property-user',
    //   children: undefined
    // },
    // {
    //   title: 'Invoice',
    //   href: '/invoice/',
    //   icon: 'profile',
    //   label: 'invoice',
    //   children: undefined
    // },

    // {
    //   title: 'Billing Model',
    //   href: '/billing-model/',
    //   icon: 'profile',
    //   label: 'billing-model',
    //   children: undefined
    // },
    // {
    //   title: 'Billing Cycle',
    //   href: '/billing-cycle/',
    //   icon: 'profile',
    //   label: 'billing-cycle',
    //   children: undefined
    // },
    // {
    //   title: 'Settings',
    //   href: '#',
    //   icon: 'settings',
    //   label: 'settings',
    //   children: [
    //     {
    //       title: 'System Setting',
    //       href: '/settings/system-setting/',
    //       icon: 'profile',
    //       label: 'system-setting'
    //     },
    //     {
    //       title: 'Company Setting',
    //       href: '/settings/company-setting/',
    //       icon: 'profile',
    //       label: 'company-setting'
    //     },
    //     {
    //       title: 'Email Setting',
    //       href: '/settings/email-setting/',
    //       icon: 'profile',
    //       label: 'email-setting'
    //     },
    //     {
    //       title: 'SMS Setting',
    //       href: '/settings/sms-setting/',
    //       icon: 'profile',
    //       label: 'sms-setting'
    //     },
    //     {
    //       title: 'Payment Gateway Setting',
    //       href: '/settings/payment-gateway-setting/',
    //       icon: 'profile',
    //       label: 'payment-gateway-setting'
    //     },
    //     {
    //       title: 'Email Notification Setting',
    //       href: '/settings/email-notification-setting/',
    //       icon: 'profile',
    //       label: 'email-notification-setting'
    //     },
    //     {
    //       title: 'SMS Notification Setting',
    //       href: '/settings/sms-notification-setting/',
    //       icon: 'profile',
    //       label: 'sms-notification-setting'
    //     }
    //   ]
    // },
    {
      title: 'Tenant',
      href: '/tenant/',
      icon: 'users-group-outline',
      label: 'tenant',
      children: undefined
    },
    {
      title: 'Leasable Unit',
      href: '/leasable-unit/',
      icon: 'alpha-l-circle-outline',
      label: 'leasable-unit',
      children: undefined
    }

    // {
    //   title: 'Tenant Co-Admin',
    //   href: '/tenant-co-admin/',
    //   icon: 'profile',
    //   label: 'tenant-co-admin',
    //   children: undefined
    // },
    // {
    //   title: 'Tenant User',
    //   href: '/tenant-user/',
    //   icon: 'profile',
    //   label: 'tenant-user',
    //   children: undefined
    // }
  ]
};
