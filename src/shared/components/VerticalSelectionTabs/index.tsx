import React from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'

import { RadioCheckCircle } from '../RadioCheckCircle'

export const VerticalSelectionTabs = ({
  options,
  currentTab,
  setCurrentTab,
  height = '80px',
  heading,
  headingClass,
  gap = '8px'
}: {
  options: any[]
  currentTab: number
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>
  height?: number | string
  heading: string
  headingClass?: string
  gap?: number | string
}) => {
  const handleChange = (_e: any, newTab: number) => {
    setCurrentTab(newTab)
  }

  const TabLabel = ({ option, isSelected }: { option: any; isSelected: boolean }) => {
    return (
      <Box display="flex" width="100%" pr="8px" justifyContent="space-between" alignItems="center" gap="16px">
        <Box display="flex" gap="12px" alignItems="center">
          <RadioCheckCircle checked={isSelected} />

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="body1" color="#353A46">
              {option.label}
            </Typography>

            <Typography variant="caption" color="#8B93A7">
              {option.description}
            </Typography>
          </Box>
        </Box>

        {option?.end && (
          <Box display="flex" alignItems="center">
            {option.end}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={gap} width="100%">
      <Typography variant="body1" color="#353A46" className={headingClass}>
        {heading}
      </Typography>

      <Tabs
        value={currentTab}
        variant="fullWidth"
        selectionFollowsFocus
        orientation="vertical"
        onChange={handleChange}
        style={{
          borderRadius: '8px',
          background: '#fff',
          textTransform: 'none'
        }}
        sx={{
          '& .MuiTabs-flexContainer': {
            height: '100%',
            gap: '8px'
          }
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}>
        {options.map((option: any, index: number) => (
          <Tab
            key={index}
            iconPosition="start"
            label={<TabLabel option={option} isSelected={index === currentTab} />}
            style={{
              fontStyle: 'normal',
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '8px',
              height: height,
              minHeight: height,
              borderRadius: '8px',
              padding: '8px',
              textTransform: 'none',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: index === currentTab ? '#1F69FF' : '#D1D4DC',
              backgroundColor: index === currentTab ? '#F5F8FF' : '#FFF'
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
