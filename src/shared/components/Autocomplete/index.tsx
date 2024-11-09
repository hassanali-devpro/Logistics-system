import { useEffect, useRef, useState } from 'react'
import { Autocomplete as MuiAutocomplete, Checkbox, Paper, Popper, Typography } from '@mui/material'
import { IconSearch } from '@tabler/icons-react'

import { CustomOutlinedInput } from '../CustomOutlinedInput'

import './styles.css'
import '../../styles/ThinScrollbarStyles.css'

export const Autocomplete = ({
  options,
  placeholder,
  value,
  onChange
}: {
  options: any[]
  placeholder?: string
  value: any
  onChange: any
}) => {
  const [inputValue, setInputValue] = useState('')
  const [listItemCount, setListItemCount] = useState(0)
  const [open, setOpen] = useState(false) // Manage the Autocomplete open state for Popper
  const inputRef = useRef<HTMLInputElement | null>(null)
  const anchorEl = useRef<HTMLDivElement | null>(null) // Reference to anchor Popper

  const handleInputChange = (event: any) => {
    setInputValue(event?.target?.value ?? '')
  }

  const CustomNoOptionsText = () => {
    return (
      <div className="flex justify-between items-center text-xs font-normal text-[#8B93A7]">
        <div>No matching results</div>

        <div>{`${value?.length}/${options?.length} selected`}</div>
      </div>
    )
  }

  const CustomPopper = () => {
    return (
      <Popper
        sx={{
          width: inputRef?.current?.clientWidth
        }}
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-start"
        className="z-50 rounded-t-lg"
        disablePortal>
        <Paper
          sx={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}
          elevation={2}
          className="z-50 p-4 mt-1 w-[-webkit-fill-available]">
          {listItemCount > 0 ? (
            <div className="rounded-t-lg flex justify-between items-center text-xs font-normal text-[#8B93A7]">
              <div>{inputValue ? `${listItemCount} matching results` : 'Available fields'}</div>
              <div>{`${value?.length}/${options?.length} selected`}</div>
            </div>
          ) : (
            <CustomNoOptionsText />
          )}
        </Paper>
      </Popper>
    )
  }

  useEffect(() => {
    const listboxClassName = 'MuiAutocomplete-listbox'
    const noOptionsClassName = 'MuiAutocomplete-noOptions'

    // Function to count li elements and update state
    const updateLiCount = (listbox: HTMLElement) => {
      const liElements = listbox.getElementsByTagName('li')
      setListItemCount(liElements.length)
    }

    // Callback for MutationObserver
    const handleMutation = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        // Check if the mutation is adding the noOptions element
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && node.classList.contains(noOptionsClassName)) {
            setListItemCount(0)
          }
        })

        // Check if mutations are related to the listbox
        if (mutation.target instanceof HTMLElement) {
          const listbox = document.querySelector(`.${listboxClassName}`)
          if (listbox) {
            updateLiCount(listbox as HTMLElement)
          }
        }
      })
    }

    // Set up MutationObserver to track changes in the body
    const observer = new MutationObserver(handleMutation)

    // Start observing the body for changes (or a parent element of the listbox)
    const targetNode = document.body

    observer.observe(targetNode, {
      childList: true, // Observe direct children being added/removed
      subtree: true // Observe the entire subtree
    })

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={anchorEl}>
      <MuiAutocomplete
        ref={inputRef}
        multiple
        options={options}
        fullWidth
        disableCloseOnSelect
        disablePortal
        disableClearable
        value={value}
        open={open}
        slotProps={{
          paper: {
            sx: {
              marginTop: '48px',
              boxShadow: 2,
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px'
            }
          }
        }}
        getOptionDisabled={(option: any) => option.disabled}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        onChange={onChange}
        onInputChange={handleInputChange}
        onOpen={() => setOpen(true)} // Show the Popper when Autocomplete opens
        onClose={() => setOpen(false)} // Hide the Popper when Autocomplete closes
        renderOption={(props, option: any, { selected }) => {
          const { key, ...optionProps } = props
          return (
            <li className="!px-0 !py-0 !mx-0" key={key} {...optionProps}>
              <Checkbox style={{ marginRight: '2px' }} checked={selected} />

              <Typography variant="subtitle1" color="#353A46">
                {option?.label}
              </Typography>
            </li>
          )
        }}
        renderInput={(params) => (
          <CustomOutlinedInput
            {...params}
            backgroundColor="#F3F4F6"
            height="40px"
            fontSize="14px"
            lineHeight="20px"
            InputProps={{
              ...params?.InputProps,
              startAdornment: <IconSearch className="!ml-3" size={20} color="#8B93A7" />
            }}
            placeholder={placeholder}
          />
        )}
      />
      <CustomPopper />
    </div>
  )
}
