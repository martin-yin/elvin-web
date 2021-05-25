import { Button, Modal } from 'antd'
import React from 'react'

interface ModalFormProps {
  onCreate: () => void
  onClose: () => void
  title: string
  visible: boolean
}

export const ModalFrom: React.FC<ModalFormProps> = ({ visible, onCreate, onClose, title, children }) => {
  const colse = () => {
    onClose()
  }

  return (
    visible && (
      <Modal
        forceRender
        maskClosable={false}
        destroyOnClose={true}
        getContainer={false}
        width={640}
        visible={visible}
        title={title}
        onCancel={() => {
          colse()
        }}
        footer={[
          <Button key="submit" type="primary" onClick={() => onCreate()}>
            提 交
          </Button>
        ]}
      >
        {children}
      </Modal>
    )
  )
}
