import { Typography } from "antd";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import styles from './protectedRoute.module.css';

const ProtectedRoute = ({children}) => {
  const {token} = useSelector((state) => state.auth);

  if(!token){
    return (
        <div className={styles['route-container']}>
            <Typography.Title>Unauthorized :(</Typography.Title>
            <Typography.Text>
                <NavLink to="/login">Login</NavLink> to gain access
            </Typography.Text>
        </div>
    )
  }else{
    return children
  }
}

export default ProtectedRoute