import { useState } from "react"
import ModalActualizar from "./ModalActualizar"
import { EditOutlined } from '@ant-design/icons';
import {Button} from "antd";

export default function FilaOpciones({ doc }) {

    const [visible, setVisible] = useState(false);

    return (
        <td style={{ textAlign: "center" }}>
            <ModalActualizar datos={doc} visible={visible} setVisible={setVisible} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} size="large" onClick={() => setVisible(!visible)} />
        </td>
    )
};
