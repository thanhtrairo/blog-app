import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Modal } from '~/components/widgets'

type IframeModalProps = {
  onClose: () => void
  onSubmit: (value: string) => void
}

export const IframeModal = ({ onClose, onSubmit }: IframeModalProps) => {
  const [inputText, setInputText] = useState('')

  return (
    <Modal title="Thêm Iframe" open={true} onClose={onClose}>
      <Input placeholder="Iframe" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <div className="mt-6 flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          hủy
        </Button>
        <Button onClick={() => onSubmit(inputText)}>đồng ý</Button>
      </div>
    </Modal>
  )
}
