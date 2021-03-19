
export default function TablaDatos({ datos }) {

    return (
        <table className="table  table-striped table-responsive" style={{width: "100%"}} id="tblDatos">
            <thead style={{textAlign: "center", backgroundColor: "#007bff", color: "white"}}>
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
                </tr>
            </thead>
            <tbody style={{textAlign: "center"}}>
                {
                   datos !== null && datos.docs.map((doc, id) => {
                        return (
                            <tr key={id} >
                                <td>{doc.data().np}</td>
                                <td>{doc.data().anhio}</td>
                                <td>{doc.data().region}</td>
                                <td>{doc.data().cct}</td>
                                <td>{doc.data().plantelEducativo}</td>
                                <td>{doc.data().municipio}</td>
                                <td>{doc.data().localidad}</td>
                                <td>{doc.data().alumnos}</td>
                                <td>{doc.data().nivelEducativo}</td>
                                <td>{doc.data().iq}</td>
                                <td>{doc.data().meta}</td>
                                <td>{doc.data().programa}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );

}