import { useEffect, useState } from "react";
import { appFirebase } from "../../configuracion/firebase";
import { useRouter } from "next/router";
import { Col, Row, Spinner } from "reactstrap";
import Layout from "../../components/layout";
import { PageHeader, Button, BackTop } from "antd";
import TablaDatos from "../../components/TablaDatos";
import ModalNuevo from "../../components/ModalNuevo";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Filtro from "../../components/Filtro";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Index() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState(null);
    const [escuelas, setEscuelas] = useState(0);
    const [alumnos, setAlumnos] = useState(0);
    const [iq, setIq] = useState(0);
    const [estadoColumnas, setEstadoColumnas] = useState(0);
    const [activarSpinner, setActivarSpinner] = useState(false);

    const [visibilidadModal, setVisibilidadModal] = useState(false);

    useEffect(() => {
        appFirebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setLoading(false);
            } else {
                router.push("/");
            }
        });
    }, []);


    if (loading) {
        return (
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <Spinner color="primary" />
                </div>
            </div>
        )
    }


    function crearPdf() {
        setEstadoColumnas(1);
        setActivarSpinner(true);
        <Spinner />
        setTimeout(() => {
            const doc = new jsPDF('landscape');
            autoTable(doc, {
                html: '#tblDatos', styles: {
                    overflow: 'linebreak',
                    fontSize: 8
                },
            });
            doc.save('Reportes.pdf')
            setEstadoColumnas(0);
            setActivarSpinner(false);
        }, 10);

    }

    function imprimirPdf() {
        setEstadoColumnas(1);

        var myWindow = window.open('', 'PRINT', 'height=400, width=600');
        myWindow.document.write('<html><head><title> Reportes </title>');
        myWindow.document.write('</head><body>');
        myWindow.document.write(document.getElementById('tblReportes').innerHTML);
        myWindow.document.write('</body></html>');

        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();
        setEstadoColumnas(0);
    }

    return (
        <Layout>
            <PageHeader
                title="Datos escolares"
                className="site-page-header"
                extra={[
                    <Button key="1231" style={{ background: "rgb(63, 134, 0)", border: 0 }} type="primary" shape="round" size="large" onClick={() => setVisibilidadModal(true)} >Agregar nuevo</Button>,
                ]}
                avatar={{ src: '/fi.png' }}
            >
                <BackTop />

                <ModalNuevo visible={visibilidadModal} setVisible={setVisibilidadModal} />

                <Filtro setDatos={setDatos} setEscuelas={setEscuelas} setAlumnos={setAlumnos} alumnos={alumnos} escuelas={escuelas} setIq={setIq} iq={iq} />

                {escuelas > 0 &&
                    <Row className="mt-5">
                        <Col md="6">
                            <p>
                                Escuelas: {escuelas} , total de alumnos: {alumnos} , Iq: {iq}
                            </p>
                        </Col>

                        <Col >
                            <div className="float-right">
                                <button className="btn btn-danger " onClick={crearPdf}>Exportar a PDF
                                {
                                        activarSpinner !== false &&
                                        <Spinner color="white" size="sm" className="ml-2" />

                                    }
                                </button>
                                  &nbsp; &nbsp;
                            <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn btn-success "
                                    table="tblDatos"
                                    filename="Reporte"
                                    sheet="tablexls"
                                    buttonText="Exportar a Excel"
                                />
                            </div>
                        </Col>
                        <Col><button className="btn btn-warning " onClick={imprimirPdf}>Imprimir</button></Col>
                    </Row>
                }

                <Row className="mt-5">
                    <Col md="12" className="table-responsive">
                        <TablaDatos datos={datos} estadoColumnas={estadoColumnas} />
                    </Col>
                </Row>

            </PageHeader>
        </Layout>
    )
}




