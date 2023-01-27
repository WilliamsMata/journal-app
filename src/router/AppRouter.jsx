import { Navigate, Route, Routes } from "react-router-dom";

import { useCheckAuth } from "../hooks";
import { CheckingAuth } from "../ui";
import AuthRoutes from "../Auth/routes/AuthRoutes";
import JournalRoutes from "../journal/routes/JournalRoutes";

const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />

      {/* Login and sign up */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* main app */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};

export default AppRouter;
