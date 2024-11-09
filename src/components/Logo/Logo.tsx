// src/components/Logo/Logo.tsx
import React from 'react'

import styles from './Logo.module.css'

import logoImage from '/images/Logo.png'

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <img src={logoImage} alt="Logo" />
    </div>
  )
}

export default Logo
