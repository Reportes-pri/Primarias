import { Input, Modal } from "antd";
import { useState } from "react";
import { Col, FormGroup, Row } from "reactstrap";

export default function Nuevo({ visible, setVisible }) {

    const [loading, setLoading] = useState(false);

    

    const [np, setNp] = useState({ value: "", error: "" });
    const [anio, setAnio] = useState({ value: "", error: "" });
    const [region, setRegion] = useState({ value: "", error: "" });
    const [plantel, setPlantel] = useState({ value: "", error: "" });
    const [alumnos, setAlumnos] = useState({ value: "", error: "" });
    const [nivelEducativo, setNivelEducativo] = useState({ value: "", error: "" });
    const [iq, setIq] = useState({ value: "", error: "" });
    const [municipio, setMunicipio] = useState({ value: "", error: "" });
    const [localidad, setLocalidad] = useState({ value: "", error: "" });
    const [meta, setMeta] = useState({ value: "", error: "" });
    const [programa, setPrograma] = useState({ value: "", error: "" });


    const guardar = () => {

    }

    const cerrarLimpiar = () => {
        setVisible(false);
    }

    return (
        <Modal
            title="Nuevo registro"
            visible={visible}
            onOk={guardar}
            okText="Guardar"
            confirmLoading={loading}
            onCancel={cerrarLimpiar}
        >

            <Row>
                <Col>
                    <FormGroup>
                        <label>N/P</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <label>Año</label>
                        <Input size="large" style={{ width: "100%" }} type="number" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <label>Región</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <label>CCT</label>
                        <Input size="large" style={{ width: "100%" }} type="number" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <label>Plantel Educativo</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <label>Alumnos</label>
                        <Input size="large" style={{ width: "100%" }} type="number" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <label>Nivel Educativo</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <label>IQ</label>
                        <Input size="large" style={{ width: "100%" }} type="number" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>

                        <label>Municipio</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <label>Localidad</label>
                        <Input size="large" style={{ width: "100%" }} type="number" />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <label>Meta</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <label>Programa</label>
                        <Input size="large" style={{ width: "100%" }} />
                    </FormGroup>
                </Col>
            </Row>

        </Modal>
    );
}