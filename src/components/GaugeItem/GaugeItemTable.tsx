import React, { FC } from 'react'
import './GaugeItem.less'

interface CollapseItemTableProps {
  reportDataTable: any
}

const CollapseItemTable: FC<CollapseItemTableProps> = CollapseItemTable => {
  switch (CollapseItemTable.reportDataTable.type) {
    case 'table':
      return tableRender(CollapseItemTable)
    default:
      return <></>
  }
}

// CollapseItemTable.reportDataTable.type == 'table' ? (
//   <div>
//     <table>
//       <thead>
//         <tr>
//           {CollapseItemTable.reportDataTable.headings.map((head: any, key: number) => {
//             tdKeyList.push(head.key)
//             return <th key={key}>{head.text}</th>
//           })}
//         </tr>
//       </thead>
//       <tbody>
//         {CollapseItemTable.reportDataTable.items.map((item: any, key: number) => {
//           return (
//             <tr key={key}>
//               {tdKeyList.map((tdKey: any) => {
//                 return <td key={tdKey}>{item[tdKey]}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   </div>
// ) : (
//   <></>
// )

const tableRender = (CollapseItemTable: CollapseItemTableProps) => {
  const headings = _getCanonicalizedHeadingsFromTable(CollapseItemTable.reportDataTable)
  return (
    <table>
      <thead>
        <tr>
          {headings.map((head: any) => {
            return <th key={head.key}>{head.label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {CollapseItemTable.reportDataTable.items.map((item: any) => {
          return _renderTableRowsFromItem(item, headings)
        })}
      </tbody>
    </table>
  )
}
const _getCanonicalizedHeadingsFromTable = (tableLike: any) => {
  if (tableLike.type === 'opportunity') {
    return tableLike.headings
  }

  return tableLike.headings.map((heading: any) => _getCanonicalizedHeading(heading))
}

const _getCanonicalizedHeading = (heading: any) => {
  let subItemsHeading
  if (heading.subItemsHeading) {
    subItemsHeading = _getCanonicalizedsubItemsHeading(heading.subItemsHeading, heading)
  }

  return {
    key: heading.key,
    valueType: heading.itemType,
    subItemsHeading,
    label: heading.text,
    displayUnit: heading.displayUnit,
    granularity: heading.granularity
  }
}

const _renderTableRowsFromItem = (item: any, headings: any) => {
  return _renderTableRow(item, headings)
}

const _renderTableRow = (item: any, headings: any) => {
  let rowElem = ''
  for (const heading of headings) {
    const value = item[heading.key]
    let valueElement
    if (value !== undefined && value !== null) {
      valueElement = _renderTableValue(value, heading)
      rowElem = valueElement
    } else {
      rowElem = ''
    }
  }
  return (
    <tr>
      <td>{rowElem}</td>
    </tr>
  )
}

const _renderTableValue = (value: any, headings: any) => {
  if (value === undefined || value === null) {
    return null
  }
  console.log(value, 'value')
  if (typeof value === 'object') {
    switch (value.type) {
      case 'code': {
        return value.value
      }
      case 'link': {
        return value
      }
      case 'node': {
        return value
      }
      case 'numeric': {
        return value
      }
      case 'source-location': {
        return value
      }
      case 'url': {
        return value.value
      }
      default: {
        return value.type
      }
    }
  }

  return value
}

const _getCanonicalizedsubItemsHeading = (subItemsHeading: any, parentHeading: any) => {
  // Low-friction way to prevent commiting a falsy key (which is never allowed for
  // a subItemsHeading) from passing in CI.
  if (!subItemsHeading.key) {
    // eslint-disable-next-line no-console
    console.warn('key should not be null')
  }

  return {
    key: subItemsHeading.key || '',
    valueType: subItemsHeading.itemType || parentHeading.itemType,
    granularity: subItemsHeading.granularity || parentHeading.granularity,
    displayUnit: subItemsHeading.displayUnit || parentHeading.displayUnit
  }
}

export default CollapseItemTable
