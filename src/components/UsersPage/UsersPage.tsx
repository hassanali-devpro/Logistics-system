/* eslint-disable no-unused-vars */
/* eslint-disable typescript-enum/no-enum */
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material'
import { IconDotsVertical, IconPlus } from '@tabler/icons-react'
import { cloneDeep } from 'lodash'

import { AvatarWithLabel, Breadcrumbs, TablePagination, useModalContext } from '../../shared/components'
import { Delay } from '../../shared/components/Delay'
import { defaultPageSizes, FORM_MODAL } from '../../shared/constants'
import { getTotalItems, mapObjectsToOptions } from '../../shared/helpers/applicationHelpers'
import { formatDateFromTimestamp } from '../../shared/helpers/unixTimestampHelpers'
import { useGetActiveRolesQuery } from '../../wms-store/services/roleService'
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../wms-store/services/userService'

import { AddUserForm } from './AddUserForm'
import { defaultUsersTableFields, getSelectedUserAttributes, roleSortOrder, statusSortOrder } from './constants'
import { UserActionsMenu } from './UserActionsMenu'
import { UsersActionBar } from './UsersActionBar'
import { UsersPageFilters } from './UsersPageFilters'
import { UserStatus } from './UserStatus'
import { UserStatusPill } from './UserStatusPill'

enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc'
}

const UsersPage = () => {
  const users = useSelector((state: any) => state.auth.users)
  const roles = useSelector((state: any) => state.role.activeRoles.roles)

  const [sortedUsers, setSortedUsers] = useState<any[]>(users)
  const [sortField, setSortField] = useState<string>('userName')
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending)
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [selectedColumns, setSelectedColumns] = useState<any[]>(defaultUsersTableFields)
  const [allSelected, setAllSelected] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(defaultPageSizes[0])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [filters, setFilters] = useState({
    name: '',
    roles: [] as any[],
    statuses: [] as any[]
  })

  const { handleOpen, handleClose } = useModalContext()
  const [getUsers, { isFetching, isLoading }] = useLazyGetUsersQuery()
  const { isLoading: isLoadingUsers, isFetching: isFetchingUsers } = useGetUsersQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true
    }
  )
  useGetActiveRolesQuery({})

  const menuOpen = Boolean(anchorEl)
  const showUsersLoader = isFetching || isLoading || isFetchingUsers || isLoadingUsers

  const columnsForDisplay = useMemo(
    () =>
      selectedColumns.filter(
        (column) => column.included && !['givenName', 'lastName', 'email', 'image'].includes(column.value)
      ),
    [selectedColumns]
  )

  const RoleOptions = useMemo(() => {
    return mapObjectsToOptions(roles, '_id', 'name')
  }, [roles])

  const parsedUsers = useMemo(() => {
    // since by default, columns ['givenName', 'lastName', 'email', 'image'] are not
    // included in the displayed columns
    if (columnsForDisplay.length === 2) return users

    const usersForDisplay = cloneDeep(users)

    usersForDisplay?.map((user: any) =>
      columnsForDisplay.map((column) => {
        switch (column.value) {
          case 'DOB':
          case 'createdAt':
          case 'lastLoginAt':
            user[`parsed${column.value}`] = formatDateFromTimestamp(user[column.value], 'MMM. DD YYYY', ' ')
            break

          case 'phone':
            user[`parsedphone`] = `${user?.phone?.cc} ${user?.phone?.number}`
            break

          default:
            break
        }
      })
    )
    sortUsers(usersForDisplay, sortOrder, sortField)

    return usersForDisplay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, columnsForDisplay])

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, user: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      const newSortOrder = sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending
      setSortOrder(newSortOrder)
      sortUsers(parsedUsers, newSortOrder, field)
    } else {
      setSortField(field)
      setSortOrder(SortOrder.Ascending)
      sortUsers(parsedUsers, SortOrder.Ascending, field)
    }
  }

  const sortUsers = (usersToSort: any[], sortOrder: SortOrder, sortField: string) => {
    const sorted = [...usersToSort]

    // Common function for comparing dates
    const compareDates = (dateA: number, dateB: number) =>
      sortOrder === SortOrder.Ascending ? dateA - dateB : dateB - dateA

    // Common function for comparing strings (e.g., names)
    const compareStrings = (strA: string, strB: string) =>
      sortOrder === SortOrder.Ascending ? strA.localeCompare(strB) : strB.localeCompare(strA)

    switch (sortField) {
      case 'status': {
        sorted.sort((a, b) => {
          const statusA = statusSortOrder[a.status] || 0
          const statusB = statusSortOrder[b.status] || 0
          return sortOrder === SortOrder.Ascending ? statusA - statusB : statusB - statusA
        })
        break
      }

      case 'userRole': {
        sorted.sort((a, b) => {
          const roleA = roleSortOrder[a.userRole] || 0
          const roleB = roleSortOrder[b.userRole] || 0
          return sortOrder === SortOrder.Ascending ? roleA - roleB : roleB - roleA
        })
        break
      }

      case 'userName': {
        sorted.sort((a, b) => {
          const nameA = `${a.givenName} ${a.lastName}`.toLowerCase()
          const nameB = `${b.givenName} ${b.lastName}`.toLowerCase()
          return compareStrings(nameA, nameB)
        })
        break
      }

      case 'DOB':
      case 'createdAt':
      case 'lastLoginAt': {
        sorted.sort((a, b) => {
          const dateA = a[sortField] !== null ? Number(a[sortField]) : 0
          const dateB = b[sortField] !== null ? Number(b[sortField]) : 0
          return sortOrder === SortOrder.Ascending ? dateA - dateB : dateB - dateA
        })
        break
      }

      case 'phone': {
        sorted.sort((a, b) => {
          const phoneA = a['parsedphone'] || ''
          const phoneB = b['parsedphone'] || ''
          return compareStrings(phoneA, phoneB)
        })
        break
      }

      default: {
        sorted.sort((a, b) => compareDates(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime()))
        break
      }
    }

    setSortedUsers(sorted)
  }

  const handleSelectAllChange = () => {
    if (allSelected) {
      setSelectedUsers([])
      setAllSelected(false)
    } else {
      setSelectedUsers(sortedUsers.map((user) => getSelectedUserAttributes(user)))
      setAllSelected(true)
    }
  }

  const handleSelectUser = (event: ChangeEvent<HTMLInputElement>, user: any) => {
    if (event.target.checked) {
      if (selectedUsers.length === sortedUsers.length - 1) setAllSelected(true)
      setSelectedUsers([...selectedUsers, getSelectedUserAttributes(user)])
    } else {
      setSelectedUsers(selectedUsers.filter((usr) => usr._id !== user._id))
      setAllSelected(false)
    }
  }

  const handleNewUserClick = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <AddUserForm roleOptions={RoleOptions} handleClose={handleClose} />,
        title: 'Add user',
        subtitle: 'Create new user to join your workspace'
      }
    })
  }

  const handlePaginationChange = (_e: any, value: number) => {
    setPage(value)
    getUsers({ page: value, limit, ...filters })
  }

  const handlePageSizeChanged = (pageSize: number) => {
    setLimit(pageSize)
    setPage(1)
    getUsers({ page: 1, limit: pageSize, ...filters })
  }

  const getTableCellContent = (columnValue: string, user: any) => {
    switch (columnValue) {
      case 'phone':
      case 'DOB':
      case 'createdAt':
      case 'lastLoginAt':
        return (
          <Typography textTransform="capitalize" variant="subtitle1" color="#353A46">
            {user[`parsed${columnValue}`]}
          </Typography>
        )

      case 'status': {
        return (
          <Box display="flex" alignItems="center" gap="16px">
            <UserStatusPill status={user?.status} />

            <UserStatus activity={{ ...user?.activity?.[0], tmpPasswordExpiresAt: user?.tmpPasswordExpiresAt }} />
          </Box>
        )
      }

      default:
        return (
          <Typography textTransform="capitalize" variant="subtitle1" color="#353A46">
            {user[columnValue]}
          </Typography>
        )
    }
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box className="py-6 md:py-4 sm:py-2 px-12 md:px-8 sm:px-4">
        <Breadcrumbs />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="#1A1D23" variant="h3" fontWeight={700}>
            Users
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained">
            <IconPlus size={24} className="mr-1" />
            New User
          </Button>
        </Box>

        <Typography variant="h6" color="#8B93A7">
          Add and manage members in your team
        </Typography>
      </Box>

      <UsersPageFilters
        page={page}
        limit={limit}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        getUsers={getUsers}
        selectedUsers={selectedUsers}
        filters={filters}
        setFilters={setFilters}
      />

      <TableContainer
        id="scroll-bar-id"
        component={Paper}
        className="flex-1 flex flex-col !w-[-webkit-fill-available] overflow-auto relative mb-3 mx-12 md:mx-8 sm:mx-4">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={allSelected} id="select-all" onChange={handleSelectAllChange} />
              </TableCell>

              <TableCell sortDirection={sortField === 'userName' ? sortOrder : 'asc'}>
                <TableSortLabel
                  active={sortField === 'userName'}
                  direction={sortField === 'userName' ? sortOrder : 'asc'}
                  onClick={() => handleSort('userName')}>
                  Users
                </TableSortLabel>
              </TableCell>

              {columnsForDisplay.map((column) => (
                <TableCell key={column.value}>
                  <TableSortLabel
                    active={sortField === column.value}
                    direction={sortField === column.value ? sortOrder : 'asc'}
                    onClick={() => handleSort(column.value)}>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {showUsersLoader ? (
            <Box
              display="flex"
              position="absolute"
              width="-webkit-fill-available"
              height="-webkit-fill-available"
              alignItems="center"
              justifyContent="center">
              <Delay size="5vw" />
            </Box>
          ) : (
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow
                  className={`${selectedUsers.some((usr) => usr._id === user._id) ? 'bg-[#F5F8FF]' : ''}`}
                  hover
                  key={user?._id}>
                  <TableCell>
                    <Checkbox
                      checked={allSelected || selectedUsers.some((usr) => usr._id === user._id)}
                      onChange={(event) => handleSelectUser(event, user)}
                    />
                  </TableCell>

                  <TableCell>
                    <AvatarWithLabel
                      imgSrc={user?.image}
                      label={`${user?.givenName} ${user?.lastName}`}
                      subLabel={user?.email}
                    />
                  </TableCell>

                  {columnsForDisplay.map((column) => {
                    return <TableCell key={column.value}>{getTableCellContent(column.value, user)}</TableCell>
                  })}

                  <TableCell>
                    <IconButton
                      id="basic-button"
                      aria-controls={menuOpen ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={menuOpen ? 'true' : undefined}
                      onClick={(e) => {
                        handleMenuClick(e, user)
                      }}>
                      <IconDotsVertical color="#8B93A7" size={24} />
                    </IconButton>

                    <UserActionsMenu user={selectedUser} anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        <Box className="flex-1"></Box>

        <Box className="sticky bottom-0 bg-white z-10">
          <TablePagination
            page={page}
            pageSize={limit}
            records={users?.length}
            totalItemsCount={getTotalItems()}
            handlePageSizeChanged={handlePageSizeChanged}
            handlePaginationChange={handlePaginationChange}
          />
        </Box>
      </TableContainer>

      <UsersActionBar
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setAllSelected={setAllSelected}
      />
    </Box>
  )
}

export default UsersPage
