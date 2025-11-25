import Header from "./Components/Main_box/Header/Header";
import Footer from "./Components/Main_box/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const noLayoutPages = ["/about", "/signin", "/login"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <div className="app-root">
      {!hideLayout && <Header />}
      <main className="app-main">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
