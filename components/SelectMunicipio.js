//import municipios from "../datos/municipios.json";
import localidades from "../datos/localidades.json";

import { Select } from "antd";

const { Option } = Select;


export default function SelectMunicipio({ setMunicipio, setLocalidades, municipio, municipios }) {


    const cambiarMunicipio = async (e, a) => {
        const datos = await localidades.filter(localidad => localidad.ClaveMunicipio === e);
        setLocalidades(datos.length > 0  ? datos : localidades);
        setMunicipio( a ? a.children : "")
    }

    return (
        <Select
            showSearch
            allowClear
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
    )
};
