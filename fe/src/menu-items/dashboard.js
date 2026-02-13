// assets
import { IconDashboard, IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Độc thân',
  type: 'group',
  children: [
    {
      id: 'vettedSingles',
      title: 'Độc thân',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'allSingles',
          title: 'Tất cả độc thân',
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
          title: 'Độc thân đã xác minh',
          type: 'item',
          url: '/dashboard/vettedSingles',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'interestedSingles',
      title: 'Quan tâm',
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
