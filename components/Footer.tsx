import { Box, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ForumIcon from '@mui/icons-material/Forum';
import MenuBookIcon from '@mui/icons-material/MenuBook';
export default function Footer() {

    const HamToolbar = styled(Toolbar)(({ theme }) => ({
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        maxHeight: '30px',
        //  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.light} 100%)`,
    }));

    return (
        <HamToolbar>
            <Box flexGrow={1} >
                <Typography variant="h6" color="inherit" sx={{ display: 'inline-flex', margin: '0 16px 0 0' }}>
                    Link:
                </Typography>
                <Button startIcon={<ForumIcon />} variant="contained" color="secondary" size="small" sx={{ margin: '0 16px 0 0' }}
                    onClick={() => { window.open('https://gall.dcinside.com/mgallery/board/lists?id=hamradio') }}>
                    DC 아무갤
                </Button>
                <Button startIcon={<MenuBookIcon />} variant="contained" color="secondary" size="small" sx={{ margin: '0 16px 0 0' }}
                    onClick={() => { window.open('https://hamwiki.kr') }}>
                    햄위키
                </Button>
            </Box>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                아마추어무선갤러리 무선 중계기 지도 by 햄린이(Jason Park)
            </Typography>
            <Typography variant="body2">
                Spesial Thanks to: 위키러
            </Typography>
        </HamToolbar >
    )
}