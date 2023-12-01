import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form,Input,Checkbox,Row,Col,Button, Typography, Space, InputNumber} from "antd";
import styles from '../room.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { editType, selectTypeById } from "../../features/room-type/typeSlice";
// import { useEditRoomTypeMutation } from "../../features/room-type/typeApiSlice";

const EditRoomType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {id} = useParams();
  // const [EditRoomType,{isLoading,error}] = useEditRoomTypeMutation();

  // const data = useSelector(state => selectTypeById(state,id));
  
const onFinish = (values) => {
  console.log('edit values',values);
  // dispatch(editType({id,...values}));
  navigate('/room-type')
}

if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

  return (
    <>
    <div className={styles['add-header']}>      
      <ArrowLeftOutlined onClick={() => navigate(-1)} /> 
      <Typography.Title level={3} className={styles['add-title']}>Edit Room Type</Typography.Title>
    </div>
    <Form layout="vertical" form={form} className={styles['form-container']} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="name" label="Room Name" initialValue={data.name}>
            <Input autoComplete="off" />
          </Form.Item>          
          <Form.Item name="pricePerNight" label="Price Per Night" initialValue={data.pricePerNight}>
            <InputNumber min={1} addonBefore="USD" style={{width: '100%'}}/>
          </Form.Item>
        </Col>
        <Col span={12}>          
          <Form.Item name="size" label="Room Size(m2)" initialValue={data.size}>
            <Input autoComplete="off"  />
          </Form.Item>
          <Form.Item name="maximumCapacity" label="Maximum Capacity" initialValue={data.maximumCapacity}>
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="amenityIds" label="Select amenities" initialValue={data.amenityIds}>
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
      <Form.Item name="imageUrl" label="Image URL" initialValue={data.imageUrl}>
        <Input autoComplete="off"  />
      </Form.Item>
      <Form.Item name="description" label="Description" initialValue={data.description}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className={styles['btn-group']}>
          <Space>
            <Button onClick={() => form.resetFields()}>Clear</Button>
            <Button type="primary" className={`add-btn`} htmlType="submit">
            Save
            </Button>
          </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default EditRoomType
