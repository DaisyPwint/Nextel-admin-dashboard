import { Typography } from "antd"

const TableTitle = ({children}) => {
  return (
    <Typography.Title level={3} style={{ fontSize: "28px",marginTop: '0.5em',color:"#262626",fontFamily:'Times New Roman, serif'}}>{children}</Typography.Title>
  )
}

export default TableTitle