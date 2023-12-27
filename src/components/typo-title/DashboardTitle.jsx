import React from 'react'
import { Typography } from 'antd'

const DashboardTitle = ({children}) => {
  return (
    <Typography.Title level={4} style={{fontSize: '25px',marginTop: '0.5em',color:"#262626",fontFamily:'Times New Roman, serif'}}>{children}</Typography.Title>
  )
}

export default DashboardTitle