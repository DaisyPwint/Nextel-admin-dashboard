import React from 'react'
import { Typography } from 'antd'

const TypographyTitle = ({children}) => {
  return (
    <Typography.Title level={4} style={{marginTop: '0.5em',color:"#262626",fontFamily:'Times New Roman, serif'}}>{children}</Typography.Title>
  )
}

export default TypographyTitle