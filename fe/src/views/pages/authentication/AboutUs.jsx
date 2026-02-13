import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| ABOUT US - OUR VISION & HEART ||================================ //

export default function AboutUs() {
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0, maxWidth: 720 }}>
            <AuthCardWrapper>
              <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'left' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, alignSelf: 'flex-start' }}>
                  Tầm nhìn &amp; Trái tim của chúng tôi
                </Typography>
                <Typography variant="body1" paragraph>
                  Tại <strong>vsingles.club</strong>, chúng tôi tin rằng tình yêu đích thực là hành trình ý nghĩa nhất bạn từng trải qua. Là cộng đồng tiên phong dành cho nghệ thuật kết nối, sứ mệnh của chúng tôi là giúp người độc thân tìm không chỉ một đối tác mà còn là tri kỷ. Bằng cách tập trung vào giá trị cốt lõi chung và các chiều kích tính cách dự báo thành công lâu dài, chúng tôi ủng hộ kết nối sâu sắc và những cuộc hẹn chân thành hơn.
                </Typography>
                <Typography variant="body1" paragraph>
                  Chúng tôi cam kết mang lại trải nghiệm tốt nhất, phát triển cùng công nghệ để đảm bảo môi trường đáng tin cậy, toàn diện và lấy khách hàng làm trung tâm. Khác với nền tảng truyền thống, chúng tôi đi tiên phong với hạ tầng xác minh độc đáo dành riêng cho hẹn hò—mức độ xác minh chặt chẽ mà bạn không tìm thấy trên các trang hẹn hò khác. Dù bạn tìm tri âm hay bạn đời, chúng tôi tạo không gian chào đón để cộng đồng đa dạng và năng động của chúng tôi phát triển.
                </Typography>
                <Box sx={{ width: '100%', borderTop: 1, borderColor: 'divider', pt: 2, mt: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Tại sao chọn vsingles.club?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Chúng tôi hiểu rằng mở lòng cần nền tảng tin cậy. Vì vậy chúng tôi vượt xa hồ sơ thông thường; <strong>vsingles.club</strong> cung cấp dịch vụ xác minh riêng cho từng thành viên. Quy trình toàn diện, độc đáo, mang lại lớp bảo mật và xác thực mà bạn không tìm thấy trên các trang hẹn hò khác. Bằng cách ưu tiên sự yên tâm của bạn qua quy trình sàng lọc chu đáo, chúng tôi đảm bảo môi trường an toàn, có chủ đích hơn để bạn tập trung vào điều thực sự quan trọng: tìm đúng tình yêu.
                  </Typography>
                  <Stack component="ul" sx={{ pl: 2.5, m: 0 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Kết nối chân thật:</strong> Xây dựng trên hàng thập kỷ hiểu biết về mối quan hệ tương thích.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Cộng đồng toàn cầu:</strong> Kết nối mọi người vượt biên giới và ngôn ngữ.
                    </Typography>
                    <Typography component="li" variant="body1">
                      <strong>An toàn trên hết:</strong> Quy trình xác minh tinh gọn để bảo vệ trái tim và trải nghiệm của bạn.
                    </Typography>
                  </Stack>
                </Box>
                <Button component={Link} to="/pages/login" variant="contained" color="secondary" sx={{ alignSelf: 'center', mt: 2 }}>
                  Quay lại đăng nhập
                </Button>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </Stack>
        <Box sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
