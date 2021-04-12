import { Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { Col, FormGroup, Row } from "reactstrap";
import SelectMunicipio from "./SelectMunicipio";
import { db } from "../configuracion/firebase";
import SelectLocalidad from "./SelectLocalidad";
import localidadesGuerrero from "../datos/localidades.json";
import municipiosGuerrero from "../datos/municipios.json";

const { Option } = Select;


export default function ModalActualizar({ visible, setVisible, datos }) {

    //modal
    const [loading, setLoading] = useState(false);

    const [valorMuni, setValorMuni] = useState(datos && datos.data().municipio ? municipiosGuerrero.find((element) => element.nombre.toUpperCase() === datos.data().municipio) : null);


    //para asignar las localidades
    const [localidades, setLocalidades] = useState(datos && datos.data().municipio ? localidadesGuerrero.filter((loca) => loca.ClaveMunicipio === (valorMuni ? valorMuni.clave : "")) : localidadesGuerrero);
    const [municipios, setMunicipios] = useState(municipiosGuerrero);

    //formulario
    const [anio, setAnio] = useState(datos && datos.data().anhio ? datos.data().anhio : "");
    const [region, setRegion] = useState(datos !== null && datos.data().region ? datos.data().region : "");
    const [cct, setCct] = useState(datos && datos.data().cct ? datos.data().cct : "");
    const [plantel, setPlantel] = useState(datos && datos.data().plantelEducativo ? datos.data().plantelEducativo : "");
    const [alumnos, setAlumnos] = useState(datos && datos.data().alumnos ? datos.data().alumnos : "");
    const [nivelEducativo, setNivelEducativo] = useState(datos && datos.data().nivelEducativo ? datos.data().nivelEducativo : "");
    const [iq, setIq] = useState(datos && datos.data().iq ? datos.data().iq : "");
    const [municipio, setMunicipio] = useState(valorMuni ? valorMuni.clave : null);
    const [valorLoca, setValorLoca] = useState(datos && datos.data().municipio ? localidadesGuerrero.find((element) => element.nombreLocalidad.toUpperCase() === datos.data().localidad) : null);
    const [localidad, setLocalidad] = useState(valorLoca ? valorLoca.nombreLocalidad : null);
    const [meta, setMeta] = useState(datos && datos.data().meta ? datos.data().meta : "");
    const [programa, setPrograma] = useState(datos && datos.data().meta ? datos.data().meta : "");
    const [avanceFisico, setAvanceFisico] = useState(datos && datos.data().avanceFisico ? datos.data().avanceFisico : "");
    const [avanceFinanciero, setAvanceFinanciero] = useState(datos && datos.data().avanceFinanciero ? datos.data().avanceFinanciero : "");


    const cambiarRegion = (e) => {
        setMunicipios(municipiosGuerrero.filter(doc => doc.region === e));
        setMunicipio(null);
        setLocalidad(null);
        setLocalidades([]);
        setRegion(e);
    }


    const cambiarMunicipio = async (e, a) => {
        const datos = await localidadesGuerrero.filter(localidad => localidad.ClaveMunicipio === e);
        setLocalidades(datos.length > 0 ? datos : localidadesGuerrero);
        setMunicipio(a ? a.children : "")
    }


    const guardar = async () => {

        try {
            setLoading(true);

            var documento = db.collection("escuelas").doc(datos.id);

            await documento.update({
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
            })
                .then(() => {
                    message.success('Actualizado correctamente');
                    setLoading(false);
                    setVisible(false);
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                    message.error("Ocurrió un error contacte al administrador");
                    setLoading(false);
                });


        } catch (error) {
            setLoading(false);
            message.error("Ocurrió un error contacte al administrador");
        }
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
                                value={municipio}
                                onChange={cambiarMunicipio}
                            >
                                {
                                    municipios.map((municipio, index) => {
                                        return (
                                            <Option key={index} value={municipio.clave}>{municipio.nombre}</Option>
                                        );
                                    })
                                }
                            </Select>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label>Localidad</label>
                            <Select
                                showSearch
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Escribe una localidad"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                value={localidad}
                                onChange={(e) => setLocalidad(e ? e : "")}
                            >
                                {
                                    localidades.map((localidad, index) => {
                                        return (
                                            <Option key={index} value={localidad.nombreLocalidad}>{localidad.nombreLocalidad}</Option>
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
                            <label>A Fís</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={avanceFisico} onChange={(e) => setAvanceFisico(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <label>A Finan</label>
                            <Input size="large" style={{ width: "100%" }} type="number" value={avanceFinanciero} onChange={(e) => setAvanceFinanciero(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}