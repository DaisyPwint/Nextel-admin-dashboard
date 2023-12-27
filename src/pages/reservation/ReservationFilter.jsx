import { theme,Dropdown,Space,Divider,Select,Form,DatePicker,Button } from "antd";
import {FilterTitle} from "../../components/typo-title";
import {MaterialOutlined} from "../../components/material-icon/MaterialOutlined";
import styles from '../pages.module.css';

const options = [
    {
      value: 'pending',
      label: 'Pending',
    },{
      value: 'confirmed',
      label: 'Confirmed',
    },{
      value: 'canceled',
      label: 'Canceled',
    },{
      value: 'expired',
      label: 'Expired',
    },
  ]

const ReservationFilter = ({ onFilter,setOnfilter,form, onFinish, filterValues }) => {
    const { useToken } = theme;
    const { token } = useToken();

    const contentStyle = {
        padding: "5px 25px",
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
      };

  return (
    <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <FilterTitle>Filter Reservation</FilterTitle>
            <Divider style={{margin: "6px 0"}}/>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                <Space direction="horizontal">
                  <Form.Item name="status" label="Status" style={{width: 160}} initialValue={filterValues.status}>
                    <Select options={options} placeholder="Any status"/>
                  </Form.Item>
                  <Form.Item name="reservationDate" label="Reservation Date">
                    <DatePicker format="DD/MM/YYYY"/>
                  </Form.Item>
                </Space>
                <Space direction="horizontal">
                  <Form.Item name="checkInDate" label="Check-in date">
                    <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"/>
                  </Form.Item>
                  <Form.Item name="checkOutDate" label="Check-out date">
                    <DatePicker placeholder="Select check-out" format="DD/MM/YYYY" />
                  </Form.Item>
                </Space>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button htmlType="reset">Reset</Button>
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </div>
        )}
        >
          <a onClick={(e) => e.preventDefault()} className={styles['filter-button']}>
            <MaterialOutlined style={{color: "#181818"}}>filter_list</MaterialOutlined>
          </a>
        </Dropdown>
  )
}

export default ReservationFilter