import { Button, ButtonProps, CircularProgress } from '@mui/material'

export interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
  loaderSize?: number | string
  gap?: number | string
}

export const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <Button {...props}>
      {props.children}
      {props.isLoading && (
        <CircularProgress
          style={{
            marginLeft: props.gap ?? '4px'
          }}
          size={props.loaderSize ?? '20px'}
        />
      )}
    </Button>
  )
}
