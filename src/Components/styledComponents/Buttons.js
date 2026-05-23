import { Button, styled } from "@mui/material";


export let PrimaryButton= styled(Button)(({theme})=>({
    backgroundColor:theme.colorSchemes.dark.palette.primary.main,
    color:theme.colorSchemes.dark.palette.primary.contrastText,
    borderRadius:'20px',
    height:'28px',
    width:'55px',
}))
export let SecondaryButton= styled(PrimaryButton)(({theme})=>({
    backgroundColor:theme.colorSchemes.light.palette.primary.main,
    color:theme.colorSchemes.light.palette.primary.contrastText,

}))


export let LinkButton= styled(Button)(({theme})=>({
    backgroundColor:theme.colorSchemes.dark.palette.primary.main,
    color:theme.colorSchemes.dark.palette.primary.contrastText,
    '&: hover':{
        textDecoration:'underline'
    }

}))