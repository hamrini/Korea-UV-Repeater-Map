import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Footer from "./Footer";

import ForumIcon from '@mui/icons-material/Forum';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const DrawerContents = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        메뉴
                    </ListSubheader>
                }>
                <ListItem button  disabled>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="내 주변 정보"  secondary="서비스 준비 중" />
                </ListItem>

            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        추천 사이트
                    </ListSubheader>
                }>
                <ListItem button onClick={() => { window.open('https://gall.dcinside.com/mgallery/board/lists?id=hamradio') }}>
                    <ListItemIcon>
                        <ForumIcon />
                    </ListItemIcon>
                    <ListItemText primary="DC 아마추어무선갤" />
                </ListItem>
                <ListItem button onClick={() => { window.open('https://hamwiki.kr') }}>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="햄위키" />
                </ListItem>
            </List>
        </Box>
        <Box>
            <Footer />

        </Box>
    </Box>
);