import { Box, CssBaseline, ThemeProvider, createTheme, Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Footer from 'components/Footer'
import SearchAppBar from 'components/SearchAppBar'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import styles from 'styles/Home.module.css'

const drawerWidth = 240;
import React from 'react'
import { DrawerContents } from 'components/DrawerContents'
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const hamMapTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(33, 195, 249)',
    },  // red  
    secondary: {
      main: 'rgb(242, 12, 239)',
    },  // red
  },
})


const Home: NextPage = () => {
  const OlMapWithNoSSR = dynamic(() => import("components/OlMap"), { ssr: false });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | undefined>(undefined);





  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  React.useEffect(() => {
    const container = window !== undefined ? () => window.document.body : undefined;
    setContainer(container);
    // 안에서 window 객체를 사용
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>한국 아마추어 무선 중계기 지도</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keywords" content="햄린이,아마추어,무선,무선통신,UHF,VHF,중계기,KARL,HAMRINI,공돌이파파,사랑해요,144Mhz,430Mhz,HAM,아마추어무선갤러리" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:title" content="한국 아마추어 무선 중계기 지도" />
        <meta property="og:site_name" content="아마추어무선갤러리" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main >
        <ThemeProvider theme={hamMapTheme}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CssBaseline />
            <SearchAppBar handleDrawerToggle={handleDrawerToggle}
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }} />
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {DrawerContents}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {DrawerContents}
              </Drawer>
            </Box>
            <Box sx={{
              flexGrow: 1, display: 'flex',
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: {
                sm: `${drawerWidth}px`
              }
            }} >
              <Box sx={{ flexGrow: 1 }}>
                <OlMapWithNoSSR />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </main>
    </div >
  )
}

export default Home
