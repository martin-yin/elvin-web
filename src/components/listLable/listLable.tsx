import React, { FC } from 'react'
import './index.less'

const ListLable: FC<any> = ({ title, children }) => {
  return (
    <>
      <p className="list__label_title">{title}</p>
      <ul className="list__label_ul">{children}</ul>
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
