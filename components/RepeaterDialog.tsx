import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { RepeaterInfoData } from "./DuplicatedFeaturesContextMenu";

export default function RepeaterDialog({ open, repeaterInfo, onClose }: { open: boolean, onClose: () => void, repeaterInfo?: RepeaterInfoData }) {

    const shift = React.useMemo(() => {
        return repeaterInfo?.Tx && repeaterInfo?.Rx ? (repeaterInfo?.Tx - repeaterInfo?.Rx) : 0
    }, [repeaterInfo]);


    return <Dialog open={open} onClose={onClose} >
        <DialogTitle>{repeaterInfo?.Name} {repeaterInfo?.Callsign}</DialogTitle>
        <DialogContent>
            <TableContainer component={Paper} elevation={1}>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Tx</TableCell>
                            <TableCell>{repeaterInfo?.Tx} Mhz</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Rx</TableCell>
                            <TableCell>{repeaterInfo?.Rx} Mhz</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Shift</TableCell>
                            <TableCell><Chip size="small" color="primary" label={(shift > 0 )? `+${shift.toFixed(2)}` : shift.toFixed(2)} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">톤</TableCell>
                            <TableCell>{repeaterInfo?.Tone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">유형</TableCell>
                            <TableCell><Chip size="small" color="secondary" label={repeaterInfo?.Type} /></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row">주소</TableCell>
                            <TableCell>{repeaterInfo?.Address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">비고</TableCell>
                            <TableCell>{repeaterInfo?.Note}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                닫기
            </Button>
        </DialogActions>
    </Dialog>
} 