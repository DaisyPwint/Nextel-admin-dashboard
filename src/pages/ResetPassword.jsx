import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Space, Typography,message,theme } from 'antd';
import { useResetPwdMutation } from "../features/auth/authApiSlice";
import styles from './security.module.css';

const App = () => {
  const [form] = Form.useForm();
  const { token: {colorBgHeader}} = theme.useToken();
  const navigate = useNavigate();
  const [resetPwd,{isLoading,error}] = useResetPwdMutation();

  const onFinish = async (values) => {
    try{
      const {data} = await resetPwd(values);
      if(data?.success){
        message.success(data?.message);
        navigate('/login');
      }else{
        message.error(error?.data?.message || error?.error);
      }
    }catch(error){
      if(error.status === 400){
        console.error("User not found with");
      }else{
        console.error("An error occured:",error);
      }
    }    
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px"}} level={1}>Reset Password</Typography.Title>
      <Form form={form} className={styles.form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
      <Button type="primary" htmlType="submit" className="login-form-button" disabled={isLoading}>
              {isLoading? 'loading...' : 'Reset Password'}
      </Button>
      </Form.Item>
      </Form>
    </>
  );
};
export default App;
