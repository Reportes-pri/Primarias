import {Select} from "antd";

const {Option} = Select;


export default function SelectLocalidad({ localidades, setLocalidad, localidad }) {

    return (
        <Select
            showSearch
            allowClear
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
    );
};
