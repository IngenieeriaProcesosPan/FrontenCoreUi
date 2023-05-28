/* eslint-disable react/react-in-jsx-scope */
import { CSpinner } from "@coreui/react-pro";
import { DefaultLayout } from "@layout/DefaultLayout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginProtected } from "./components/LoginProtected";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <CSpinner color="primary" />
  </div>
);

const Page404 = lazy(() => import("@pages/Page404"));
const Login = lazy(() => import("@src/pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<LoginProtected />}>
            <Route path="/home/*" element={<DefaultLayout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
