import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import { RepeaterInfoData } from "./DuplicatedFeaturesContextMenu";

export default function RepeaterDialog({ open, repeaterInfo, onClose }: { open: boolean, onClose: () => void, repeaterInfo?: RepeaterInfoData }) {
    const theme = useTheme();
    const shift = React.useMemo(() => {
        return repeaterInfo?.Tx && repeaterInfo?.Rx ? (repeaterInfo?.Tx - repeaterInfo?.Rx) : 0
    }, [repeaterInfo]);


    return <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: theme.palette.primary.main }}>

            <Chip size="small" color="secondary" label={repeaterInfo?.Type} />
            <Typography variant="h5" sx={{ display: 'inline-flex', mx: 2, color: theme.palette.getContrastText(theme.palette.primary.main) }}>{repeaterInfo?.Name} {repeaterInfo?.Callsign}</Typography>
        </DialogTitle>
        <DialogContent dividers>

            <Table>
                <TableBody>


                    <TableRow>
                        <TableCell component="th" scope="row">수신(Rx)</TableCell>
                        <TableCell>{repeaterInfo?.Rx} Mhz</TableCell>
                        <TableCell component="th" scope="row">송신(Tx)</TableCell>
                        <TableCell>{repeaterInfo?.Tx} Mhz</TableCell>


                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Shift</TableCell>
                        <TableCell><Chip size="small" color="primary" label={(shift > 0) ? `+${shift.toFixed(2)}` : shift.toFixed(2)} /></TableCell>

                        <TableCell component="th" scope="row">톤</TableCell>
                        <TableCell>{repeaterInfo?.Tone}</TableCell>
                    </TableRow>


                    <TableRow>
                        <TableCell component="th" scope="row">주소</TableCell>
                        <TableCell colSpan={3}>{repeaterInfo?.Address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">비고</TableCell>
                        <TableCell colSpan={3}>{repeaterInfo?.Note}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="contained" color="secondary">
                닫기
            </Button>
        </DialogActions>
    </Dialog>
} 