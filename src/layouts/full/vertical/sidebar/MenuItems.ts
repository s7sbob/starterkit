// src/layouts/full/vertical/sidebar/MenuItems.ts
import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
  disabled?: boolean;
  subtitle?: string;
}

import {
  IconDashboard,
  IconCreditCard,
  IconPlus,
  IconQrcode,
  IconAnalyze,
  IconUser,
  IconSettings,
  IconBell,
  IconCrown,
  IconShare,
  IconEye,
  IconDownload,
  IconHelp,
  IconMail,
  IconUsers,
  IconChartBar,
  IconPalette,
  IconDeviceMobile,
  IconWorld,
  IconShield,
  IconStar
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  // Dashboard Section
  {
    navlabel: true,
    subheader: 'sidebar.sections.dashboard',
  },
  {
    id: uniqueId(),
    title: 'sidebar.dashboard.home',
    icon: IconDashboard,
    href: '/dashboard/home',
  },
  {
    id: uniqueId(),
    title: 'sidebar.dashboard.analytics',
    icon: IconAnalyze,
    href: '/dashboard/analytics',
    chip: 'sidebar.chips.new',
    chipColor: 'primary',
  },

  // Cards Management Section
  {
    navlabel: true,
    subheader: 'sidebar.sections.cards',
  },
  {
    id: uniqueId(),
    title: 'sidebar.cards.myCards',
    icon: IconCreditCard,
    href: '/dashboard/cards',
  },
  {
    id: uniqueId(),
    title: 'sidebar.cards.createNew',
    icon: IconPlus,
    href: '/dashboard/cards/create',
    chip: 'sidebar.chips.create',
    chipColor: 'success',
  },
  {
    id: uniqueId(),
    title: 'sidebar.cards.templates',
    icon: IconPalette,
    href: '/dashboard/cards/templates', // تصحيح المسار
  },

  // QR & Sharing Section
  {
    navlabel: true,
    subheader: 'sidebar.sections.sharing',
  },
  {
    id: uniqueId(),
    title: 'sidebar.qr.generator',
    icon: IconQrcode,
    href: '/dashboard/qr',
  },
  {
    id: uniqueId(),
    title: 'sidebar.sharing.share',
    icon: IconShare,
    href: '/dashboard/share',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.sharing.publicView',
    icon: IconEye,
    href: '/dashboard/public-view',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },

  // Contacts & Networking
  {
    navlabel: true,
    subheader: 'sidebar.sections.networking',
  },
  {
    id: uniqueId(),
    title: 'sidebar.contacts.contacts',
    icon: IconUsers,
    href: '/dashboard/contacts',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.contacts.leads',
    icon: IconChartBar,
    href: '/dashboard/leads',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },

  // Tools & Features
  {
    navlabel: true,
    subheader: 'sidebar.sections.tools',
  },
  {
    id: uniqueId(),
    title: 'sidebar.tools.nfc',
    icon: IconDeviceMobile,
    href: '/dashboard/nfc',
    chip: 'sidebar.chips.pro',
    chipColor: 'warning',
  },
  {
    id: uniqueId(),
    title: 'sidebar.tools.landingPages',
    icon: IconWorld,
    href: '/dashboard/landing-pages',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.tools.downloads',
    icon: IconDownload,
    href: '/dashboard/downloads',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },

  // Account & Settings
  {
    navlabel: true,
    subheader: 'sidebar.sections.account',
  },
  {
    id: uniqueId(),
    title: 'sidebar.account.profile',
    icon: IconUser,
    href: '/dashboard/profile',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.account.subscription',
    icon: IconCrown,
    href: '/dashboard/subscription',
    chip: 'sidebar.chips.upgrade',
    chipColor: 'secondary',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.account.notifications',
    icon: IconBell,
    href: '/dashboard/notifications',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.account.settings',
    icon: IconSettings,
    href: '/dashboard/settings',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.account.privacy',
    icon: IconShield,
    href: '/dashboard/privacy',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },

  // Support & Help
  {
    navlabel: true,
    subheader: 'sidebar.sections.support',
  },
  {
    id: uniqueId(),
    title: 'sidebar.support.help',
    icon: IconHelp,
    href: '/dashboard/help',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.support.contact',
    icon: IconMail,
    href: '/dashboard/contact',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },
  {
    id: uniqueId(),
    title: 'sidebar.support.feedback',
    icon: IconStar,
    href: '/dashboard/feedback',
    subtitle: 'sidebar.support.feedbackSubtitle',
    chip: 'sidebar.chips.soon',
    chipColor: 'info',
    variant: 'outlined',
  },

  // External Links
  {
    id: uniqueId(),
    title: 'sidebar.external.website',
    external: true,
    icon: IconWorld,
    href: 'https://mazyone.com',
  },
];

export default Menuitems;
