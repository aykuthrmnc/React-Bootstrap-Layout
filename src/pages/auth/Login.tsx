import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "~/validation";
import { userLoginHandle } from "~/utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "aykut",
      password: "1",
    },
  });

  const onSubmit = (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          userLoginHandle({ id: 1, name: "Aykut", token: "Giriş yapıldı." });
        } finally {
          resolve(true);
        }
      }, 500);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>E-posta adresi</Form.Label>
            <Form.Control type="text" placeholder="E-posta adresi" {...register("email")} />
            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" placeholder="Şifre" {...register("password")} />
            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
          </Form.Group>
          <Button variant="primary" type="submit" className="d-flex align-items-center justify-content-center gap-2 mb-3" disabled={isSubmitting}>
            {isSubmitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            Giriş yap
          </Button>
          <Button variant="danger" type="button" onClick={() => reset()}>
            Sıfırla
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Login;
