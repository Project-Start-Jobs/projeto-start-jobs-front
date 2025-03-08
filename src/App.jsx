import AppRouter from './pages/AppRoutes/AppRoutes';
import { AuthProvider } from './context/auth-context';
import { Bounce, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='214187768471-9ct2tn4d50b3lst9tcbubs1if2jq53ba.apps.googleusercontent.com'>
      <AuthProvider>
        <AppRouter />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
          aria-live='polite'
        />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
