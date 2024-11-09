import React from 'react'
import { TabsOwnProps } from '@mui/material'

export const TopNavBarStyles = (tab?: number, selectedTab?: number) => {
  return {
    tabs: {
      height: '40px',
      minHeight: '40px',
      borderRadius: '999px',
      background: '#F3F4F6',
      width: '140px',
      display: 'flex',
      gap: '4px',
      padding: '4px',
      textTransform: 'capitalize'
    } as React.CSSProperties,
    tabIndicator: {
      style: { display: 'none' }
    } as TabsOwnProps['TabIndicatorProps'],
    tab: {
      fontFamily: 'Outfit',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      lineHeight: '20px',
      height: '32px',
      minWidth: '0px',
      minHeight: '0px',
      textTransform: 'capitalize',
      borderRadius: '999px',
      padding: '8px',
      color: tab === selectedTab ? '#1F69FF' : '#4F5668',
      backgroundColor: tab === selectedTab ? 'white' : '#F3F4F6'
    } as React.CSSProperties
  }
}
