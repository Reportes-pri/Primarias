import { Input, Modal, Select } from "antd";
import { useState } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import Municipios from "../datos/Municipios.json";
import Acapulco from "../datos/AcapulcodeJuárez.json";

const { Option } = Select;

export default function Nuevo({ visible, setVisible }) {

    //modal
    const [loading, setLoading] = useState(false);
    const [localidades, setLocalidades] = useState(null);


    //formulario
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

    const cambiarMunicipio = (e) => {
        switch (e) {
            case "Acapulco de Juárez":
                setLocalidades(Acapulco);
                break;
            default:
                setLocalidades(null);
                break;
        }
        setMunicipio(e);
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

                <Col>
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