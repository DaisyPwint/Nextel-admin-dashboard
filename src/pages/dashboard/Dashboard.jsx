import { Space} from 'antd';
import styles from './dashboard.module.css';
import { DashboardCard,PieChart,BarChart } from '../../components';
import { useNewReserveQuery } from '../../features/reservation/reserveApiSlice';
import { useGetAvailableCountQuery,useGetOccupationCountQuery } from '../../features/room/roomApiSlice';

const Dashboard = () => {
  const { data: newReserveCount, isLoading, error } = useNewReserveQuery();
  const { data: availableCount} = useGetAvailableCountQuery();
  const { data: occupationCount} = useGetOccupationCountQuery();

  if (isLoading) {
    return (
      <div className="spin-container">
        <Spin size="large"/>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <Typography.Title level={4} style={{ fontSize: "36px",marginTop: '0.5em',color:"#262626",fontFamily:'Times New Roman, serif'}}>Overview</Typography.Title>
      <Space size={'large'} direction='horizontal'>
        <DashboardCard title="New Reservations" value={newReserveCount} icon="bookmark" />
        <DashboardCard title="Occupied Rooms" value={availableCount} icon="passkey" />
        <DashboardCard title="Available Rooms" value={occupationCount} icon="event_available" />
      </Space>
      <PieChart/>
      <BarChart/>
    </div>
  )
}

export default Dashboard
