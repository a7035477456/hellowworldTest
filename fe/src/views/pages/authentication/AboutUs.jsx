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
                  Notre vision et notre cœur
                </Typography>
                <Typography variant="body1" paragraph>
                  Chez <strong>vsingles.club</strong>, nous croyons que l&apos;amour véritable est le voyage le plus significatif que vous puissiez faire. En tant que communauté pionnière dédiée à l&apos;art de la connexion, notre mission est d&apos;aider les adultes célibataires à trouver non seulement un partenaire, mais la personne qui leur correspond. En nous concentrant sur les valeurs partagées et les dimensions clés de la personnalité qui prédisent le succès à long terme, nous favorisons des connexions plus profondes et des rencontres plus authentiques.
                </Typography>
                <Typography variant="body1" paragraph>
                  Nous nous engageons à offrir une expérience d&apos;excellence qui évolue avec la technologie pour un environnement de confiance, inclusif et centré sur vous. Contrairement aux plateformes traditionnelles, nous avons mis en place une infrastructure de vérification unique pour le monde des rencontres — un niveau de contrôle rigoureux qui n&apos;existe pas sur les autres sites. Que vous cherchiez une âme sœur ou un partenaire pour la vie, nous offrons un espace accueillant où notre communauté diverse et dynamique peut s&apos;épanouir.
                </Typography>
                <Box sx={{ width: '100%', borderTop: 1, borderColor: 'divider', pt: 2, mt: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Pourquoi choisir vsingles.club ?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Nous savons qu&apos;ouvrir son cœur exige une base de confiance. C&apos;est pourquoi nous allons au-delà du profil standard ; <strong>vsingles.club</strong> propose un service de vérification dédié pour chaque membre. Ce processus est complet, unique, et offre une couche de sécurité et d&apos;authenticité que vous ne trouverez pas sur les autres sites de rencontres. En privilégiant votre sérénité grâce à notre processus de contrôle réfléchi, nous garantissons un environnement plus sûr et plus intentionné où vous pouvez vous concentrer sur l&apos;essentiel : trouver le bon amour.
                  </Typography>
                  <Stack component="ul" sx={{ pl: 2.5, m: 0 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Connexions authentiques :</strong> Bâties sur des décennies d&apos;expérience des relations compatibles.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Communauté mondiale :</strong> Rassembler les gens au-delà des frontières et des langues.
                    </Typography>
                    <Typography component="li" variant="body1">
                      <strong>Sécurité d&apos;abord :</strong> Un processus de vérification raffiné pour protéger votre cœur et votre expérience.
                    </Typography>
                  </Stack>
                </Box>
                <Button component={Link} to="/pages/login" variant="contained" color="secondary" sx={{ alignSelf: 'center', mt: 2 }}>
                  Retour à la connexion
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
