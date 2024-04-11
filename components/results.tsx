import { useMemo } from 'react';
import { analyzeMessages, AVERAGE_POOP_WEIGHT_KILOS, type Message } from '../app/utils';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { QuestionMark } from './question-mark';

export function Results({rawMessages}: {rawMessages: Message[]}) {
    const analyzed = useMemo(() => analyzeMessages(rawMessages), [rawMessages]);
    console.log('analyzed', analyzed)

    return (
        <>
        <Box>
            <p><strong>Total count of 💩: </strong> {analyzed.totalCount}</p>
            <p><strong title="lol">Total weight of 💩: </strong> {analyzed.totalKilos} KG
                <QuestionMark message={`Using ${AVERAGE_POOP_WEIGHT_KILOS}KG as 💩 average`}/>
            </p>
            <p><strong>Avg. 💩 per day: </strong> {analyzed.countPerDay}</p>
        </Box>
        
        <Typography variant='h4'>Ranking</Typography>
        <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: 50}}>#</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell align="right">Count of 💩</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{maxHeight: 10}}>
                {analyzed.byAuthor.map((item, i) => (
                    <TableRow
                        key={item.author}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {i + 1}
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell align="right">{item.messages.length}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        
        </>
    )
}
