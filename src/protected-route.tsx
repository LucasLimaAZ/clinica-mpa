import { Navigate } from "react-router-dom";
import { checkAuthorization } from "./shared/helper";
import Container from "./components/Container/Container";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  if (!checkAuthorization()) {
    return <Navigate to="/login" replace />;
  }
  return <Container>{children}</Container>;
};

export default ProtectedRoute;
