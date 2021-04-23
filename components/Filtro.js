import { Select, Input, Button, message } from "antd";
import { useState } from "react";
import { Row, Col, FormGroup, Spinner } from "reactstrap";
import SelectLocalidad from "./SelectLocalidad";
import SelectMunicipio from "./SelectMunicipio";
import { db } from "../configuracion/firebase";
import localidadesGuerrero from "../datos/localidades.json";
import municipiosGuerrero from "../datos/municipios.json";

const { Option } = Select;

export default function Filtro({ setDatos, setEscuelas, setAlumnos, setIq }) {

    const [loading, setLoading] = useState(false);

    const [cct, setCct] = useState("");
    const [region, setRegion] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const [localidad, setLocalidad] = useState(null);
    const [nivel, setNivel] = useState(null);
    const [programa, setPrograma] = useState(null);
    const [plantelEducativo, setplantelEducativo] = useState("");


    //para asignar las localidades
    const [localidades, setLocalidades] = useState(localidadesGuerrero);
    const [municipios, setMunicipios] = useState(municipiosGuerrero);

    const consultarDatos = async (e) => {
        try {
            setDatos(null);
            e.preventDefault();
            setLoading(true);
            const ref = db.collection("escuelas");

            var snapshot;

            if (cct !== "") {
                snapshot = await ref.where("cct", "==", cct).get();
                if (snapshot.empty) {
                    snapshot = await ref.where("cctMayusculas", "==", cct.toUpperCase().trim()).get();
                }
            } else if (plantelEducativo !== "") {
                snapshot = await ref.where("plantelEducativo", "==", plantelEducativo).get();
                if (snapshot.empty) {
                    snapshot = await ref.where("plantelEducativoMayusculas", "==", plantelEducativo.toUpperCase().trim()).get();
                }
            }
            else if (region !== null && municipio !== null && localidad !== null && nivel !== null && programa !== null) {
                /** Combinacion para 5 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (region !== null && municipio !== null && localidad !== null && nivel !== null) {
                /** Combinacion para 4 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            } else if (region !== null && municipio !== null && localidad !== null && programa !== null) {
                /** Combinacion para 4 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("programa", "==", programa.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            } else if (region !== null && municipio !== null && nivel !== null && programa !== null) {
                /** Combinacion para 4 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (region !== null && localidad !== null && nivel !== null && programa !== null) {
                /** Combinacion para 4 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            } else if (municipio !== null && localidad !== null && nivel !== null && programa !== null) {
                /** Combinacion para 4 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }

            else if (region !== null && municipio !== null && localidad !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (municipio !== null && region !== null && nivel !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).get();
            } else if (municipio !== null && region !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (municipio !== null && localidad !== null && nivel !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).get();
            } else if (municipio !== null && localidad !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (municipio !== null && nivel !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (region !== null && localidad !== null && nivel !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).get();
            } else if (region !== null && localidad !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (region !== null && nivel !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (localidad !== null && nivel !== null && programa !== null) {
                /*combinaciones para 3 casos */
                snapshot = await ref.where("localidad", "==", localidad.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            }
            else if (region !== null && municipio !== null) {
                /*combinaciones para 2 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).get();
            }
            else if (localidad !== null && municipio !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (localidad !== null && region !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            } else if (municipio !== null && nivel !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).get();
            } else if (municipio !== null && programa !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (region !== null && nivel !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("nivelEducativo", "==", nivel.toUpperCase()).get();
            } else if (programa !== null && region !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (localidad !== null && nivel !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("nivelEducativo", "==", nivel.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            } else if (localidad !== null && programa !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("localidad", "==", localidad.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            } else if (nivel !== null && programa !== null) {
                /** Combinaciones para 2 casos */
                snapshot = await ref.where("nivelEducativo", "==", nivel.toUpperCase()).where("programa", "==", programa.toUpperCase()).get();
            }
            else if (region !== null) {
                snapshot = await ref.where("region", "==", region.toUpperCase()).get();
            }
            else if (municipio !== null) {
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).get();
            }
            else if (localidad !== null) {
                snapshot = await ref.where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (nivel !== null) {
                snapshot = await ref.where("nivelEducativo", "==", nivel.toUpperCase()).get();
            }
            else if (programa !== null) {
                snapshot = await ref.where("programa", "==", programa.toUpperCase()).get();
            }
            else {
                snapshot = await ref.get();
            }


            if (snapshot.empty) {
                setDatos([]);
                setEscuelas(0);
                setAlumnos(0);
                setIq(0);
                alert("No se encontraron registros");
            }
            else {
                setDatos(snapshot);
                var escuelas = 0;
                var alumnos = 0;
                var iq = 0;

                snapshot.forEach(doc => {
                    alumnos += doc.data().alumnos !== "" ? parseInt(doc.data().alumnos) : 0;
                    setAlumnos(alumnos);
                    escuelas += 1;
                    setEscuelas(escuelas)
                    iq += doc.data().iq !== "" ? parseFloat(doc.data().iq) : 0;
                    setIq(iq);
                });
            }

            setCct("");
            setplantelEducativo("");
            setRegion(null);
            setMunicipio(null);
            setLocalidad(null);
            setNivel(null);
            setPrograma(null);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error("Ocurrió un error, contacte al administrador");
        }
    }

    const cambiarRegion = (e) => {
        setMunicipios(municipiosGuerrero.filter(doc => doc.region === e));
        setMunicipio(null);
        setRegion(e);
    }

    return (
        <div>
            <p>
                Ingresa la clave CCT de la escuela para ver su información.
            </p>

            <Row>
                <Col md="4">
                    <FormGroup>
                        <label>CCT</label>
                        <Input type="text" size="large" style={{ width: "100%" }} name="cct" value={cct} onChange={(e) => setCct(e.target.value)} />
                    </FormGroup>
                </Col>
            </Row>
            <p>
                Ingresa el nombre de la escuela para ver su información.
            </p>

            <Row>
                <Col md="4">
                    <FormGroup>
                        <label>Nombre del plantel</label>
                        <Input type="text" size="large" style={{ width: "100%" }} name="plantelEducativo" value={plantelEducativo} onChange={(e) => setplantelEducativo(e.target.value)} />
                    </FormGroup>
                </Col>
            </Row>
            <p>
                O utiliza los siguientes campos para una búsqueda más avanzada.
            </p>

            <Row>
                <Col md="2">
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
                            <Option value="Montaña">Montaña</Option>
                            <Option value="Tierra Caliente">Tierra Caliente</Option>
                        </Select>
                    </FormGroup>
                </Col>

                <Col md="2">
                    <FormGroup>
                        <label>Municipio</label>
                        <SelectMunicipio municipios={municipios} setMunicipio={setMunicipio} setLocalidades={setLocalidades} municipio={municipio} />
                    </FormGroup>
                </Col>

                <Col md="2">
                    <FormGroup>
                        <label>Localidad</label>
                        <SelectLocalidad localidades={localidades} setLocalidad={setLocalidad} localidad={localidad} />
                    </FormGroup>
                </Col>

                <Col md="2">
                    <FormGroup>
                        <label>Nivel educativo</label>
                        <Select
                            placeholder="Elige una opción"
                            size="large"
                            style={{ width: "100%" }}
                            onChange={(e) => setNivel(e)}
                            value={nivel}
                        >
                            <Option value="BÁSICO">BÁSICO</Option>
                            <Option value="MEDIO SUPERIOR">MEDIO SUPERIOR</Option>
                            <Option value="SUPERIOR">SUPERIOR</Option>
                        </Select>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <label>Programa</label>
                        <Select
                            placeholder="Elige una opción"
                            size="large"
                            style={{ width: "100%" }}
                            onChange={(e) => setPrograma(e)}
                            value={programa}
                        >
                            <Option value="RECURSOS PARA EL MANTENIMIENTO DE LOS PROYECTOS DE LA INFE">CIEN MANTENIMIENTO</Option>
                            <Option value="PROGRAMA PARA LA POTENCIACIÓN DE LOS RECURSOS DE APORTACIÓN FAM">CIEN</Option>
                            <Option value="FAM POTENCIADO  RENDIMIENTOS FINANCIEROS GENERADOS">CIEN RENDIMIENTOS</Option>
                        </Select>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <label className="text-white">opciones</label><br />
                        <Button size="large" type="primary" className="float-right" onClick={consultarDatos}>Buscar {loading && <Spinner color="white" size="sm" className="ml-2" />} </Button>
                    </FormGroup>
                </Col>


            </Row>
            <Row>



            </Row>
        </div>
    )
};
