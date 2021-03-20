import { Select, Input, Button, message } from "antd";
import { useState } from "react";
import { Row, Col, FormGroup, Spinner } from "reactstrap";
import SelectLocalidad from "./SelectLocalidad";
import SelectMunicipio from "./SelectMunicipio";
import { db } from "../configuracion/firebase";
import localidadesGuerrero from "../datos/localidades.json";

const { Option } = Select;

export default function Filtro({ setDatos, setEscuelas, setAlumnos }) {

    const [loading, setLoading] = useState(false);

    const [cct, setCct] = useState("");
    const [region, setRegion] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [localidad, setLocalidad] = useState("");

    //para asignar las localidades
    const [localidades, setLocalidades] = useState(localidadesGuerrero);

    const consultarDatos = async (e) => {
        try {
            e.preventDefault();
            const ref = db.collection("escuelas");

            var snapshot;

            if (cct !== "") {
                snapshot = await ref.where("cct", "==", cct).get();
            }
            else if (region !== "" && municipio !== "" && localidad !== "") {
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (region !== "" && municipio !== "") {
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("region", "==", region.toUpperCase()).get();
            }
            else if (localidad !== "" && municipio !== "") {
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (localidad !== "" && region !== "") {
                snapshot = await ref.where("region", "==", region.toUpperCase()).where("localidad", "==", localidad.toUpperCase()).get();
            }
            else if (region !== "") {
                snapshot = await ref.where("region", "==", region.toUpperCase()).get();
            }
            else if (municipio !== "") {
                snapshot = await ref.where("municipio", "==", municipio.toUpperCase()).get();
            }
            else if (localidad !== "") {
                snapshot = await ref.where("localidad", "==", localidad.toUpperCase()).get();
            }
            else {
                snapshot = await ref.get();
            }


            if (snapshot.empty) {
                setLoading(false);
                setDatos([]);
                setEscuelas(0);
                setAlumnos(0);
                alert("No se encontraron registros");
            }
            else {
                setDatos(snapshot);
                var escuelas = 0;
                var alumnos = 0;

                snapshot.forEach(doc => {
                    alumnos += doc.data().alumnos !== "" ? parseInt(doc.data().alumnos) : 0;
                    setAlumnos(alumnos);
                    escuelas += 1;
                    setEscuelas(escuelas)
                });

                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            message.error("Ocurrió un error, contacte al administrador");
        }
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
                            onChange={(e) => setRegion(e)}
                        >
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

                <Col md="3">
                    <FormGroup>
                        <label>Municipio</label>
                        <SelectMunicipio setMunicipio={setMunicipio} setLocalidades={setLocalidades} />
                    </FormGroup>
                </Col>

                <Col md="3">
                    <FormGroup>
                        <label>Localidad</label>
                        <SelectLocalidad localidades={localidades} setLocalidad={setLocalidad} />
                    </FormGroup>
                </Col>

                <Col md="4">
                    <FormGroup>
                        <label className="text-white">opciones</label><br />
                        <Button size="large" type="primary" className="float-right" onClick={consultarDatos}>Buscar {loading && <Spinner color="white" size="sm" className="ml-2" />} </Button>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
};
