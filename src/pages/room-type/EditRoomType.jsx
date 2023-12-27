import { Form,Input,Checkbox,Row,Col,Button, Space, InputNumber} from "antd";
import styles from '../pages.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {TableTitle} from '../../components/typo-title'
import {MaterialOutlined} from '../../components/material-icon/MaterialOutlined';
import { editType, selectTypeById } from "../../features/room-type/typeSlice";
// import { useEditRoomTypeMutation } from "../../features/room-type/typeApiSlice";

const EditRoomType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const typeId = parseInt(id);
  // const [EditRoomType,{isLoading,error}] = useEditRoomTypeMutation();

  const data = useSelector(state => selectTypeById(state,typeId));
  
  const onFinish = (values) => {
    dispatch(editType({typeId,...values}));
    navigate('/room-type')
  }

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Error: {error.message}</div>;
// }

  return (
    <>
    <div className={styles['add-header']}>      
    <MaterialOutlined style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>arrow_back</MaterialOutlined>
      <TableTitle>Edit Room Type</TableTitle>
    </div>
    <Form layout="vertical" form={form} className={styles['form-container']} onFinish={onFinish}
    initialValues={{
      name: data?.name,
      pricePerNight: data?.pricePerNight,
      size: data?.size,
      maximumCapacity: data?.maximumCapacity,
      amenities: data?.amenities,
      imageUrl: data?.imageUrl,
      description: data?.description
    }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="name" label="Room Name">
            <Input autoComplete="off" />
          </Form.Item>          
          <Form.Item name="pricePerNight" label="Price Per Night">
            <InputNumber min={1} addonBefore="USD" style={{width: '100%'}}/>
          </Form.Item>
        </Col>
        <Col span={12}>          
          <Form.Item name="size" label="Room Size(m2)">
            <Input autoComplete="off"  />
          </Form.Item>
          <Form.Item name="maximumCapacity" label="Maximum Capacity">
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="amenities" label="Select amenities">
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
      </Form.Item>
      <Form.Item name="imageUrl" label="Image URL">
        <Input autoComplete="off"  />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className={styles['btn-group']}>
          <Space>
            <Button onClick={() => form.setFieldsValue({
              name: '',
              pricePerNight: '',
              size: '',
              maximumCapacity: '',
              amenities: [],
              imageUrl: '',
              description: ''
            })}>Clear</Button>
            <Button type="primary" htmlType="submit">
            Save
            </Button>
          </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default EditRoomType
