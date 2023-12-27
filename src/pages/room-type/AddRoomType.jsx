import { Form,Input,Checkbox,Row,Col,Button, Space, InputNumber, message} from "antd";
import styles from '../pages.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addType } from "../../features/room-type/typeSlice";
// import { useAddRoomTypeMutation, useGetAmenitiesQuery } from "../../features/room-type/typeApiSlice";
import {TableTitle} from '../../components/typo-title'
import {MaterialOutlined} from '../../components/material-icon/MaterialOutlined';

const AddRoomType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  // const [ addRoomType] = useAddRoomTypeMutation();
  // const {data:amenities,isLoading:isAmenityLoading,error} = useGetAmenitiesQuery();
  
  const onFinish = (values) => {
    let newtypeId = 3;
    const typeId = newtypeId++;
    dispatch(addType({id:typeId,...values}));
    navigate('/room-type');
  }

  // const onFinish = async (values) => {   
  // const response = await dispatch(addType(newValues));
  // try{
  //   const {data,error} = await addRoomType({...values});
  //   console.log(data);
  //   if(data?.success){
  //     message.success(data?.message);
  //     navigate('/room-type')
  //   }else{
  //     message.error(error?.data?.message || error?.error);
  //   }
  // }catch(error){
  //   console.error('Error adding room type:', error);
  // }
// }

// if (isAmenityLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Error: {error.message}</div>;
// }

  return (
    <>
    <div className={styles['add-header']}>      
      <MaterialOutlined style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>arrow_back</MaterialOutlined>
      <TableTitle>Add Room Type</TableTitle>
    </div>
    <Form layout="vertical" form={form} className={styles['form-container']} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="name" label="Room Name" rules={[
            {
              required: true,
              message: 'Please input room\'s name'
            }
          ]}>
            <Input autoComplete="off"/>
          </Form.Item>          
          <Form.Item name="pricePerNight" label="Price Per Night" rules={[
            {
              required: true,
              message: 'Please input room\'s price per night'
            }
          ]}>
            <InputNumber min={1} addonBefore="USD" style={{width: '100%'}}/>
          </Form.Item>
        </Col>
        <Col span={12}>          
          <Form.Item name="size" label="Room Size(m2)" rules={[
            {
              required: true,
              message: 'Please input room\'s size'
            }
          ]}>
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item name="maximumCapacity" label="Maximum Capacity" rules={[
            {
              required: true,
              message: 'Please input room\'s capacity '
            }
          ]}>
            <InputNumber min={1} style={{width: '100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="amenities" label="Select amenities" rules={[
            {
              required: true,
              message: 'Please input room\'s amenities '
            }
          ]}>
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value={1}>
                Pet Friendly
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value={2}>
                Breakfast
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value={3}>
                Smoke Free
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value={4}>
                Air Conditioner
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value={5}>
                Wi-Fi
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value={6}>
                Great View
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      {/* <Checkbox.Group>
        <Row>
          {amenities.map((amenity) => (
            <Col span={8} key={amenity.id}>
              <Checkbox value={amenity.id}>
                {amenity.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group> */}
      </Form.Item>
      <Form.Item name="imageUrl" label="Image URL"rules={[
            {
              required: true,
              message: 'Please input room\'s imgae '
            }
          ]}>
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="description" label="Description"rules={[
            {
              required: true,
              message: 'Please input room\'s description'
            }
          ]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className={styles['btn-group']}>
          <Space>
            <Button onClick={() => form.resetFields()}>Clear</Button>
            <Button type="primary" htmlType="submit">
            Add
            </Button>
          </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default AddRoomType
