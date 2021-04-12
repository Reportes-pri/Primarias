import { useState } from "react"
import ModalActualizar from "./ModalActualizar"

export default function FilaOpciones({ doc }) {

    const [visible, setVisible] = useState(false);

    return (
        <td style={{ textAlign: "center" }}>
            <ModalActualizar datos={doc} visible={visible} setVisible={setVisible} />
            <label onClick={() => setVisible(!visible)}>Editar</label>
        </td>
    )
};
