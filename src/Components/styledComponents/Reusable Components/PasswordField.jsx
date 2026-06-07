import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react'

export default function PasswordField({name,label}) {
    const outlinedPasswordId = React.useId();
    const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl  fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`} sx={{color:'black'}}>{name}</InputLabel>
          <OutlinedInput sx={{color:'black'}}
            id={`${outlinedPasswordId}-input`}
            name={`${name}`}
            type={showPassword ? 'text' : 'password'}
            label={`${label}`}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
  )
}
