import React, { FC } from "react"

const SourceMaoItem: FC<any> = ({ sourcesContent, errline }) => {


    // 计算开始和结束行数
    const preLineStartEnd = () => {
        // 先获取源码有多少行
        const transformationLine = sourcesContent.split('\n');
        const len = transformationLine - 1;
        const start = errline - 3 >= 0 ? errline - 3 : 0;
        const end = start + 5 >= len ? len : start + 5 // 最多展示6行
        return {
            start,
            end
        }
    }

    // 拼接处 pre 展示代码
    const preCode = () => {
        const { start, end } = preLineStartEnd();
        const lines = [];
        for (let i = start; i <= end; i++) {
            lines.push('<div class="code-line ' +
                (i + 1 == errline ? 'heightlight' : '') +
                '" title="' +
                (i + 1 == errline ? encodeHTML("msg") : '') +
                '">' +
                (i + 1) +
                '.    ' +
                encodeHTML(errline[i]) +
                '</div>'
            )
        }
        console.log(lines);
    }

    const encodeHTML = (str: string) =>{
        if (!str || str.length == 0) return ''
        return str.replace(/&/g, '&#38;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;')
    }
      

    return (
      <div>1

    
          {preCode()}
      </div>
    )
  }
  export default SourceMaoItem