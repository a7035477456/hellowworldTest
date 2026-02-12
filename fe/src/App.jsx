import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import DatabaseConnectionGuard from 'ui-component/DatabaseConnectionGuard';
import ThemeCustomization from 'themes';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <DatabaseConnectionGuard>
        <NavigationScroll>
          <>
            <RouterProvider router={router} />
          </>
        </NavigationScroll>
      </DatabaseConnectionGuard>
    </ThemeCustomization>
  );
}
