import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
