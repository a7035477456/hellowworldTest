// assets
import { IconTypography } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Xác minh',
  type: 'group',
  children: [
    {
      id: 'util-vetself',
      title: 'Thông tin xác minh của tôi',
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
      title: 'Yêu cầu về tôi từ người khác',
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
      title: 'Yêu cầu tôi đã gửi',
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
