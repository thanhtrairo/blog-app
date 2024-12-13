import { type Editor } from '@tiptap/react'
import { Link2, Link2Off } from 'lucide-react'
import { useState } from 'react'

import { HyperlinkModal } from './hyperlink-modal'

type HyperlinkProps = {
  editor: Editor
}

export const Hyperlink = ({ editor }: HyperlinkProps) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const setLink = (linkInput: string) => {
    if (linkInput) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkInput }).run()
    }
    setOpenModal(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className={`${editor.isActive('link') ? 'bg-theme rounded-lg text-white' : 'text-gray-500'} p-2`}
      >
        <Link2 className="h-4 w-4" />
      </button>
      {editor.isActive('link') && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={`${editor.isActive('link') ? 'bg-theme rounded-lg text-white' : 'text-gray-500'} p-2`}
        >
          <Link2Off className="h-4 w-4" />
        </button>
      )}
      {openModal && <HyperlinkModal onClose={handleCloseModal} onSubmit={setLink} />}
    </>
  )
}
