import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Alert severity="error">Erreur 404 – Cette page n&apos;existe pas !</Alert>;
    }

    if (error.status === 401) {
      return <Alert severity="error">Erreur 401 – Vous n&apos;êtes pas autorisé à voir ce contenu</Alert>;
    }

    if (error.status === 503) {
      return <Alert severity="error">Erreur 503 – Notre API semble indisponible</Alert>;
    }

    if (error.status === 418) {
      return <Alert severity="error">Erreur 418 – Contacter l&apos;administrateur</Alert>;
    }
  }

  return <Alert severity="error">Maintenance en cours</Alert>;
}
