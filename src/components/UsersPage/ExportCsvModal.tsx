import React, { useCallback, useMemo } from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/material'

import { SelectionTabs, useModalContext, VerticalSelectionTabs } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { InfoIcon } from '../../shared/icons'

import { csvExportFieldOptions, csvExportFormatOptions, csvExportOptions, defaultUsersTableFields } from './constants'
import { SelectCsvFieldsModal } from './SelectCsvFieldsModal'

export const ExportCsvModal = ({
  selectedCsvFields,
  setSelectedCsvFields,
  exportOption,
  setExportOption,
  exportFieldOption,
  setExportFieldOption,
  exportFormatOption,
  setExportFormatOption,
  handleCancel,
  handleSubmit
}: {
  selectedCsvFields: any[]
  setSelectedCsvFields: React.Dispatch<React.SetStateAction<any[]>>
  exportOption: number
  setExportOption: React.Dispatch<React.SetStateAction<number>>
  exportFieldOption: number
  setExportFieldOption: React.Dispatch<React.SetStateAction<number>>
  exportFormatOption: number
  setExportFormatOption: React.Dispatch<React.SetStateAction<number>>
  handleCancel: any
  handleSubmit: any
}) => {
  const { handleOpen, handleClose } = useModalContext()

  const handleSelectFieldsSubmit = (selectedFields: any[]) => {
    setSelectedCsvFields(selectedFields)
    handleClose()
  }

  const handleSelectClick = useCallback(() => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <SelectCsvFieldsModal
            defaultValues={selectedCsvFields}
            handleCancel={handleClose}
            handleSubmit={handleSelectFieldsSubmit}
          />
        ),
        title: 'Select Fields'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCsvFields])

  const exportCsvFieldOptions = useMemo(() => {
    return [
      csvExportFormatOptions[0],
      {
        ...csvExportFieldOptions[1],
        end: (
          <Box display="flex" alignItems="center" gap="2px">
            <Typography variant="subtitle1" color="#8B93A7">
              {defaultUsersTableFields?.length} fields
            </Typography>

            <Tooltip
              title={
                <div>
                  {defaultUsersTableFields.map((field) => (
                    <div key={field.label}>{field.label}</div>
                  ))}
                </div>
              }
              placement="right"
              arrow>
              <span>
                <InfoIcon stroke="#8B93A7" />
              </span>
            </Tooltip>
          </Box>
        )
      },
      {
        ...csvExportFieldOptions[2],
        description:
          exportFieldOption === 2 ? `${selectedCsvFields?.length} fields selected` : 'Select only fields you need',
        end: (
          <Button variant="text" color="primary" onClick={handleSelectClick}>
            Select
          </Button>
        )
      }
    ]
  }, [selectedCsvFields, exportFieldOption, handleSelectClick])

  return (
    <Box display="flex" mb="24px" flexDirection="column" gap="24px">
      <SelectionTabs
        currentTab={exportOption}
        setCurrentTab={setExportOption}
        heading="Users to export"
        options={csvExportOptions}
      />

      <VerticalSelectionTabs
        currentTab={exportFieldOption}
        setCurrentTab={setExportFieldOption}
        heading="Fields to export"
        options={exportCsvFieldOptions}
      />

      <SelectionTabs
        currentTab={exportFormatOption}
        setCurrentTab={setExportFormatOption}
        heading="Format"
        options={csvExportFormatOptions}
      />

      <Box display="flex" mt="24px" justifyContent="flex-end" alignItems="center" gap="12px">
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          Export
        </Button>
      </Box>
    </Box>
  )
}
