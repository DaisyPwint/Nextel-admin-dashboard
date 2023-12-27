import { useState } from 'react';
import { Form,Row,Col,Select, InputNumber,Space,Button,Typography,message } from 'antd';
import styles from '../pages.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TableTitle } from '../../components/typo-title'
import { MaterialOutlined } from '../../components/material-icon/MaterialOutlined';
import { addRoom } from '../../features/room/roomSlice';
// import { useAddRoomMutation } from '../../features/room/roomApiSlice';
// import { useGetRoomTypeQuery } from '../../features/room-type/typeApiSlice';

const data = [
  {
      "id": 1,
      "name": "Deluxe Single",
      "maximumCapacity": 1,
      "size": "50",
      "pricePerNight": 100,
      "description": "Our Deluxe Single Room offers a plush single bed with high-quality linens for a restful sleep. It includes a work desk, complimentary Wi-Fi, and an en-suite bathroom with premium toiletries. Additional amenities include a flat-screen TV, mini-bar, in-room safe, and 24-hour room service. Experience comfort and convenience in the heart of the city.",
      "totalRoom": 8,
      "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "amenities": [
          {
              "id": 1,
              "name": "Comfortable Beds",
              "icon": "Comfortable Beds"
          },
          {
              "id": 6,
              "name": "Air Conditioning/Heating",
              "icon": "Air Conditioning/Heating"
          },
          {
              "id": 10,
              "name": "Room Service",
              "icon": "Room Service"
          },
          {
              "id": 20,
              "name": "Laundry Facilities",
              "icon": "Laundry Facilities"
          },
          {
              "id": 21,
              "name": "Ironing Facilities",
              "icon": "Ironing Facilities"
          },
          {
              "id": 28,
              "name": "In-Room Jacuzzi",
              "icon": "In-Room Jacuzzi"
          }
      ]
  },
  {
      "id": 2,
      "name": "Deluxe Double",
      "maximumCapacity": 2,
      "size": "80",
      "pricePerNight": 200,
      "description": "The Deluxe Single Room, with its king-sized bed and high-quality linens, ensures a restful sleep. It includes a modern bathroom, a seating area, and a flat-screen TV. Complimentary Wi-Fi, a stocked mini-bar, and a safe are also provided. Large windows offer city views. Guests have access to 24-hour room service. This room is a blend of comfort and luxury, perfect for both business and leisure stays.",
      "totalRoom": 20,
      "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "amenities": [
          {
              "id": 1,
              "name": "Comfortable Beds",
              "icon": "Comfortable Beds"
          },
          {
              "id": 6,
              "name": "Air Conditioning/Heating",
              "icon": "Air Conditioning/Heating"
          },
          {
              "id": 10,
              "name": "Room Service",
              "icon": "Room Service"
          },
          {
              "id": 28,
              "name": "In-Room Jacuzzi",
              "icon": "In-Room Jacuzzi"
          }
      ]
  }
]

const AddRoom = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showClickAdd,setShowClickAdd] = useState(false);  
  const dispatch = useDispatch();
  // const [addRoom] = useAddRoomMutation();
  // const {data,isLoading,error} = useGetRoomTypeQuery();

  const handleAdd = (field) => {
    form.validateFields([['rooms',field.name,'quantity'],['rooms',field.name,'type'],['rooms',field.name,'floor']]).then(() => {
      const numRooms = form.getFieldValue(['rooms',field.name,'quantity']);
      if(numRooms !== undefined && numRooms > 0){
        form.setFieldsValue({
          rooms: form.getFieldValue('rooms').map((room,index) => {
            if(index === field.key){
              const newLists = new Array(numRooms).fill({number: null,type: room.type,floor: room.floor});
              return {...room,roomRequests: newLists}
            }
          return room
          })
        })
        setShowClickAdd(true);
      }
    })
  }

  // const onFinish = async (values) => {
  //   console.log(values.rooms[0].roomRequests);// [ { number: 101, type: "Deluxe Single", … } ]
  //   const roomArr = values.rooms[0].roomRequests; 
  //   try {
  //     const { data, error } = await addRoom(roomArr);

  //     if (data?.success) {
  //       message.success(data?.message);
  //       // dispatch(addRoom(values.rooms[0].roomRequests));
  //       setShowClickAdd(false);
  //       navigate('/rooms');
  //     } else {
  //       message.error(error?.error || error?.data?.message);
  //     }
  //   } catch (error) {
  //     console.error('Error adding room:', error);
  //   }
  // }

  // for dummy test
  const onFinish = async (values) => {
    // console.log(values.rooms[0].roomRequests);// [ { number: 101, type: "Deluxe Single", … } ]
    const rooms = values.rooms[0].roomRequests;
    let newtypeId = 4;
    const newRooms = rooms.map((room,index) => ({
      id: newtypeId + index,
      ...room,
      status: "AVAILABLE",
      isMaintained: false
    }))
    dispatch(addRoom(newRooms));
    setShowClickAdd(false);
    navigate('/rooms');
  }
  // end dummy test

    const getUniqueTypes = (data) => {
    const names = data?.map(room => room.name);
    return Array.from(new Set(names))
  }

  const options = getUniqueTypes(data)?.map(type => ({
    value: type,
    label: type,
  }))|| [];

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return(
    <>
      <div className={styles['add-header']}>      
        <MaterialOutlined style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>arrow_back</MaterialOutlined>
        <TableTitle>Add Room</TableTitle>
      </div>
      <Form  name="dynamic_form_complex" initialValues={{
        rooms: [{}]
      }} form={form} className={styles['form-container']} onFinish={onFinish}  autoComplete='off'
      >
        <Form.List name="rooms">
      {(fields) => (
        <>
          {fields.map((field) => (
            <div key={field.key}>
              <Row gutter={32}>
                <Col span={8}>
                  <Form.Item name={[field.name, 'quantity']} label="Quantity of Room" rules={[
                    {
                      required: true,
                      message: 'Please input room\'s quantity'
                    }
                  ]}>
                    <InputNumber min={1} placeholder='Enter quantity of room' style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={[field.name, 'type']} label="Room Type" rules={[
                    {
                      required: true,
                      message: 'Please input room\'s type'
                    }
                  ]}>
                      <Select options={options} placeholder="Select room type"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={[field.name, 'floor']} label="Floor" rules={[
                      {
                        required: true,
                        message: 'Please input room\'s floor'
                      }
                    ]}>
                      <InputNumber min={1} placeholder='Enter floor no' style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
              </Row>
              {/* Nest Form.List */}
              <Form.List name={[field.name, 'roomRequests']}>
                {(subFields) => (
                  <>
                    <Form.Item className={styles['btn-group']}>
                      <Space>
                        <Button onClick={() => {
                          form.resetFields();
                          setShowClickAdd(false);
                        }}>Clear</Button>
                        <Button type="primary" onClick={() => handleAdd(field)}>
                          + Add 
                        </Button>
                      </Space>
                    </Form.Item>
                    {
                      showClickAdd && (
                      <div className={styles['new-room-container']}>
                        <div className={styles['new-room-title']}>
                          <Row gutter={32}>
                            <Col span={8}>
                              <p>Room No</p>
                            </Col>
                            <Col span={8}>
                              <p>Room Type</p>
                            </Col>
                            <Col span={8}>
                              <p>Floor</p>
                            </Col>
                          </Row>
                        </div>
                        {subFields.map((subField) => (
                          <Row gutter={32} key={subField.key}>
                            <Col span={8}>
                              <Form.Item
                                  name={[subField.name, 'number']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing Room Number',
                                    },
                                  ]}
                                  style={{marginBottom: 0}}
                                >
                                  <InputNumber placeholder="Enter Room No" style={{width: '100%'}}/>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name={[subField.name, 'type']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Room Type',
                                  },
                                ]}
                              >
                                <Select options={options} placeholder="Select Room Type" />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name={[subField.name, 'floor']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Room floor',
                                  },
                                ]}
                              >
                                <InputNumber placeholder="Enter Room Floor" style={{width: '100%'}}/>
                              </Form.Item>
                            </Col>
                          </Row>
                        ))}   
                        <Form.Item className={styles['btn-group']}>
                          <Space>
                              <Button onClick={() => {
                          form.resetFields();
                          setShowClickAdd(false);
                        }}>Cancel</Button>
                              <Button type="primary" htmlType="submit">
                                Save 
                              </Button>
                          </Space>
                        </Form.Item>  
                      </div>                          
                      )
                    }  
                  </>
                )}
              </Form.List>              
            </div>
          ))}
        </>
      )}
    </Form.List>
      </Form>
    </>
  )
}
  
export default AddRoom;