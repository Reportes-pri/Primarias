
export default function TablaDatos({ datos }) {

    return (
        <div style={{overflowY: "auto"}}>
            <table className="table  table-striped" style={{ width: "100%" }} id="tblDatos">
                <thead style={{ textAlign: "center", backgroundColor: "#007bff", color: "white" }}>
                    <tr>
                        <th>NP</th>
                        <th>AÑO</th>
                        <th>REGIÓN</th>
                        <th>CCT</th>
                        <th>PLANTEL EDUCATIVO</th>
                        <th>MUNICIPIO</th>
                        <th>LOCALIDAD</th>
                        <th>ALUMNOS</th>
                        <th>NIVEL EDUCATIVO</th>
                        <th>IQ</th>
                        <th>META</th>
                        <th>PROGRAMA</th>
                        <th>A FÍSICO</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        datos !== null && datos.docs && datos.docs.map((doc, id) => {
                            return (
                                <tr key={id} >
                                    <td style={{ textAlign: "center" }} >{id + 1}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().anhio}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().region}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().cct}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().plantelEducativo}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().municipio}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().localidad}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().alumnos}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().nivelEducativo}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().iq}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().meta}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().programa}</td>
                                    <td style={{ textAlign: "center" }}>{doc.data().avanceFisico}</td>
                                  
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}