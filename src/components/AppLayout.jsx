import { Layout} from 'antd';
import AppHeader from './app-header/AppHeader';
import { Content } from 'antd/es/layout/layout';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh"}} hasSider>  
      <SideMenu/>
      <Layout style={{marginLeft: '200px'}}>
        <AppHeader />
        <Content style={{margin: "10px 20px 25px 40px"}}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout