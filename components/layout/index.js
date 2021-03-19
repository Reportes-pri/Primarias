import { Layout, Avatar, Menu, Dropdown, Badge } from 'antd';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { appFirebase } from "../../configuracion/firebase";
const { Header, Content, Footer } = Layout;

export default function index({ children }) {

    const router = useRouter();

    const [count, setCount] = useState(1);

    const cerrarSession = () => {
        appFirebase.auth().signOut().then(() => {
            router.push("/");
        }).catch((error) => {
            console.error("error cerrar sesion-->", error);
        });
    };

    const addCount = () => {
        setCount(count + 1);
    };

    const menu = (
        <Menu selectable={false} style={{ padding: 12 }}>
            Administrador
            <Menu.Divider />
            <Menu.Item>
                <a  onClick={cerrarSession}>
                    <i className="fas fa-sign-out-alt mr-2"></i>
              Cerrar sesión
            </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0, background: "#fff" }} >

                <h3 className="m-2 float-left">Reportes</h3>

                <Dropdown className="float-right mr-3" overlay={menu} trigger={["click"]} onVisibleChange={addCount} >
                    <div className="dropdown">
                        <Badge count={count}>
                            <Avatar
                                className="avatar"
                                size="large"
                                color="#f56a00"
                            >
                                A
                            </Avatar>
                        </Badge>
                    </div>
                </Dropdown>
            </Header>


            <Content style={{ marginTop: 16 }}>
                <div className="site-layout-background" style={{ minHeight: "100vh" }}>
                    {children}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>Reportes ©2021 Creado por Tecnodev4</Footer>
        </Layout>
    );
}

