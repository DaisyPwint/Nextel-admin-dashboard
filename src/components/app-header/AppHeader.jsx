import React from 'react';
import { UserOutlined } from "@ant-design/icons"
import { Space,Avatar,Dropdown, Divider, theme } from "antd"
import { logout } from '../../features/auth/authSlice';
import styles from './appHeader.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

const AppHeader = () => {

  const { token: {colorBgHeader,colorPrimary}} = theme.useToken();
  const { token } = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank"  href="/change">
          change password
        </a>
      ),
    },
    {
      key: '3',
      danger: true,
      label: 'Log out',
      onClick: handleLogout
    },
  ];
  
  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  return (
    <header style={{backgroundColor: colorPrimary}}>
        <nav style={{
          paddingRight: '50px',
          justifyContent: 'end',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor: colorBgHeader,
          border: '2px solid #fff',
          borderTopLeftRadius: '49px',
          }} className={styles.nav}>
          <Dropdown trigger={['click']}
            menu={{
              items,
            }}
            dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu, {
              style: menuStyle,
            })}
          </div>
        )}
      >      
        <a onClick={(e) => e.preventDefault()}>
          <Avatar style={{ backgroundColor: '#181818', color: '#fff' }}>
            <UserOutlined/>
          </Avatar>
        </a>
        </Dropdown>
        </nav>
    </header>
  )
}

export default AppHeader