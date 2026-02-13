// assets
import { IconTypography } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Vérification',
  type: 'group',
  children: [
    {
      id: 'util-vetself',
      title: 'Mes infos de vérification',
      type: 'item',
      url: '/verifyself',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-about-me',
      title: 'Demandes reçues à mon sujet',
      type: 'item',
      url: '/dashboard/request-about-me',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-sent',
      title: "Demandes que j'ai envoyées",
      type: 'item',
      url: '/dashboard/request-ive-sent',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default utilities;
