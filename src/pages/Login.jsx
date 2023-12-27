import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './security.module.css';
import { Button, Form, Input, theme, Typography, message } from 'antd';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { token: {colorBgHeader}} = theme.useToken();
  const [login,{ isLoading,error}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try{
      const data = await login({...values}).unwrap();
      console.log(data);
      dispatch(setCredentials({...data}));
      if(data){
        navigate('/');
      }
    }catch(error){
      if(error.status === 401){
        message.error('Authentication failed: Invalid credentials')
      }else{
        console.error("An error occured: ",error)
      }
    }
  };

  return (
    <>
      <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px",marginBottom: "60px"}} level={1}>Login</Typography.Title>
      <Form
      name="normal_login"
      className={styles.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {error && <p>Status: {error.status}</p>}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>     
        <Form.Item style={{textAlign: 'center'}}>
          <a className="login-form-forgot" href="/reset">
            Reset password
          </a>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button" disabled={isLoading}>
            {isLoading ? 'loading...' : 'Log in'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default App;