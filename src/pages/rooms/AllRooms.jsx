import { Table, Input, Typography, Button, Dropdown, theme, Space, Divider, Form, Select, Popconfirm, InputNumber, Switch, Modal, ConfigProvider, message} from 'antd';
import { useState } from 'react';
import styles from '../room.module.css';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectAllRooms } from '../../features/room-type/roomSlice';
import { useChangeRoomMutation, useGetRoomFilterQuery, useGetAllRoomsQuery, useUpdateRoomMutation, useMaintainRoomMutation } from '../../features/room/roomApiSlice';

const { useToken } = theme;

const AllRooms = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [filterValues,setFilterValues] = useState({
    type : null, 
    floor : null, 
    status : null
  });
  const [onFilter,setOnfilter] = useState(false);
  const [editingKey,setEditingKey] = useState('');
  const [onOpenChangeRoom,setOnOpenChangeRoom] = useState(false);
  
  const {data:allRooms,isLoading:isRoomLoading,error} = useGetAllRoomsQuery();  
  
  const {data:filteredRooms,isLoading:isFRoomLoading} = useGetRoomFilterQuery({
    ...filterValues
  });
  const [changeRoom] = useChangeRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [maintainRoom,{isLoading: isMRoomLoading}] = useMaintainRoomMutation();

  const rooms = filterValues.type || filterValues.floor || filterValues.status
  ? filteredRooms
  : allRooms;
  
  //for dummy test
  // const roomRequests = useSelector(selectAllRooms);

  // const [data,setData] = useState(roomRequests);

  const isEditing = (record) => record.id === editingKey;

  const updatedData = rooms?.map(value => ({
    ...value,
    status: value.status.charAt(0) + value.status.slice(1).toLowerCase()
  }));
  
  const dataSource = updatedData?.map(value => ({
    ...value
  }));
  
  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
 
  const onFinish = (fieldsValue) => {
    const type = fieldsValue.type;
    const floor = fieldsValue.floor;
    const status = fieldsValue.status;
    // const filterValues = data.filter(record => {
    //   const typeFilter = !type || record.type.toLowerCase().includes(type.toLowerCase());
    //   const floorFilter = !floor || record.floor === floor;
    //   const statusFilter = !status || record.status.toLowerCase() === status.toLowerCase();
    //   return typeFilter && floorFilter && statusFilter;
    // })
    const filteredValues = {type,floor,status};
    setFilterValues(filteredValues);
    setOnfilter(false);
  }

  const edit = (record) => {
    form.setFieldsValue({
      number: '',
      type: '',
      floor: '',
      ...record
    })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey('');
  }

  const handleEdit = async (id) => {
    try{
      const row = await form.validateFields();
      const newData = [...allRooms];
      const index = newData.findIndex((item) => item.id === id);
      if(index > -1){
        const item = newData[index];
        newData.splice(index,1,{
          ...item,
          ...row
        });
        const editData = newData.find(data => data?.id === id);
        const {id: roomId,number,type,floor} = editData;
        try {
          const { data, error } = await updateRoom({
            id:roomId,
            number,
            type,
            floor
          });
    
          if (data?.success) {
            message.success(data?.message);
            // setData(newData);
            setEditingKey('');
          } else {
            message.error(error?.data?.message || error?.error);
          }
        } catch (err) {
          console.error("Error updating room:", err);
          message.error("Error updating room");
        }
      }else{
        newData.push(row);
        // setData(newData);
        setEditingKey('');
      }
    }catch(errInfo){
      console.log('Validate Failed: ',errInfo);
    }
  }
  
  const handleMaintain = async (checked,recordData) => {
    console.log(checked,recordData);
    try {
      const { data, error } = await maintainRoom({
        id: recordData?.id,
        isMaintained: checked,
      });
  
      if (data?.success) {
        message.success(data?.message);
      } else {
        message.error(error?.data?.error || error?.error);
      }
    } catch (error) {
      console.error('Error maintaining room:', error);
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'key', 
      align: "center",
      render: (_, record) => record.id
    },
    {
      title: 'Room No',
      dataIndex: 'number',
      align: "center",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.number).toLowerCase().includes(value.toLowerCase())
        );
      },
      editable: true
    },
    {
      title: 'Room Type',
      dataIndex: 'type',
      align: "center",
      editable: true
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      align: "center",
      editable: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center",
      render: (record) => <p>{record}</p>      
    },
    {
      title: 'Maintain',
      dataIndex: 'isMaintained',
      align: "center",
      render: (isMaintained,record) => {
        return (
          <Switch
        disabled={record.status === 'Occupied'}
        checked={record.status === 'Maintained' || isMaintained}
        onChange={(checked) => handleMaintain(checked, record)}
        loading={isMRoomLoading}
      />
        )
      }
    },
    {
      title: 'Action',
      key: 'action', 
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link onClick={() => handleEdit(record.id)} style={{marginRight: 10}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>          
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>
          )
      }
    },
  ]; 

  const mergedColumns = columns.map(col => {
    if(!col.editable){
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'number' ? 'number' : col.dataIndex === 'floor' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  const getUniqueTypes = (data) => {
    const types = data?.map(room => room.type);
    return Array.from(new Set(types))
  }

  const option1 = getUniqueTypes(dataSource).map(type => ({
    value: type,
    label: type,
  }))

  const getUniqueFloor = (data) => {
    const floors = data?.map(room => room.floor);
    return Array.from(new Set(floors));
  }

  const option2 = getUniqueFloor(dataSource).map(floor => ({
    value: floor,
    label: floor,
  }))

  const getUniqueStatus = (data) => {
    const status = data?.map(room => room.status);
    return Array.from(new Set(status));
  }

  const option3 = getUniqueStatus(dataSource).map(status => ({
    value: status.toUpperCase(),
    label: status,
  }))

  const EditableCell = ({
    editing,dataIndex,title,inputType,record,index,children,...restProps
  }) => {
    const isTypeField = dataIndex === 'type';
  
    const inputNode = inputType === 'number' ? <InputNumber/> : isTypeField ? (
      <Select style={{width: 150}}>
        {
          option1.map(option => (
            <Select.Option key={option.value} value={option.value.charAt(0).toUpperCase() + option.value.slice(1)}>
              {option.label}
            </Select.Option>
          ))
        }
      </Select> 
    ) : <Input style={{width: 100}}/>
    
    return (
      <td {...restProps}>
        {
          editing ? (
            <Form.Item name={dataIndex} rules={[{
              required: true,
              message: `Please input ${title}!`
            }]} style={{marginBottom: 0}}>
              {inputNode}
            </Form.Item>
          ) : (
            children
          )
        }
      </td>
    )
  
  }

  const handleChangeRoom = (values) => {
    const reservationId = values?.reserveId;
    changeRoom({id:reservationId}).then(({data,error}) => {
      if(data){
        navigate(`/change-room?reservationId=${reservationId}`, { state: data });
      }else{
        message.error(error?.data?.message || error?.error);
      }
    }).catch((error) => {
      console.error("Error:",error);
    })
  }

  if (isRoomLoading || isFRoomLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={3}>Room Lists</Typography.Title>
        <div className={styles.action}>
          <Input.Search placeholder='Search Room Number' onSearch={(value) => {
            setSearchText(value);
          }} onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <Button type='primary' className='add-btn' onClick={() => navigate('/add-room')}><PlusOutlined/> Add Room</Button>
          <Button type='primary' style={{backgroundColor: "#096DD9"}} onClick={() => setOnOpenChangeRoom(true)}>Change Room</Button>

          <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <Space>
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Occupancy</Typography.Title>
            </Space>
            <Divider style={{margin: "10px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                <Form.Item name="type" label="Room Type" style={{width: 200}}>
                  <Select options={option1} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="floor" label="Floor" style={{width: 200}}>
                  <Select options={option2} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="status" label="Status" style={{width: 200}}>
                  <Select options={option3} placeholder="Any Status"/>
                </Form.Item>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button type="primary" className={`add-btn`} htmlType="submit">
                      Filter
                    </Button>
                    <Button htmlType="reset">Reset</Button>
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
      <Form form={form} component={false}>
        <Table bordered rowKey={(record) => record.id} loading={isRoomLoading || isFRoomLoading} components={{
          body: {
            cell: EditableCell,
          }
        }} columns={mergedColumns} dataSource={dataSource} style={{boxShadow: "2px 2px 3px #A9A9A9"}}/>          
      </Form>
      {
        onOpenChangeRoom && (
          <ConfigProvider
            theme={{
              components: {
                Modal: {
                  titleColor: "#181818"
                },
              },
            }}
          >
            <Modal title="Change Room" centered open={onOpenChangeRoom} onCancel={() => setOnOpenChangeRoom(false)} footer={null} width={300}>
              <Form onFinish={handleChangeRoom} style={{marginTop:"15px"}} >
                <Form.Item name="reserveId" rules={[
                 { 
                  required: true,
                  message: "Reservation id is required"
                }
                ]}>
                  <Input placeholder='Enter reservation id' autoComplete='off'/>
                </Form.Item>
                <Form.Item style={{marginBottom:0,textAlign:"right"}}>
                  <Button type='primary' className='add-btn block ml-auto' htmlType='submit'>Check</Button>
                </Form.Item>
              </Form>
            </Modal>
          </ConfigProvider>          
        )
      }
    </>
  )
}

export default AllRooms