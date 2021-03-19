import { useEffect, useState } from "react";
import { appFirebase } from "../../configuracion/firebase";
import { useRouter } from "next/router";
import { Col, FormGroup, Row, Spinner } from "reactstrap";
import Layout from "../../components/layout";
import { PageHeader, Button, Input, Select } from "antd";
import TablaDatos from "../../components/TablaDatos";
import { db } from "../../configuracion/firebase";

import ModalNuevo from "../../components/ModalNuevo";

import Municipios from "../../datos/Municipios.json";
import Acapulco from "../../datos/AcapulcodeJuárez.json";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const { Option } = Select;

export default function Index() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState(null);
    const [localidades, setLocalidades] = useState([]);
    const [municipio, SetMunicipio] = useState("");

    const [region, setRegion] = useState("");

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


    const consultarDatos = async () => {
        try {
            const ref = db.collection("escuelas");
            const snapshot = await ref.get();
            if (snapshot.empty) {
                setLoading(false);
                alert("no hay datos");
            }
            else {
                setDatos(snapshot);

                snapshot.forEach(doc => {
                    console.log(doc.data().CCT);
                })
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cambiarMunicipio = (e) => {
        switch (e) {
            case "Acapulco de Juárez":
                setLocalidades(Acapulco);
                break;
            default:
                setLocalidades(null);
                break;
        }
        SetMunicipio(e);
    }


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
        <Layout>
            <PageHeader
                title="Datos escolares"
                className="site-page-header"
                extra={[
                    <Button key="1231" style={{ background: "rgb(63, 134, 0)", border: 0 }} type="primary" shape="round" size="large" onClick={() => setVisibilidadModal(true)} >Agregar nuevo</Button>,
                ]}
                avatar={{ src: '/fi.png' }}
            >
                <ModalNuevo visible={visibilidadModal} setVisible={setVisibilidadModal} />

                <p>
                    Para visualizar los datos, primero elige un tipo de filtro.
                </p>

                <Row>
                    <Col md="2">
                        <FormGroup>
                            <label>CCT</label>
                            <Input type="text" size="large" style={{ width: "100%" }} />
                        </FormGroup>
                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <label>Región</label>
                            <Select
                                placeholder="Elige una opción"
                                size="large"
                                style={{ width: "100%" }}
                                onChange={(e) => setRegion(e)}
                            >
                                <Option value="CENTRO">Centro</Option>
                                <Option value="ACAPULCO">Acapulco</Option>
                                <Option value="MONTAÑA">Montaña</Option>
                            </Select>
                        </FormGroup>
                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <label>Municipio</label>
                            <Select
                                showSearch
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Escribe un municipio"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={cambiarMunicipio}
                                value={municipio}
                            >
                                {
                                    Municipios.map((municipio, index) => {
                                        return (
                                            <Option key={index} value={municipio.label}>{municipio.label}</Option>
                                        );
                                    })
                                }
                            </Select>
                        </FormGroup>
                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <label>Localidad</label>
                            <Select
                                showSearch
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Escribe un municipio"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    localidades !== null && localidades.map((localidad, index) => {
                                        return (
                                            <Option key={index} value={localidad.nombre}>{localidad.nombre}</Option>
                                        );
                                    })
                                }
                            </Select>
                        </FormGroup>
                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <label className="text-white">.</label><br />
                            <Button size="large" type="primary" className="float-right" onClick={consultarDatos}>Buscar</Button>
                        </FormGroup>

                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <label className="text-white" >.</label><br></br>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-success"
                                table="tblDatos"
                                filename="Reporte"
                                sheet="tablexls"
                                buttonText="Exportar Excel" />
                        </FormGroup>


                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md="12">
                        <TablaDatos datos={datos} />
                    </Col>
                </Row>

            </PageHeader>
        </Layout>
    )
}