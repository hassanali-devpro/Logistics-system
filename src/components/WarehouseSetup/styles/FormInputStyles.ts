export const FormInputStyles = {
  inputStyles: {
    maxHeight: '28px',
    borderRadius: '4px',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400
  },
  textfieldStyles: {
    '& .MuiInputBase-root': {
      maxHeight: '28px',
      borderRadius: '4px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400
    }
  },
  numberInputStyles: {
    '& input[type=number]': {
      MozAppearance: 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    }
  },
  dropDownStyles: {
    '& .MuiInputBase-root': {
      height: '28px',
      minHeight: '28px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400
    },
    '& .MuiSelect-select': {
      height: '28px',
      minHeight: '28px',
      display: 'flex',
      alignItems: 'center'
    }
  },
  widthInputStyles: {
    '& .MuiInputBase-root': {
      maxHeight: '28px',
      borderRadius: '4px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      width: '100px',
      minWidth: '100px'
    }
  }
}
