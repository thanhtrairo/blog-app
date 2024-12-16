'use client'

import { type Editor } from '@tiptap/react'
import { Table as TableIcon } from 'lucide-react'
import { useState } from 'react'

import { TableModal } from './table-modal'

type TableProps = {
  editor: Editor
}

export const Table = ({ editor }: TableProps) => {
  const [showModal, setShowModal] = useState(false)

  const handleTableSelect = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`relative ${editor.isActive('table') ? 'bg-theme rounded-lg dark:text-white' : 'text-gray-500'} p-2`}
      >
        <TableIcon className="h-4 w-4" />
      </button>
      {showModal && <TableModal onClose={() => setShowModal(false)} onTableSelect={handleTableSelect} />}
    </div>
  )
}
