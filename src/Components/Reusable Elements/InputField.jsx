import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

export default function InputField({name,label}) {
  return (
        <FormControl fullWidth sx={{ m: 1}}>
          <InputLabel htmlFor={`e-input`} sx={{color:'black'}}>{name}</InputLabel>
          <OutlinedInput sx={{color:'black'}}
            id={`input`}
            name={`${name}`}
            type='text'
            label={`${label}`}
          />
        </FormControl>
  )
}
