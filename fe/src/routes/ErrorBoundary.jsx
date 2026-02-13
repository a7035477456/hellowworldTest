import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Alert severity="error">Lỗi 404 - Trang không tồn tại!</Alert>;
    }

    if (error.status === 401) {
      return <Alert severity="error">Lỗi 401 - Bạn không có quyền xem trang này</Alert>;
    }

    if (error.status === 503) {
      return <Alert severity="error">Lỗi 503 - API tạm thời không khả dụng</Alert>;
    }

    if (error.status === 418) {
      return <Alert severity="error">Lỗi 418 - Liên hệ quản trị viên</Alert>;
    }
  }

  return <Alert severity="error">Đang bảo trì</Alert>;
}
