import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { IconGripVertical, IconX } from '@tabler/icons-react'

import { Autocomplete } from '../../shared/components'

import { csvExportFields } from './constants'

import '../../shared/styles/HoverShadowStyles.css'
import './styles.css'

export const SelectCsvFieldsModal = ({
  handleCancel,
  handleSubmit,
  defaultValues
}: {
  handleCancel: any
  handleSubmit: any
  defaultValues: any[]
}) => {
  const [selectedFields, setSelectedFields] = useState<any[]>(defaultValues)
  const [draggingItem, setDraggingItem] = useState<any>(null)

  const handleSelectColumns = (_e: any, selected: any) => {
    setSelectedFields(selected)
  }

  const handleRemoveColumn = (column: any) => {
    setSelectedFields((prevFields) => {
      return prevFields.filter((col) => col.value !== column.value)
    })
  }

  const handleDragStart = (e: any, item: any) => {
    setDraggingItem(item)
    e.dataTransfer.setData('text/plain', '')
  }

  const handleDragEnd = () => {
    setDraggingItem(null)
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (targetItem: any) => {
    if (!draggingItem) return

    const currentIndex = selectedFields.findIndex((item) => item.value === draggingItem.value)
    const targetIndex = selectedFields.findIndex((item) => item.value === targetItem.value)

    if (currentIndex !== -1 && targetIndex !== -1) {
      setSelectedFields((prevFields) => {
        const items = [...prevFields]

        // Remove the item from the currentIndex
        const draggingItem = items.splice(currentIndex, 1)[0]

        // Insert the item at the targetIndex
        items.splice(targetIndex, 0, draggingItem)

        // Update the state with the reordered columns
        return items
      })
    }
  }

  return (
    <Box display="flex" minHeight="50vh" justifyContent="space-between" flexDirection="column">
      <Box display="flex" flexDirection="column">
        <Autocomplete
          placeholder="Search to add"
          value={selectedFields}
          onChange={handleSelectColumns}
          options={csvExportFields}
        />

        <Box width="100%" mt="8px" component="ul">
          {selectedFields?.map((column) => (
            <Box
              component="li"
              draggable
              onDragStart={(e) => handleDragStart(e, column)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column)}
              p="8px"
              width="100%"
              display="flex"
              className={`${draggingItem?.value === column.value ? 'edit-columns-drag-item hover:cursor-grab' : ''}`}
              justifyContent="space-between"
              alignItems="center"
              key={column?.value}>
              <Box display="flex" borderRadius="8px" alignItems="center" gap="4px">
                <IconGripVertical
                  className={`${draggingItem?.value === column.value ? 'edit-columns-drag-item !cursor-grabbing' : '!cursor-grab'}`}
                  color="#8B93A7"
                  size={16}
                />

                <Typography variant="subtitle1" color="#353A46">
                  {column?.label}
                </Typography>
              </Box>

              <Box
                className={`rounded-full ${column?.disabled ? 'cursor-not-allowed' : 'cursor-pointer custom-hover-shadow'} p-[2px]`}>
                <IconX onClick={() => handleRemoveColumn(column)} size={16} color="#8B93A7" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt="24px" justifySelf="flex-end" display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex" alignItems="center" gap="12px">
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>

          <Button variant="contained" onClick={() => handleSubmit(selectedFields)}>
            Select
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
