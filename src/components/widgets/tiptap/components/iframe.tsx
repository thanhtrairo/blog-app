import { type Editor } from '@tiptap/react'
import { FileText } from 'lucide-react'
import { useState } from 'react'

import { HyperlinkModal } from './hyperlink-modal'

type IframeProps = {
  editor: Editor
}

export const Iframe = ({ editor }: IframeProps) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const setIframe = (linkInput: string) => {
    if (linkInput) {
      editor.chain().focus().insertContent(linkInput).run()
      setOpenModal(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleOpenModal} className="p-2">
        <FileText className="h-4 w-4" />
      </button>
      {openModal && <HyperlinkModal onClose={handleCloseModal} onSubmit={setIframe} />}
    </>
  )
}
