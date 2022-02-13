import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
export default function Footer() {

    const Root = styled(Box)(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        '& .MuiTypography-body2': {
            fontWeight: 'bold'
        }
        //  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.light} 100%)`,
    }));

    return (
        <Root sx={{ p: 2 }}>
            <Typography variant="body2" >
                Korea UV MAP. 2022
            </Typography>
            <Typography variant="caption" >
                by 햄린이(Jason Park)
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
                Special Thanks to...
            </Typography>
            <Typography variant="caption" >
                위키러
            </Typography>
        </Root >
    )
}