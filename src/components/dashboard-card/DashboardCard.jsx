import { Card, Typography, Space } from 'antd';
import styles from './dashboardCard.module.css';

const DashboardCard = ({title,value,icon}) => {
  return (
    <Space direction='horizontal'>
      <Card className={styles.card}>
        <Space direction="horizontal" size={'large'}>
          <Space direction='vertical'>
            <Typography.Text style={{fontSize:"18px",lineHeight:"18px"}}>{title}</Typography.Text>
            <Typography.Title level={2} className={styles.title}>{value}</Typography.Title>
          </Space>
          <span className="material-symbols-outlined"  style={{fontSize: "50px"}}>
            {icon}
          </span>
        </Space>
      </Card>
    </Space>
  )
}

export default DashboardCard