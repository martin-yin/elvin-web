import React, { FC } from 'react'
import './index.less'
const ListLable: FC<any> = ({ children }) => {
  return <ul className="info-ul">{children}</ul>
}

export default ListLable
