import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, theme, Typography } from 'antd';
import { useChangePwdMutation } from '../features/auth/authApiSlice';
import { useSelector } from 'react-redux';
import styles from './security.module.css';

const ChangePassword = () => {
  const { token: {colorBgHeader}} = theme.useToken();
  const [changePwd, {isLoading,error}] = useChangePwdMutation();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(null);
  // const { token } = useSelector((state) => console.log(state));
  const { token } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    if(values.newPassword !== values.confirmPwd){
      setStatusMessage("New Password and Confirm Password do not match");
      return;
    }
    try{
      const {data} = await changePwd({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }, token);
      if (data && data?.success) {
        message.success(data?.message); 
        navigate('/login');
      } else{
        message.error(error?.data.error || error?.error);
      }
    }catch(error){
      if(error.status === 400){
        setStatusMessage('Old Password is incorrect');
      }else if(error.status === 401){
        setStatusMessage('Authentication failed: Invalid credentials');
      }else{
        setStatusMessage('An error occured:',error);
      }
    }
  };

  return (
      <>
        <Typography.Title style={{color: colorBgHeader,textAlign: "center",marginTop: "60px"}} level={1}>Change Password</Typography.Title>
        <Form className={styles.form}
        name="normal_login"
        onFinish={onFinish}
      >
        {statusMessage && <p>{statusMessage}</p>}
        {error && <p>Error Status: {error.status}</p>}
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Please input your old Password',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPwd"
            rules={[
              {
                required: true,
                message: 'Please input your confirm Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="login-form-button" disabled={isLoading}>
              {isLoading? 'loading...' : 'Change Password'}
            </Button>
          </Form.Item>
        </Form>
      </>
  )
}

export default ChangePassword