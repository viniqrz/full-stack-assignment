import "./App.css";
import { Route, Routes } from "react-router";
import { Album, Home, Profile } from "./pages";
import { ROUTES } from "./constants/routes";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME()} element={<Home />} />
        <Route path={ROUTES.PROFILE()} element={<Profile />} />
        <Route path={ROUTES.ALBUM()} element={<Album />} />
      </Routes>
    </Layout>
  );
}

export default App;
