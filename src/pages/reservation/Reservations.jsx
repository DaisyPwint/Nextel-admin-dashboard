import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select, message,Modal } from "antd"
import { useEffect, useState } from "react";
import styles from './reservation.module.css';
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import dayjs from "dayjs";

import { useCheckExpReservationsMutation, useGetReservationByFilterQuery, useUpdateStatusMutation } from "../../features/reservation/reserveApiSlice";
import ConfirmModal from "../../components/modal/ConfirmModal";
import CustomButton from "../../components/button/CustomButton";
// import { setReservations } from "../../features/reservation/reserveSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { allReservation } from "../../features/reservation/reserveSlice";

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


const transformedData = (reservationObject) => {
  return {
    id: reservationObject.id,
    reservationId: reservationObject.reservationId,
    guestName: reservationObject.guestName.charAt(0).toUpperCase() + reservationObject.guestName.slice(1),
    guestEmail: reservationObject.guestEmail,
    totalRoom: 1,
    checkIn: {
      date: new Date(reservationObject.checkIn).toLocaleString('en-GB', {  day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.checkIn).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    checkOut: {
      date: new Date(reservationObject.checkOut).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.checkOut).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    createdAt: {
      date: new Date(reservationObject.createdAt).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.createdAt).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    status: reservationObject.status.charAt(0) + reservationObject.status.slice(1).toLowerCase()
  }
}

const { useToken } = theme;
const monthFormat = 'MMM-YYYY';

const Reservations = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [form] = Form.useForm();
  const [ month,setMonth ] = useState(dayjs());
  const [onFilter,setOnfilter] = useState(false);
  const [filterValues,setFilterValues] = useState({
    status : "pending",
    reservationDate : null,
    checkInDate : null,
    checkOutDate : null
  });
  const {data:allReservations,isLoading,error} = useGetReservationByFilterQuery({
    monthFilter : month?.format('YYYY-MM'),
   ...filterValues
  })

  console.log(allReservations)

  const dataSource = allReservations?.map(item => transformedData(item));

  const [reservationId, setReservationId] = useState(null);
  const [updateStatus] = useUpdateStatusMutation();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

    // check expired query
  const [checkExpReservations] = useCheckExpReservationsMutation();
  const handleCheckExp  = async () => {
    try{
      const {data,error} = await checkExpReservations();
      if(data?.success){
        setFilterValues({
          status : "pending",
          reservationDate : null,
          checkInDate : null,
          checkOutDate : null
        })
        form.resetFields();
        message.success(data?.message);
      }else{
        message.error(error?.data?.message || error?.error)
      }
    }catch(error){
      throw new Error(error)
    }
  }

  const onFinish = (fieldsValue) => {
    const {status,reservationDate,checkInDate,checkOutDate} = fieldsValue;
      const filteredValues = {
          status: status,
          reservationDate: reservationDate ? reservationDate.format('YYYY-MM-DD') : null,
          checkInDate: checkInDate ? checkInDate.format('YYYY-MM-DD') : null,
          checkOutDate: checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null
        }
    setFilterValues(filteredValues);
    setOnfilter(false);
  }

  //reservation confirm modal

  const confirmationModal = (id) => {
    setReservationId(id);
    setOpenConfirmModal(true);
  };

  const handleReservationConfirm = async () => {
  if (reservationId) {
    const status = "CONFIRMED";

    const {data,error} = await updateStatus({ id: reservationId, status });
    console.log(data);
    if(data?.success){
      message.success(data.message);
    } else {
      message.error(error?.data?.message || error?.error);
    }
    closeConfirmModal();
  } else {
    console.error('Error updating status:',error);
  }
};

  const closeConfirmModal = () => {
    setOpenConfirmModal(false);
    setReservationId(null);
  }

  // reservation cancel modal
  const cancellationModal = (id) => {
    setReservationId(id);
    setOpenCancelModal(true);
  }

  const handleReservationCancel = async () => {
    if (reservationId) {
      const status = "CANCELED";
      const {data, error} = await updateStatus({ id: reservationId, status });
      console.log(data);
      if(data?.success){
        message.success(data.message);
      } else {
        message.error(error?.data?.message || error?.error);
      }
      closeCancelModal();
    } else {
      console.error('Reservation ID or status is undefined');
    }
  }

  const closeCancelModal = () => {
    setOpenCancelModal(false);
    setReservationId(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'reservationId',
      filteredValue: [searchText],
      sorter: (a,b) => b.reservationId - a.reservationId,
      onFilter: (value,record) => {
        return (
          String(record.reservationId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestEmail).toLowerCase().includes(value.toLowerCase()) ||
          String(record.totalRoom).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Name',
      dataIndex: 'guestInfo',
      align: "center",      
      render: (_,record) => (
        <div style={{textAlign:"left"}}>
        <span>{record.guestName}</span> <br />
        <span style={{color: "#096DD9"}}>{record.guestEmail}</span>
      </div>
        )
    },
    {
      title: 'Check-in',
      dataIndex: 'checkIn',
      align: "center",   
      render: (_,record) => (
          <Space direction="vertical">
            <div>{record.checkIn.date}</div>
            <div>{record.checkIn.time}</div>
          </Space>
        )
    },
    {
      title: 'Check-out',
      dataIndex: 'checkOut',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.checkOut.date}</div>
          <div>{record.checkOut.time}</div>
        </Space>
      )    
    },
    {
      title: 'Total Room',
      dataIndex: 'totalRoom',
      align: "center",      
    },
    {
      title: 'Reservation Date',
      dataIndex: 'createdAt',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.createdAt.date}</div>
          <div>{record.createdAt.time}</div>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center"
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Space size="middle" style={{ whiteSpace: 'nowrap' }}>
            <Button onClick={() => confirmationModal(record?.id)} disabled={record.status === 'Confirmed' || record.status === 'Canceled'} style={{backgroundColor: "#389E0D",color:"#fff"}}>Confirm</Button>
            <Button onClick={() => cancellationModal(record?.id)} disabled={record.status === 'Canceled' || record.status === 'Confirmed'} style={{backgroundColor: "#F5222D"}}>Cancel</Button> 
          </Space>
        )
    },
    {
      title: 'Detail',
      dataIndex: 'detail', 
      align: "center",
      render: (_,record) => (
        <Link to={`/reservations/${record.id}`} style={{textDecoration: 'underline'}}>Detail</Link>
        )
    }
  ]

  const onMonthChange = (value) => {
    setMonth(value || dayjs());
  };

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <Typography.Title level={3}>Reservation Lists</Typography.Title>
    <div className={styles.header}>
      <DatePicker onChange={onMonthChange} allowClear={false} inputReadOnly={true} defaultValue={month} format={monthFormat} picker="month" style={{width: 200}}/>
      <div className={styles.action}>
        <Input.Search placeholder="Search id,name and total room" onSearch={(value) => {
          setSearchText(value);
        }} onChange={(e) => {
          setSearchText(e.target.value)
        }} style={{width: 250}}></Input.Search>
        <Button type="primary" className={`add-btn`} icon={<ReloadOutlined />} onClick={handleCheckExp}>Check Expired</Button>
        <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <Space>
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Reservation</Typography.Title>
            </Space>
            <Divider style={{margin: "10px 0"}}/>
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
                    <Button type="primary" className={`add-btn`} htmlType="submit">
                      Filter
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </div>
        )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <FilterOutlined style={{fontSize: "20px"}}/>
          </a>
        </Dropdown>
      </div>
    </div>
    <Table columns={columns} bordered dataSource={dataSource} loading={isLoading} rowKey={(record) => record.id} />  
      {
        openConfirmModal && 
        <ConfirmModal visible={openConfirmModal}>
          <CustomButton className={styles["no-button"]} onClick={closeConfirmModal}>No</CustomButton>
          <CustomButton className={styles["yes-button"]} onClick={handleReservationConfirm}>Yes</CustomButton>
        </ConfirmModal>
      }    
      {
        openCancelModal && 
        <Modal centered open={openCancelModal} onCancel={closeCancelModal} footer={null} width={300} closeIcon={false}>
          <h2>Cancel Reservation</h2>
            <p>Are you sure you want to cancel this reservation?</p>
            <div className={styles["button-container"]}>
                <CustomButton className={styles["no-button"]} onClick={closeCancelModal}>No</CustomButton>
                <CustomButton className={styles["yes-button"]} onClick={handleReservationCancel}>Yes</CustomButton>
            </div>
        </Modal>
      }
    </>
  )
}

export default Reservations
