/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import 'github-markdown-css/github-markdown.css'
const DocsPage: FC = () => {
  const markdown = `Here is some JavaScript code:

  ~~~ts
    console.log("11111111")
  ~~~

  ~~~js
    console.log('It works!')
  ~~~
  `
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    }
  }

  return (
    <div>
      <ReactMarkdown components={components} remarkPlugins={[gfm]} children={markdown} />
    </div>
  )
}

export default DocsPage
