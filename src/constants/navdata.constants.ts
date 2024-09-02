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
    title: 'Property Co-Admin',
    href: '/property-co-admin/',
    icon: 'profile',
    label: 'property-co-admin'
  },
  {
    title: 'Tenants',
    href: '/tenants/',
    icon: 'profile',
    label: 'tenant'
  },
  {
    title: 'Leasable Unit',
    href: '/leasable-unit/',
    icon: 'profile',
    label: 'leasable-unit'
  },
  {
    title: 'Email Setting',
    href: '/settings/email-setting/',
    icon: 'profile',
    label: 'email-setting'
  }
];
