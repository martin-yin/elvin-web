import React, { FC } from 'react'

const ListLableItem: FC<any> = ({ label, children, spanClass }) => {
  return (
    <li>
      <label>{label}：</label>
      <span className={spanClass}>{children}</span>
    </li>
  )
}

export default ListLableItem
