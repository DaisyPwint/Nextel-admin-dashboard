import { useState, useEffect } from "react";
import { Menu, Layout, theme, ConfigProvider, Space} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../public/assets/images/Logo.png';
import Service from '../../public/assets/images/Service.png';

const { Sider } = Layout;

const SideMenu = () => {
  const { token: {colorPrimary,colorText}} = theme.useToken();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const items = [
    { label: "Dashboard", key: "/", 
    icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
    dashboard
  </span> },
    { label: "Reservations", 
      key: "reservations",
      icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
        calendar_add_on
      </span> , 
      children: [
      { label: "list", key: "/reservations" },
      { label: "History", key: "/reservations-history" },
    ],
    },
    {
      label: "Room",
      key: "room",
      icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
      home
    </span>,
      children: [
        { label: "types", key: "/room-type" },
        { label: "list", key: "/rooms" },
      ],
    },
    {
      label: "Occupation",
      key: "occupied-rooms",
      icon: <span className="material-symbols-outlined" style={{fontSize: "20px"}}>
        key
      </span>,
      children: [
        { label: "list", key: "/occupied-rooms" },
        { label: "History", key: "/occupation-history" },
      ],
    },
  ];

  return (
        <Sider 
          width={205} 
          style={{
          background: colorPrimary,
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 2,
          bottom: 0
          }} 
          >
            <ConfigProvider theme={{
              components: {
                Menu: {
                  itemColor: "#A9A9A9",
                  itemSelectedColor: "#fff",
                  popupBg: "#34495E",
                  itemHoverBg: "#34495E",
                  itemHoverColor: "#fff",
                }
              }
            }}>
              {/* <Typography.Title style={{marginTop: '0.5em',display: 'flex',justifyContent: 'center',alignContent: 'center'}}>N</Typography.Title> */}
              <img src={Logo} style={{marginLeft: '28px',height: '60px'}}/>
              <Menu onClick={({ key }) => {
                  navigate(key);
                }}
                selectedKeys={[selectedKeys]}
                mode="inline"
                items={items}
                style={{background: colorPrimary,marginTop: '20px'
                }}
              />
            </ConfigProvider>
            <img src={Service} style={{width: '150px',marginTop: '200px',marginLeft: '28px'}}/>
        </Sider>
  );
};

export default SideMenu;
