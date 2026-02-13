// assets
import { IconDashboard, IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Célibataires',
  type: 'group',
  children: [
    {
      id: 'vettedSingles',
      title: 'Célibataires',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'allSingles',
          title: 'Tous les célibataires',
          type: 'item',
          url: '/dashboard/allSingles',
          breadcrumbs: false,
          customStyle: {
            fontFamily: 'Comic Sans MS',
            color: '#744DBC',
            fontWeight: 600
          }
        },
        {
          id: 'vettedSingles',
          title: 'Célibataires vérifiés',
          type: 'item',
          url: '/dashboard/vettedSingles',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'interestedSingles',
      title: 'Intéressé(e)s',
      type: 'item',
      url: '/dashboard/interestedSingles',
      icon: icons.IconUsers,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default dashboard;
