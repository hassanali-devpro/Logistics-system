import React from 'react'
import { TabsOwnProps } from '@mui/material'

export const StepOneStyles = (tab?: number, selectedTab?: number) => {
  return {
    tabs: {
      height: '40px',
      borderRadius: '12px',
      background: '#F3F4F6',
      padding: '4px',
      textTransform: 'capitalize'
    } as React.CSSProperties,
    tabIndicator: {
      style: { display: 'none' }
    } as TabsOwnProps['TabIndicatorProps'],
    tab: {
      fontFamily: 'Outfit',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '16px',
      display: 'flex',
      gap: '8px',
      height: '40px',
      minHeight: 'fit-content',
      textTransform: 'capitalize',
      borderRadius: '8px',
      padding: '8px',
      backgroundColor: tab === selectedTab ? 'white' : '#F3F4F6'
    } as React.CSSProperties
  }
}
