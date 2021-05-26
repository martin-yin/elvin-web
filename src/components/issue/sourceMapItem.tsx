import React, { FC } from 'react'

const SourceMaoItem: FC<any> = ({ item }) => {
  const { source, line, column } = item.origin_source

  // 计算开始和结束行数
  const preLineStartEnd = () => {
    // 先获取源码有多少行
    const transformationLine = source.split('\n')
    const len = transformationLine.length - 1
    const start = line - 3 >= 0 ? line - 3 : 0
    const end = start + 5 >= len ? len : start + 5 // 最多展示6行
    return {
      start,
      end,
      transformationLine
    }
  }

  // 拼接处 pre 展示代码
  const preCode = () => {
    const { start, end, transformationLine } = preLineStartEnd()
    const lines = []
    for (let i = start; i <= end; i++) {
      const content = i + 1 + '.    ' + encodeHTML(transformationLine[i])
      lines.push(
        <div
          key={i}
          className={`code-line ${i + 1 == line ? 'heightlight' : ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )
    }
    return lines
  }

  const encodeHTML = (str: string) => {
    if (!str || str.length == 0) return ''
    return str.replace(/&/g, '&#38;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;')
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
export default SourceMaoItem
