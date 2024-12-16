'use client'

import React, { useState } from 'react'

type TableModalProps = {
  onClose: () => void
  onTableSelect: (row: number, col: number) => void
}

const MAX_ROWS = 10
const MAX_COLS = 10

export const TableModal = ({ onClose, onTableSelect }: TableModalProps) => {
  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)

  const handleMouseEnter = (row: number, col: number) => {
    setRows(row)
    setCols(col)
  }

  const handleCellClick = (row: number, col: number) => {
    onTableSelect(row, col)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-black-c">Select Table Size</h3>
        <div className="flex flex-col items-center">
          {Array.from({ length: MAX_ROWS }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: MAX_COLS }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`m-0.5 h-6 w-6 cursor-pointer border ${
                    rowIndex < rows && colIndex < cols ? 'bg-gray-c' : 'bg-gray-200'
                  }`}
                  onMouseEnter={() => handleMouseEnter(rowIndex + 1, colIndex + 1)}
                  onClick={() => handleCellClick(rowIndex + 1, colIndex + 1)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-700">
          {rows} x {cols} Table
        </p>
      </div>
    </div>
  )
}
