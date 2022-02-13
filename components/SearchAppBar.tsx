import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, CircularProgress, PaperProps, TextField } from '@mui/material';
import csvToGeojson from 'csv-geojson-conv';
import { GeoJsonObject } from 'geojson';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.light} 100%)`,

}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: 'inherit',
    //'& .MuiTextField-root': { padding: 0 },
    '& .MuiInputBase-root': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        // width: '100%',
        border: `1px solid ${theme.palette.divider}`,

        //[theme.breakpoints.up('sm')]: {
        width: '30ch',
        '&:focus-within': {
            width: '35ch',
        },
        // },

    },
}));


interface IProperties { Latitute: number, Longitude: number, Region: string, Name: string, Rx: Number, Tx: number, Tone: number, Shift: number, Note: string, Type: string }

interface IFeature { type: string, properties: IProperties, geometry: any }

interface SearchAppBarProps extends PaperProps {
    handleDrawerToggle: () => void
}

export default function SearchAppBar({ handleDrawerToggle, sx }: SearchAppBarProps) {
    const [geojson, setGeojson] = React.useState<GeoJsonObject | undefined>(undefined);
    const [options, setOptions] = React.useState<IProperties[]>([]);
    React.useEffect(() => {
        fetch('data/repeater.csv').then(async res => {
            const csvdata = await res.text();
            if (csvdata) {
                const geojson = csvToGeojson(csvdata)
                const { features } = geojson as any;
                if (features) {
                    const lsProp = features.map((feature: IFeature) => (
                        {
                            Name: feature.properties.Name,
                            Tx: Number(feature.properties.Tx),
                            Rx: Number(feature.properties.Rx),
                            Tone: Number(feature.properties.Tone),
                            Shift: Number(feature.properties.Shift),
                            Note: feature.properties.Note,
                            Type: feature.properties.Type,
                            Latitute: feature.geometry.coordinates[1],
                            Longitude: feature.geometry.coordinates[0],


                        })
                    )
                    setOptions(lsProp)
                }
                setGeojson(geojson);
            }
        });
    }, [])
    return (
        <StyledAppBar position="static" sx={sx}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                //sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Korean Amateur Radio UV Repeater Map
                </Typography>
                {false && <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <Autocomplete
                        autoHighlight
                        getOptionLabel={(option: IProperties) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            else if (typeof option.Name === 'string') {
                                return option.Name
                            } else {
                                return "?"
                            }
                        }}
                        freeSolo
                        groupBy={(option) => option.Region}
                        options={options}
                        renderOption={(props, option) => <li {...props}>
                            <Typography variant='body1'>{option.Name}</Typography>
                            <Typography variant='caption'>({option.Rx})</Typography>
                        </li>}
                        renderInput={(params) => (
                            <StyledInputBase
                                {...params}
                                label="검색"
                                InputProps={{
                                    ...params.InputProps,
                                    //xtype: 'search',
                                }}
                                color="primary"
                                size="small"


                            />
                        )}
                    />

                </Search>}
            </Toolbar>
        </StyledAppBar>
    );
}
