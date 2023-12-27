import { Space,Spin,Typography } from 'antd';
import styles from './dashboard.module.css';
import { DashboardCard,PieChart,BarChart } from '../../components';
import { useNewReserveQuery } from '../../features/reservation/reserveApiSlice';
import { useGetAvailableCountQuery,useGetOccupationCountQuery } from '../../features/room/roomApiSlice';
import {TableTitle} from '../../components/typo-title';

const Dashboard = () => {

  // if (isLoading) {
  //   return (
  //     <div className="spin-container">
  //       <Spin size="large"/>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <TableTitle>Overview</TableTitle>
      <Space size={'large'} direction='horizontal'>
        <DashboardCard title="New Reservations" value={2} icon="bookmark" />
        <DashboardCard title="Occupied Rooms" value={10} icon="passkey" />
        <DashboardCard title="Available Rooms" value={5} icon="event_available" />
      </Space>
      <PieChart/>
      <BarChart/>
    </div>
  )
}

export default Dashboard
