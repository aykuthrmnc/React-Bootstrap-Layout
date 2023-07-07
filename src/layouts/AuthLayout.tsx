import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { RootState } from "~/store";

const AuthLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (user) {
    return <Navigate to={location.state?.return_url || "/"} replace={true} />;
  }

  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center">
      <Row>
        <Col xs="12" md="8" lg="6" xl="4" className="mx-auto">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLayout;
