export interface IAuthContext {
  login: (data: any) => Promise<void>;
  isAuth: boolean;
  loading: boolean;
  user: any;
  logout: () => void;
  // other properties...
}

// export interface NavItem {
//   children: any;
//   title: string;
//   href?: string;
//   disabled?: boolean;
//   external?: boolean;
//   icon?: keyof typeof Icons;
//   label?: string;
//   description?: string;
// }

export type NavItem = {
  title: string;
  href: string;
  icon: string;
  label: string;
  children?: NavItem[];
};

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
