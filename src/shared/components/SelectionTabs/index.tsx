import React from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'

export const SelectionTabs = ({
  options,
  currentTab,
  setCurrentTab,
  height = '56px',
  fontSize = '16px',
  lineHeight = '24px',
  fontWeight = 500,
  color = '#353A46',
  borderRadius = '8px',
  heading,
  headingClass,
  gap = '8px',
  fullWidth,
  width = '100%',
  border = '1px solid #D1D4DC'
}: {
  options: any[]
  currentTab: number
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>
  height?: number | string
  fontSize?: number | string
  lineHeight?: number | string
  fontWeight?: number | string
  color?: string
  borderRadius?: number | string
  heading: string
  headingClass?: string
  gap?: number | string
  fullWidth?: boolean
  width?: number | string
  border?: string
}) => {
  const handleChange = (_e: any, newTab: number) => {
    setCurrentTab(newTab)
  }

  const getIconComponent = (Icon: React.ComponentType) => {
    return <Icon />
  }

  return (
    <Box display="flex" flexDirection="column" gap={gap} width={fullWidth ? '100%' : (width ?? '100%')}>
      <Typography variant="body1" color="#353A46" className={headingClass}>
        {heading}
      </Typography>

      <Tabs
        value={currentTab}
        variant="fullWidth"
        selectionFollowsFocus
        onChange={handleChange}
        style={{
          height: height,
          borderRadius: borderRadius,
          background: '#fff',
          textTransform: 'capitalize',
          border: border
        }}
        sx={{
          '& .MuiTabs-flexContainer': {
            height: '100%'
          }
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}>
        {options.map((option: any, index: number) => (
          <Tab
            key={index}
            icon={getIconComponent(option.icon)}
            iconPosition="start"
            label={option.label}
            style={{
              fontSize: fontSize,
              fontStyle: 'normal',
              fontWeight: fontWeight,
              lineHeight: lineHeight,
              color: index === currentTab ? '#1F69FF' : color,
              display: 'flex',
              gap: '8px',
              height: '100%',
              minHeight: 'fit-content',
              textTransform: 'capitalize',
              borderRadius: borderRadius,
              padding: '8px',
              borderWidth: index === currentTab ? '1px' : '0px',
              borderStyle: 'solid',
              borderColor: '#1F69FF',
              backgroundColor: index === currentTab ? '#F5F8FF' : '#FFF'
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
