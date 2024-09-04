import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Company',
    href: '/company/',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Property User',
    href: '/property-user/',
    icon: 'profile',
    label: 'property-user'
  },
  {
    title: 'Tenants',
    href: '/tenants/',
    icon: 'profile',
    label: 'tenant'
  },
  {
    title: 'Invoice',
    href: '/invoice/',
    icon: 'profile',
    label: 'invoice'
  },
  {
    title: 'Leasable Unit',
    href: '/leasable-unit/',
    icon: 'profile',
    label: 'leasable-unit'
  },
  {
    title: 'Settings',
    href: '#', // Parent item does not have a link
    icon: 'settings', // Assuming you have an icon for settings
    label: 'settings',
    children: [
      {
        title: 'System Setting',
        href: '/settings/system-setting/',
        icon: 'profile',
        label: 'system-setting'
      },
      {
        title: 'Company Setting',
        href: '/settings/company-setting/',
        icon: 'profile',
        label: 'company-setting'
      },
      {
        title: 'Email Setting',
        href: '/settings/email-setting/',
        icon: 'profile',
        label: 'email-setting'
      },
      {
        title: 'SMS Setting',
        href: '/settings/sms-setting/',
        icon: 'profile',
        label: 'sms-setting'
      },
      {
        title: 'Payment Gateway Setting',
        href: '/settings/payment-gateway-setting/',
        icon: 'profile',
        label: 'payment-gateway-setting'
      },
      {
        title: 'Email Notification Setting',
        href: '/settings/email-notification-setting/',
        icon: 'profile',
        label: 'email-notification-setting'
      },
      {
        title: 'SMS Notification Setting',
        href: '/settings/sms-notification-setting/',
        icon: 'profile',
        label: 'sms-notification-setting'
      }
    ]
  }
];
