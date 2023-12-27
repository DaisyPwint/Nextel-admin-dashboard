import { Table, Input, Typography, Button, Dropdown, theme, Space, Divider, Form, Select, Popconfirm, InputNumber, Switch, message,ConfigProvider, Modal} from 'antd';
import { useState } from 'react';
import styles from '../pages.module.css';
import { MaterialOutlined} from '../../components/material-icon/MaterialOutlined'
import { PlusOutlined } from '@ant-design/icons';
import { FilterTitle,TableTitle} from '../../components/typo-title';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editRoom,changeMaintain, selectAllRooms } from '../../features/room/roomSlice';

const { useToken } = theme;

const AllRooms = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [form] = Form.useForm();
  const [filterValues,setFilterValues] = useState(null);
  const [onFilter,setOnfilter] = useState(false);
  const [editingKey,setEditingKey] = useState('');    
  const [onOpenChangeRoom,setOnOpenChangeRoom] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = (record) => record.id === editingKey;

  //for dummy test
  const roomRequests = useSelector(selectAllRooms);
  const rooms = filterValues ? filterValues : roomRequests;
  //end dummy test

  const dataSource = rooms?.map(value => ({
    ...value,
    status: value.status.charAt(0) + value.status.slice(1).toLowerCase()
  }));
   
  const onFinish = (fieldsValue) => {
    const type = fieldsValue.type;
    const floor = fieldsValue.floor;
    const status = fieldsValue.status;
    //for dummy filter
    const filteredValues = roomRequests.filter(record => {
      const typeFilter = !type || record.type.toLowerCase().includes(type.toLowerCase());
      const floorFilter = !floor || record.floor === floor;
      const statusFilter = !status || record.status.toLowerCase() === status.toLowerCase();
      return typeFilter && floorFilter && statusFilter;
    })
    //end dummy test
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

  // for dummy test
  const save = async (key) => {
    try{
      const row = await form.validateFields();
      const newData = [...roomRequests];
      const index = newData.findIndex((item) => item.id === key);
      if(index > -1){
        const item = newData[index];
        newData.splice(index,1,{
          ...item,
          ...row
        });

        const newRoom = newData.find(newRoom => newRoom.id === key);
        dispatch(editRoom(newRoom))
        setEditingKey('')
      }else{
        newData.push(row);
        setEditingKey('');
      }
    }catch(errInfo){
      console.log('Validate Failed: ',errInfo);
    }
  }

  const handleMaintain = (checked,record) => {
      const maintainData = {
        ...record,
        status: checked ? "MAINTAINED" : "AVAILABLE",
        isMaintained: checked
      }
      dispatch(changeMaintain(maintainData))
  }

  const handleChangeRoom = (values) => {
    const reservationId = values?.reserveId;
    navigate(`/change-room?reservationId=${reservationId}`);
  }
  //end dummy test

  const columns = [
    {
      title: 'No',
      dataIndex: 'key', 
      align: "center",
      render: (_, record, index) => index + 1
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
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Available':
            color = '#52C41A'
            break;
          case 'Occupied':
            color = '#1890FF'
            break;
          case 'Maintained':
            color = '#F5222D'
            break;
          default:
            break;
        }
        return <p style={{color}}>{status}</p>
      }    
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
        // loading={isMRoomLoading}
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
            <Typography.Link onClick={() => save(record.id)} style={{marginRight: 10}}>
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

  const option1 = getUniqueTypes(roomRequests).map(type => ({
    value: type,
    label: type,
  }))

  const getUniqueFloor = (data) => {
    const floors = data?.map(room => room.floor);
    return Array.from(new Set(floors));
  }

  const option2 = getUniqueFloor(roomRequests).map(floor => ({
    value: floor,
    label: floor,
  }))

  const getUniqueStatus = (data) => {
    const status = data?.map(room => room.status);
    return Array.from(new Set(status));
  }

  const option3 = getUniqueStatus(roomRequests).map(status => ({
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

  const contentStyle = {
    padding: "15px 25px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  
  return (
    <>
      <div className={styles.header}>
        <TableTitle>Room Lists</TableTitle>
        <div className={styles.action}>
          <Input.Search placeholder='Search Room Number' onSearch={(value) => {
            setSearchText(value);
          }} onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <Button type='primary' onClick={() => navigate('/add-room')}><PlusOutlined/> Add Room</Button>
          <Button type='primary' className={styles["change-button"]} style={{backgroundColor: "#096DD9"}} onClick={() => setOnOpenChangeRoom(true)}><MaterialOutlined>autorenew</MaterialOutlined>Change Room</Button>
          <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <FilterTitle>Filter Room Lists</FilterTitle>
            <Divider style={{margin: "10px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical" style={{width: 160}}>
                <Form.Item name="type" label="Room Type">
                  <Select options={option1} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="floor" label="Floor">
                  <Select options={option2} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="status" label="Status">
                  <Select options={option3} placeholder="Any Status"/>
                </Form.Item>
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
        </div>
      </div>
      <Form form={form} component={false}>
        <Table  rowKey={(record) => record.id} components={{
          body: {
            cell: EditableCell
          }
        }} columns={mergedColumns} 
        dataSource={dataSource}
        className={styles.table}
        />          
      </Form>
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
    </>
  )
}

export default AllRooms