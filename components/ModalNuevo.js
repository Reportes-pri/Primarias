import { Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import SelectMunicipio from "./SelectMunicipio";
import { db } from "../configuracion/firebase";
import SelectLocalidad from "./SelectLocalidad";
import localidadesGuerrero from "../datos/localidades.json";

const { Option } = Select;

export default function Nuevo({ visible, setVisible }) {

    //modal
    const [loading, setLoading] = useState(false);


    //formulario
    const [np, setNp] = useState("");
    const [anio, setAnio] = useState("");
    const [region, setRegion] = useState("");
    const [cct, setCct] = useState("");
    const [plantel, setPlantel] = useState("");
    const [alumnos, setAlumnos] = useState("");
    const [nivelEducativo, setNivelEducativo] = useState("");
    const [iq, setIq] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [meta, setMeta] = useState("");
    const [programa, setPrograma] = useState("");


    //para asignar las localidades
    const [localidades, setLocalidades] = useState(localidadesGuerrero);


    const guardar = async () => {
        try {
            setLoading(true);

            await db.collection("escuelas").doc().set({
                alumnos: alumnos,
                anhio: anio,
                cct: cct.trim(),
                iq: iq,
                localidad: localidad.toUpperCase().trim(),
                meta: meta.toUpperCase(),
                municipio: municipio.toUpperCase().trim(),
                nivelEducativo: nivelEducativo.trim(),
                np: np.trim(),
                plantelEducativo: plantel.trim(),
                programa: programa.toUpperCase(),
                region: region.trim()
            });

            setLoading(false);

            message.success('Guardado correctamente');

        } catch (error) {
            setLoading(false);
            message.error("Ocurrió un error contacte al administrador");
        }
    }


    const limpiar = () => {

    }


    return (
        <Modal
            title="Nuevo registro"
            visible={visible}
            onOk={guardar}
            okText="Guardar"
            confirmLoading={loading}
            onCancel={() => setVisible(false)}
        >
            <div>
                <Row>
                    <Col>
                        <FormGroup>
                            <label>N/P</label>
                            <Input size="large" style={{ width: "100%" }} value={np} onChange={(e) => setNp(e.target.value)} />
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <label>Año</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={anio} onChange={(e) => setAnio(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label>Región</label>
                            <Select placeholder="Elige una opción" size="large" style={{ width: "100%" }} onChange={(e) => setRegion(e)} >
                                <Option value="ACAPULCO">Acapulco</Option>
                                <Option value="COSTA CHICA">Costa Chica</Option>
                                <Option value="COSTA GRANDE">Costa Grande</Option>
                                <Option value="CENTRO">Centro</Option>
                                <Option value="NORTE">Norte</Option>
                                <Option value="MONTAÑA">Montaña</Option>
                                <Option value="TIERRA CALIENTE">Tierra Caliente</Option>
                            </Select>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <label>CCT</label>
                            <Input size="large" style={{ width: "100%" }} value={cct} onChange={(e) => setCct(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label>Plantel Educativo</label>
                            <Input size="large" style={{ width: "100%" }} value={plantel} onChange={(e) => setPlantel(e.target.value)} />
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <label>Alumnos</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={alumnos} onChange={(e) => setAlumnos(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label>Nivel Educativo</label>
                            <Input size="large" style={{ width: "100%" }} value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)} />
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <label>IQ</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={iq} onChange={(e) => setIq(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Municipio</label>
                            <SelectMunicipio setMunicipio={setMunicipio} setLocalidades={setLocalidades} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>Localidad</label>
                            <SelectLocalidad localidades={localidades} setLocalidad={setLocalidad} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label>Meta</label>
                            <Input size="large" style={{ width: "100%" }} value={meta} onChange={(e) => setMeta(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <label>Programa</label>
                            <Input size="large" style={{ width: "100%" }} value={programa} onChange={(e) => setPrograma(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}