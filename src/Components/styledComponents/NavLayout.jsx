import { Box, Toolbar, AppBar, Stack, IconButton } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkButton, SecondaryButton } from './Buttons'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { TextAlignCenter } from 'lucide-react';

export default function NavLayout() {
    const lists=["Home","Register","Login"]
    const navigate = useNavigate()

    const linksLists=lists.map((i,ind)=>{
        if(ind==`${lists.length-1}`) return null
            
        return(
            <Link to={`${i.toLocaleLowerCase()}`} key={ind}>
            <LinkButton sx={{textAlign:'center'}} sx={{mx:'auto',width:"100%"}}>{i}</LinkButton>
            </Link>
        )
    })
     const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Stack 
      sx={{alignItems:"center", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,mx:'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Stack sx={{width:'100%',}}
      //    onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
      >
        {linksLists}
        <SecondaryButton onClick={()=>navigate(`/login`,{replace:true})} sx={{width:"100%"}}>{"Login"}</SecondaryButton>                     
        </Stack>

    </Stack>
    
  );
  return (
    <div>
        <AppBar position='static' sx ={{backgroundColor:'primary',borderRadius:30}}>
            <Toolbar>
                <Stack sx={{flexGrow:1}}>
                    Logo
                </Stack>
                <Stack direction={'row'}  sx={{justifyContent:'space-between',alignItems:'center',flexGrow:1, display:{xs:'none', sm:'flex'}}}>
                <Stack direction={'row'}>
                    {linksLists}             
                </Stack>
                <Stack direction={'row'} sx={{ display:{xs:'none', sm:'flex'}}}>
                    <SecondaryButton onClick={()=>navigate(`/login`,{replace:true})}>{"Login"}</SecondaryButton>
                        
                </Stack>
                </Stack>
                <IconButton onClick={toggleDrawer('top', true)}  sx={{ display:{xs:'block', sm:'none'}}}>                    
                            <MenuIcon sx={{color:'white'}}/>
                </IconButton>
            </Toolbar>
          <SwipeableDrawer
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}            
          >
            {list(top)}
          </SwipeableDrawer>

        </AppBar>
    </div>
  )
}
