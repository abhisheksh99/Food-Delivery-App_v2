import Login from "./auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Order from "./components/Order";
import { useUserStore } from "./store/useUserStore";
import Loading from "./components/Loading";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user , isCheckingAuth} = useUserStore();

  if (isCheckingAuth) {
    return <Loading />;
}
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }



  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route index={true} element={<HeroSection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:text" element={<SearchPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/status" element={<Order />} />

          {/* Admin */}
          <Route
            path="/admin/restaurant"
            element={
              <AdminRoute>
                <Restaurant />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <AddMenu />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
        </Route>

        {/* Common */}
        <Route
          path="/login"
          element={
            <AuthenticatedUser>
              <Login />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticatedUser>
              <Signup />
            </AuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthenticatedUser>
              <ForgotPassword />
            </AuthenticatedUser>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
