import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| PRIVACY POLICY ||================================ //

export default function PrivacyPolicy() {
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
                  Politique de confidentialité vsingles.club
                </Typography>
                <Typography variant="body1" paragraph>
                  Cette politique décrit nos protocoles de confidentialité pour vsingles.club concernant la collecte, le stockage, l&apos;utilisation et le partage des données. Elle s&apos;applique à toutes les informations collectées via nos Services (applications mobiles et sites web) gérés par vsingles.club et ses partenaires. En utilisant les Services, vous acceptez cette politique et nos Conditions générales. Nous pouvons la mettre à jour ; une utilisation continue après mise à jour vaut acceptation.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Collecte des données : quoi et comment</Typography>
                <Typography variant="body1" paragraph>
                  Nous collectons des informations personnelles pour faciliter les mises en relation. Les données fournies peuvent inclure noms, e-mails, téléphones, adresses, dates de naissance, préférences et notes ; notre quiz de compatibilité aide à générer des profils. Les photos que vous uploadez peuvent être visibles. Nous conservons les échanges avec le support ou d&apos;autres membres. Pour les abonnements nous traitons noms, adresses et informations de paiement ; vous pouvez demander la suppression des données de paiement. Vous pouvez fournir des informations sensibles (religion, origine, identité de genre) ; vous pouvez les modifier ou les masquer. Nous pouvons utiliser la biométrie avec consentement pour la vérification d&apos;identité ou la prévention des fraudes. Nous collectons automatiquement des données techniques (IP, navigateur, FAI, identifiants d&apos;appareil) et utilisons des cookies et balises. Les cookies essentiels assurent la sécurité et la navigation ; les cookies d&apos;analyse nous aident à comprendre l&apos;usage. Vous pouvez désactiver les cookies mais certaines fonctionnalités peuvent ne plus fonctionner.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. Finalité de l&apos;utilisation des données</Typography>
                <Typography variant="body1" paragraph>
                  Nous utilisons les informations pour faire fonctionner et sécuriser la plateforme, maintenir votre profil et afficher les champs pertinents aux correspondances, traiter les transactions et offrir des promotions, vérifier les identités par SMS, mener des études anonymisées et répondre aux obligations légales et réglementaires.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Partage et divulgation</Typography>
                <Typography variant="body1" paragraph>
                  Nous ne vendons pas vos coordonnées aux correspondances. Nous pouvons partager des éléments de profil (statut de connexion, scores de compatibilité, photos) avec des correspondances potentielles ; avec des prestataires (hébergement, paiement, support) ; pour des raisons légales (citation, sécurité) ; pour la prévention des abus ; et dans le cadre de transferts d&apos;activité (fusion ou vente d&apos;actifs).
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. Sécurité et transferts internationaux</Typography>
                <Typography variant="body1" paragraph>
                  Nous utilisons pare-feu, chiffrement SSL et mesures physiques. Les serveurs sont situés aux États-Unis et en Allemagne ; les données peuvent être transférées au-delà des frontières. L&apos;utilisation du service vaut consentement à ces transferts.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>5. Vos droits et choix</Typography>
                <Typography variant="body1" paragraph>
                  Vous pouvez refuser les e-mails promotionnels. Vous avez le droit de demander une copie de vos données ou des corrections (certaines modifications nécessitent une vérification). Les membres Basic peuvent supprimer leur profil via Données et paramètres ; les membres Premium ou avec achats inutilisés peuvent devoir faire une demande. Les données de compte Basic inactif sont généralement supprimées après 2 ans ; les données Premium sont conservées pendant la durée d&apos;abonnement, puis les règles Basic s&apos;appliquent.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>6. Informations selon les juridictions</Typography>
                <Typography variant="body1" paragraph>
                  Les résidents américains peuvent disposer de droits spécifiques concernant la publicité ciblée. vsingles.club ne vend pas les données utilisateur pour la publicité comportementale cross-contexte. Les résidents de Californie (CCPA/CPRA) ont des droits supplémentaires ; résumé ci-dessous :
                </Typography>
                <Paper variant="outlined" sx={{ width: '100%', overflow: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Catégorie</strong></TableCell>
                        <TableCell><strong>Source</strong></TableCell>
                        <TableCell><strong>Finalité</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Identifiants (nom, IP, e-mail)</TableCell>
                        <TableCell>Utilisateur / technique web</TableCell>
                        <TableCell>Gestion de compte, mise en relation, support</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Données sensibles (origine, religion)</TableCell>
                        <TableCell>Utilisateur</TableCell>
                        <TableCell>Mise en relation et compatibilité</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Infos commerciales (historique d&apos;achats)</TableCell>
                        <TableCell>Utilisateur</TableCell>
                        <TableCell>Facturation et analyse des tendances</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Activité réseau (interaction avec le site)</TableCell>
                        <TableCell>Technique web</TableCell>
                        <TableCell>Sécurité et optimisation du site</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Contact et litiges</Typography>
                <Typography variant="body1" paragraph>
                  Pour toute question relative à la confidentialité ou pour exercer vos droits sur les données, contactez vsingles.club à privacy@vsingles.club.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date d&apos;entrée en vigueur : 8 septembre 2025.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2025 vsingles.club. Tous droits réservés.
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
