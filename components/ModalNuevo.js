import { Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import SelectMunicipio from "./SelectMunicipio";
import { db } from "../configuracion/firebase";
import SelectLocalidad from "./SelectLocalidad";
import localidadesGuerrero from "../datos/localidades.json";
import municipiosGuerrero from "../datos/municipios.json";
const { TextArea } = Input;

const { Option } = Select;

export default function Nuevo({ visible, setVisible }) {

    //modal
    const [loading, setLoading] = useState(false);


    //formulario
    const [anio, setAnio] = useState("");
    const [region, setRegion] = useState(null);
    const [cct, setCct] = useState("");
    const [plantel, setPlantel] = useState("");
    const [alumnos, setAlumnos] = useState("");
    const [nivelEducativo, setNivelEducativo] = useState("");
    const [iq, setIq] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [meta, setMeta] = useState("");
    const [programa, setPrograma] = useState("");
    const [avanceFisico, setAvanceFisico] = useState("");
    const [avanceFinanciero, setAvanceFinanciero] = useState("");


    //para asignar las localidades
    const [localidades, setLocalidades] = useState(localidadesGuerrero);
    const [municipios, setMunicipios] = useState(municipiosGuerrero);


    const guardar = async () => {

        //console.log(anio, region, cct, plantel, alumnos, nivelEducativo, iq, municipio, localidad, meta, programa);

        //return
        try {
            setLoading(true);

            await db.collection("escuelas").doc().set({
                alumnos: alumnos,
                anhio: anio,
                cct: cct.trim(),
                iq: iq,
                localidad: localidad ? localidad.toUpperCase().trim() : "",
                meta: meta.toUpperCase(),
                municipio: municipio ? municipio.toUpperCase().trim() : "",
                nivelEducativo: nivelEducativo.trim(),
                plantelEducativo: plantel.trim(),
                programa: programa.toUpperCase(),
                region: region ? region.trim() : "",
                avanceFisico: avanceFisico,
                avanceFinanciero: avanceFinanciero,
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

    const cambiarRegion = (e) => {
        setMunicipios(municipiosGuerrero.filter(doc => doc.region === e));
        setMunicipio(null);
        setRegion(e);
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
                            <label>CCT</label>
                            <Input size="large" style={{ width: "100%" }} value={cct} onChange={(e) => setCct(e.target.value)} />
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
                            <label>Plantel Educativo</label>
                            <Input size="large" style={{ width: "100%" }} value={plantel} onChange={(e) => setPlantel(e.target.value)} />
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
                    <Col>
                        <FormGroup>
                            <label>Alumnos</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={alumnos} onChange={(e) => setAlumnos(e.target.value)} />
                        </FormGroup>
                    </Col>


                    <Col>
                        <FormGroup>
                            <label>Región</label>
                            <Select
                                placeholder="Elige una opción"
                                size="large"
                                style={{ width: "100%" }}
                                onChange={cambiarRegion}
                                value={region}
                            >
                                <Option value="Acapulco">Acapulco</Option>
                                <Option value="Costa Chica">Costa Chica</Option>
                                <Option value="Costa Grande">Costa Grande</Option>
                                <Option value="Centro">Centro</Option>
                                <Option value="Norte">Norte</Option>
                                <Option value="La Montaña">Montaña</Option>
                                <Option value="Tierra Caliente">Tierra Caliente</Option>
                            </Select>
                        </FormGroup>
                    </Col>


                </Row>


                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Municipio</label>
                            <SelectMunicipio setMunicipio={setMunicipio} setLocalidades={setLocalidades} municipios={municipios} />
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
                    <Col md="6">
                        <FormGroup>
                            <label>Programa</label>
                            <Input size="large" style={{ width: "100%" }} value={programa} onChange={(e) => setPrograma(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>Avance Físico</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={avanceFisico} onChange={(e) => setAvanceFisico(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <label>Avance Financiero</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={avanceFinanciero} onChange={(e) => setAvanceFinanciero(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}