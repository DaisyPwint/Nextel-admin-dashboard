import { Typography } from "antd"

export const FilterTitle = ({children}) => {
  return (
    <Typography.Title level={5} style={{marginTop: '5px',marginBottom: 0,fontFamily: 'Times New Roman, serif',fontSize: "22px"}}>{children}</Typography.Title>
  )
}

export default FilterTitle