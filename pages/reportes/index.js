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
        const doc = new jsPDF('landscape');

        autoTable(doc, {
            html: '#tblDatos', styles: {
                overflow: 'linebreak',
                fontSize: 8
            },
        });
        doc.save('Reportes.pdf')
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
                                <button className="btn btn-danger " onClick={crearPdf}>Exportar a PDF</button>
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

                    </Row>
                }

                <Row className="mt-5">
                    <Col md="12" className="table-responsive">
                        <TablaDatos datos={datos} />
                    </Col>
                </Row>

            </PageHeader>
        </Layout>
    )
}