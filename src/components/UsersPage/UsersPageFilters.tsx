import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, debounce } from '@mui/material'
import { IconKey, IconProgressCheck, IconSettings, IconTableExport } from '@tabler/icons-react'

import { config } from '../../config'
import { CheckboxesFilter, FormModal, SearchTextField, useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { getTotalItems, mapObjectsToOptions } from '../../shared/helpers/applicationHelpers'

import { csvExportFields, defaultUsersTableFields, userStatusFilterOptions } from './constants'
import { EditColumnsModal } from './EditColumnsModal'
import { ExportCsvModal } from './ExportCsvModal'

export const UsersPageFilters = ({
  selectedUsers,
  selectedColumns,
  setSelectedColumns,
  getUsers,
  page,
  limit,
  filters,
  setFilters
}: {
  selectedUsers: any[]
  selectedColumns: any[]
  setSelectedColumns: React.Dispatch<React.SetStateAction<any[]>>
  getUsers: any
  page: number
  limit: number
  filters: {
    name: string
    roles: any[]
    statuses: any[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name: string
      roles: any[]
      statuses: any[]
    }>
  >
}) => {
  const { handleOpen, handleClose } = useModalContext()

  const [openExportModal, setOpenExportModal] = useState(false)
  const [exportOption, setExportOption] = useState(0)
  const [exportFieldOption, setExportFieldOption] = useState(0)
  const [exportFormatOption, setExportFormatOption] = useState(0)
  const [selectedCsvFields, setSelectedCsvFields] = useState<any[]>(defaultUsersTableFields)

  const roles = useSelector((state: any) => state.role.activeRoles.roles)

  const RoleOptions = useMemo(() => {
    return mapObjectsToOptions(roles, '_id', 'name')
  }, [roles])

  const handleSearch = useCallback(
    debounce((query: string) => {
      getUsers({ page, limit, ...filters, name: query })
    }, 500), // 500ms delay
    [page, limit, filters]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: value
    }))
    handleSearch(value)
  }

  const handleCancel = () => {
    setFilters({ ...filters, name: '' })
    getUsers({ page, limit, ...filters, name: '' })
  }

  const handleApplyRoleFilter = (values: any[]) => {
    setFilters({ ...filters, roles: values })
    getUsers({ page, limit, ...filters, roles: values })
  }

  const handleApplyStatusFilter = (values: any[]) => {
    setFilters({ ...filters, statuses: values })
    getUsers({ page, limit, ...filters, statuses: values })
  }

  const handleExportClick = () => setOpenExportModal(true)

  const handleExport = () => {
    setOpenExportModal(false)
    const format = exportFormatOption === 0 ? 'excel' : 'csv'

    let queryfields = []
    switch (exportFieldOption) {
      case 0:
        queryfields = csvExportFields.map((field) => field.value)
        break
      case 1:
        queryfields = ['givenName', 'lastName', 'email', 'image', 'role', 'status']
        break
      case 2:
        queryfields = selectedCsvFields.map((col) => col.value)
        break
    }

    const usersArray = selectedUsers?.map((user) => user._id)

    const csvDownloadUrl = `${config.API_BASE_URL}/user/download/all?queryfields=${queryfields.join(',')}&format=${format}&usersArray=${usersArray.join(',')}`

    // Create an anchor element
    const link = document.createElement('a')
    link.href = csvDownloadUrl

    // Specify that the file should be downloaded
    link.download = 'users.csv'

    // Append the anchor element to the document body
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Remove the anchor element from the document after download
    document.body.removeChild(link)
  }

  const handleEditColumnsSubmit = (payload: any) => {
    setSelectedColumns(payload)
    handleClose()
  }

  const handleEditColumns = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <EditColumnsModal
            defaultValues={selectedColumns}
            handleCancel={handleClose}
            handleSubmit={handleEditColumnsSubmit}
          />
        ),
        title: 'Edit Columns'
      }
    })
  }

  return (
    <Box className="mx-12 md:mx-8 sm:mx-4" display="flex" alignItems="center" justifyContent="space-between" mb="16px">
      <Box display="flex" alignItems="center" gap="8px">
        <SearchTextField
          placeholder="Search Users"
          onChange={handleInputChange}
          onCancel={handleCancel}
          value={filters.name}
        />

        <CheckboxesFilter
          value={filters.roles}
          options={RoleOptions}
          header="Filter by Role"
          label="Role"
          handleApply={handleApplyRoleFilter}
          StartIcon={IconKey}
        />

        <CheckboxesFilter
          value={filters.statuses}
          options={userStatusFilterOptions}
          header="Filter by Status"
          label="Status"
          handleApply={handleApplyStatusFilter}
          StartIcon={IconProgressCheck}
        />
      </Box>

      <Box display="flex" alignItems="center" gap="8px">
        <Button onClick={handleExportClick} variant="outlined">
          <IconTableExport size={20} color="#4F5668" className="mr-2" />
          Export
        </Button>

        <Button onClick={handleEditColumns} variant="outlined">
          <IconSettings size={20} color="#4F5668" className="mr-2" />
          Edit columns
        </Button>
      </Box>

      {openExportModal && (
        <FormModal
          open={openExportModal}
          handleClose={() => setOpenExportModal(false)}
          fullscreen={false}
          width="md"
          title="Export"
          subtitle={exportOption === 0 ? `${selectedUsers?.length} users selected` : `${getTotalItems()} users total`}
          form={
            <ExportCsvModal
              selectedCsvFields={selectedCsvFields}
              setSelectedCsvFields={setSelectedCsvFields}
              exportOption={exportOption}
              setExportOption={setExportOption}
              exportFieldOption={exportFieldOption}
              setExportFieldOption={setExportFieldOption}
              exportFormatOption={exportFormatOption}
              setExportFormatOption={setExportFormatOption}
              handleCancel={() => setOpenExportModal(false)}
              handleSubmit={handleExport}
            />
          }
        />
      )}
    </Box>
  )
}
