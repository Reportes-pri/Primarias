import { useState } from "react"
import ModalActualizar from "./ModalActualizar"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Button, message, Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { db } from "../configuracion/firebase";


export default function FilaOpciones({ doc }) {

    const [visible, setVisible] = useState(false);

    function confirm() {
        Modal.confirm({
            title: '¡Atención!',
            icon: <ExclamationCircleOutlined />,
            content: 'Deseas eliminar este elemento? No podrás deshacer esta acción.',
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            onOk: () => eliminar()
        });
    }

    const eliminar = () => {
        db.collection("escuelas").doc(doc.id).delete().then(() => {
            message.success("Eliminado correctamente");
        }).catch((error) => {
            console.error("Error removing document: ", error);
            message.error("No se pudo eliminar, contacte al administrador");
        });
    }

    return (
        <td style={{ textAlign: "center", display: "inline-table" }}>
            <ModalActualizar datos={doc} visible={visible} setVisible={setVisible} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} size="large" onClick={() => setVisible(!visible)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} size="large" onClick={confirm} />
        </td>
    )
};
