import React, { FC } from 'react'
import './index.less'

const ListLable: FC<any> = ({ title, children }) => {
  return (
    <>
      <h3>{title}</h3>
      <ul className="info-ul">{children}</ul>
    </>
  )
}

const ListLableItem: FC<any> = ({ label, children, spanClass }) => {
  return (
    <li>
      <label>{label}：</label>
      <span className={spanClass}>{children}</span>
    </li>
  )
}

export { ListLable, ListLableItem }
