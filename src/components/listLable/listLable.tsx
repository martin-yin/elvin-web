import React, { FC, ReactNode } from 'react'
import './index.less'

const ListLable: FC<{ title?: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <>
      <p className="list__label_title">{title}</p>
      <ul className="list__label_ul">{children}</ul>
    </>
  )
}

const ListLableItem: FC<{ label: string; children: ReactNode; spanClass?: string }> = ({
  label,
  children,
  spanClass
}) => {
  return (
    <li>
      <label>{label}：</label>
      <span className={spanClass}>{children}</span>
    </li>
  )
}

export { ListLable, ListLableItem }
