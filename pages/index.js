import Head from 'next/head'
import { useState, useEffect } from "react";
import { appFirebase } from "../configuracion/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from 'reactstrap';
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [iniciando, setIniciando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    appFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        router.push("/reportes");
      } else {
        setLoading(false);
      }
    });
  }, []);



  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("El correo electrónico es oblgatorio"),
      password: Yup.string().required("La contraseña es obligatoria")
    }),
    onSubmit: async valores => {

      const { email, password } = valores;

      try {
        setIniciando(true);

        appFirebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(result => {
            setIniciando(false);
            router.push("/reportes");
          })
          .catch(error => {
            switch (error.code) {
              case "auth/user-not-found":
                setError("Usuario no encontrado");
                break;
              case "auth/wrong-password":
                setError("Contraseña incorrecta");
                break;
              default:
                setError("Error desconocido, contacte al administrador");
                break;
            }
            setIniciando(false);
          });
      }
      catch (error) {
        setError(error.message);
      }
    }
  });

  if (loading) {
    return (
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <Spinner color="primary" />
        </div>
      </div>
    )
  }

  return (
    <div>

      <Head>
        <title>Inicia Sesión</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid">
        <div className="container " style={{ minHeight: "100%" }}>
          <div className="row justify-content-center">
            <div className="col-md-5 mt-5">
              <div className="row justify-content-center">
                <div className="col-md-7 text-center">
                  <img src="/user.png" style={{ maxHeight: 150 }} className="img-fluid text-center" />
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-12">

                  <div className="card shadow">

                    <div className="card-header bg-white border-0">
                      <h4>Ingresa tus credenciales</h4>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                      <div className="card-body">
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <label>Correo electrónico o usuario</label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.email ? (
                              <p className="text-danger">
                                {formik.errors.email}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <label>Contraseña</label>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.password ? (
                              <p className="text-danger">
                                {formik.errors.password}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="row mt-5">
                          <div className="col-md-12">
                            <button
                              className="btn btn-primary float-right"
                              type="submit"
                            >
                              Ingresar
                                {iniciando && <Spinner className="float-right mx-2 mt-1" color="light" size="sm" />}
                            </button>
                          </div>
                        </div>

                        <div className="row mt-5">
                          <div className="col-md-12">
                            <p className="text-danger">{error && error}</p>
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="row mt-5">
      <div className="col-md-12 text-center">
        <Spinner color="primary" />
      </div>
    </div>
  )
}


