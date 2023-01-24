import { Route, Routes } from "react-router-dom";
import AuthRoutes from "../Auth/routes/AuthRoutes";
import JournalRoutes from "../journal/routes/JournalRoutes";

const AppRouter = () => {
  return (
    <Routes>
      {/* Login and sign up */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* main app */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};

export default AppRouter;
