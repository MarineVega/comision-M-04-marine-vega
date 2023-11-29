import { RouterProvider } from 'react-router-dom';

import { rutas } from './router.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';

const App = () => {
  return(
    <AuthProvider>
      <DefaultLayout>
        <RouterProvider router={rutas} />
      </DefaultLayout>
    </AuthProvider>

  )
}

export default App
