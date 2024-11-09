/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react'
import { Box, MenuItem, Pagination, Select, Typography, useMediaQuery } from '@mui/material'

import { defaultPageSizes } from '../../constants'

const PaginatedItemsCount = ({
  page = 0,
  pageSize = 0,
  records = 0,
  totalItems = 0
}: {
  page: number
  pageSize: number
  records: number
  totalItems: number
}) => {
  return (
    <Typography color="#4F5668" variant="subtitle1">
      {(records > 0 ? page * pageSize - pageSize + 1 : 0) +
        ' - ' +
        (page * pageSize - pageSize + (records && records)) +
        ' of ' +
        totalItems}
    </Typography>
  )
}

export const TablePagination = ({
  page,
  pageSize,
  records,
  pageSizes = defaultPageSizes,
  totalItemsCount,
  handlePageSizeChanged,
  handlePaginationChange
}: {
  page: number
  pageSize: number
  records: number
  pageSizes?: number[]
  totalItemsCount: number
  handlePaginationChange: (event: ChangeEvent<unknown>, page: number) => void
  handlePageSizeChanged: (value: number) => void
}) => {
  const isSmallScreen = useMediaQuery('(max-width:768px)')

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" px="8px" py="4px">
      <PaginatedItemsCount page={page} pageSize={pageSize} records={records} totalItems={totalItemsCount} />

      <Pagination
        count={Math.ceil(totalItemsCount / pageSize)}
        page={page}
        onChange={handlePaginationChange}
        size={isSmallScreen ? 'small' : 'large'}
        showFirstButton
        showLastButton
      />

      <Box display="flex" alignItems="center" gap="8px">
        <Typography color="#4F5668" variant="subtitle1">
          Results per page
        </Typography>
        <Select
          size="small"
          sx={{
            '& .MuiSelect-outlined': {
              color: '#4F5668',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              borderRadius: '8px'
            }
          }}
          onChange={(event) => {
            handlePageSizeChanged(Number(event.target.value))
          }}
          value={pageSize}>
          {pageSizes?.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
