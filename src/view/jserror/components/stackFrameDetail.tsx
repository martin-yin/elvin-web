import React, { FC } from 'react'
import { encodeHTML, preLineStartEnd } from '../../../utils'

const StackFrameDetail: FC<any> = ({ item }) => {
  const { line, column } = item.origin_source

  // 拼接处 pre 展示代码
  const preCode = () => {
    const { start, end, sourceLine } = preLineStartEnd(item.origin_source)
    const codes = []
    for (let i = start; i <= end; i++) {
      const content = i + 1 + '.    ' + encodeHTML(sourceLine[i])
      codes.push(
        <div
          key={i}
          className={`code-line ${i + 1 == line ? 'heightlight' : ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )
    }
    return codes
  }

  return (
    <div className="errdetail">
      <div className="errheader">
        {item.source} at line {line} : {column}
      </div>
      <pre className="errCode">{preCode()}</pre>
    </div>
  )
}
export default StackFrameDetail
