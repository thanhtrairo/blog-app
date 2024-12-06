import { useState } from 'react'

import Modal from '~/components/modal'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

type HyperlinkModalProps = {
  onClose: () => void
  onSubmit: (value: string) => void
}

export const HyperlinkModal = ({ onClose, onSubmit }: HyperlinkModalProps) => {
  const [inputText, setInputText] = useState('')

  return (
    <Modal title="Thêm link" open={true} onClose={onClose}>
      <Input placeholder="Link" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <div className="mt-6 flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          hủy
        </Button>
        <Button onClick={() => onSubmit(inputText)}>đồng ý</Button>
      </div>
    </Modal>
  )
}
