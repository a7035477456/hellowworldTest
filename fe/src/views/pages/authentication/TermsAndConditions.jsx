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

// ================================|| TERMS AND CONDITIONS ||================================ //

export default function TermsAndConditions() {
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)', py: 3 }}>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0, maxWidth: 900, width: '100%' }}>
            <AuthCardWrapper sx={{ maxWidth: { xs: '100%', lg: 900 } }}>
              <Stack spacing={2} sx={{ alignItems: 'flex-start', textAlign: 'left', maxHeight: '70vh', overflow: 'auto' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Conditions générales du service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Imprimer ou enregistrer en PDF
                </Typography>
                <Typography variant="body1" paragraph>
                  Le présent accord entre vous et <strong>vsingles.club</strong> s&apos;applique au site vsingles.club, à nos applications mobiles (iOS et Android) et à tous les services associés (les « Services »). En accédant ou en utilisant nos Services, vous reconnaissez avoir lu, compris et accepté d&apos;être lié par ces conditions (y compris notre Politique de confidentialité) pendant la durée de votre utilisation. Certaines fonctionnalités peuvent avoir des règles supplémentaires ; nous pouvons mettre à jour cet accord et publier une version révisée sur cette page.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>Tableau récapitulatif des sections</Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                  <Typography component="li" variant="body2">1. Éligibilité</Typography>
                  <Typography component="li" variant="body2">2. Utilisation des Services</Typography>
                  <Typography component="li" variant="body2">3. Droits de propriété</Typography>
                  <Typography component="li" variant="body2">4. Informations utilisateur</Typography>
                  <Typography component="li" variant="body2">5. Risque et sécurité</Typography>
                  <Typography component="li" variant="body2">6. Limitation de garantie</Typography>
                  <Typography component="li" variant="body2">7. Limitation de responsabilité</Typography>
                  <Typography component="li" variant="body2">8. Droit de rétractation (selon l&apos;État)</Typography>
                  <Typography component="li" variant="body2">9. Arbitrage et renonciation à l&apos;action collective</Typography>
                  <Typography component="li" variant="body2">10. Renouvellement automatique</Typography>
                  <Typography component="li" variant="body2">10. Confidentialité et communication</Typography>
                  <Typography component="li" variant="body2">18. Date de révision</Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Éligibilité</Typography>
                <Typography variant="body1" paragraph>
                  Vous devez avoir 18 ans ou plus et être célibataire ou légalement séparé(e). vsingles.club n&apos;effectue pas actuellement de vérifications automatiques du casier judiciaire mais se réserve le droit de le faire.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. Utilisation des Services</Typography>
                <Typography variant="body1" paragraph>
                  L&apos;adhésion Basic est gratuite et inclut l&apos;évaluation de compatibilité, un profil limité et des interactions prédéfinies. L&apos;adhésion Premium inclut des fonctionnalités payantes (photos nettes, filtres avancés, déblocage de correspondances, biens virtuels). La facturation est soumise à la politique de renouvellement et d&apos;annulation. L&apos;utilisation des applications mobiles est également soumise aux conditions Apple/Google.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Droits de propriété</Typography>
                <Typography variant="body1" paragraph>
                  vsingles.club conserve les droits sur sa technologie et son contenu et vous accorde une licence personnelle, non commerciale et limitée.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. Informations utilisateur</Typography>
                <Typography variant="body1" paragraph>
                  Nous traitons vos données comme décrit dans notre Politique de confidentialité. Vous êtes responsable du contenu que vous publiez. Ne publiez pas de coordonnées personnelles (e-mail, téléphone, adresse) sur votre profil public.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>5. Risque et sécurité</Typography>
                <Typography variant="body1" paragraph>
                  Veuillez consulter nos Règles de sécurité.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>6. Limitation de garantie</Typography>
                <Typography variant="body1" paragraph>
                  Les Services sont fournis « en l&apos;état ».
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Limitation de responsabilité</Typography>
                <Typography variant="body1" paragraph>
                  La responsabilité totale est limitée au montant payé pour le compte ou 25,00 $.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>8. Droit de rétractation (selon l&apos;État)</Typography>
                <Typography variant="body1" paragraph>
                  Les résidents de AZ, CA, CO, CT, IL, IA, MN, NY, NC, OH, RI, WI peuvent avoir des droits d&apos;annulation supplémentaires. Annuler par e-mail : subscriptions@vsingles.club.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>9. Arbitrage et renonciation à l&apos;action collective</Typography>
                <Typography variant="body1" paragraph>
                  L&apos;arbitrage individuel obligatoire s&apos;applique comme indiqué dans les conditions complètes.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>10. Renouvellement automatique</Typography>
                <Typography variant="body1" paragraph>
                  Le processus de renouvellement automatique et la procédure pour le désactiver sont décrits dans les conditions complètes.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Date de révision : cet accord a été mis à jour le 12 février 2026.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Copyright © 2026 vsingles.club. Tous droits réservés.
                </Typography>
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
