'use client';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { Alert, Box, Container, Typography } from "@mui/material";
import { Message, fileToString, stringToMessagesArray } from './utils';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { UploadButton } from '@/components/upload-button';
import { useCallback, useState } from 'react';
import { Results } from '@/components/results';


export default function Home() {
  const [messages, setMessages] = useState<Message[]>();

  const onFileSelected = useCallback(async (f: File) => {
    const content = await fileToString(f);
    const messages = stringToMessagesArray(content);
    setMessages(messages);
  }, []);

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 3
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: 'medium' }} gutterBottom>The 💩 game</Typography>
          {!messages ? (<>
            <Typography>
              Ok, this is gonne be weird. The game works as follow:
            </Typography>
            <ul>
              <li>Create a whatsapp group with your friends</li>
              <li>Every time one of you go to 💩 you send a message with just &quot;💩&quot;</li>
              <li>After some time, export the conversation and import it here to get the winner (if you can call that to win), stats, graphs, etc.</li>
            </ul>
            <Alert severity="info">All the calculations are done in your browser, nothing is sent. Your conversation will stay private and nobody will have access to it.</Alert>
            <Box textAlign='center' paddingTop={3}>
              <UploadButton onFileSelected={onFileSelected} />
            </Box>
          </>) : (<Results rawMessages={messages} />)}
        </Box>
      </Container>
      <SnackbarProvider action={snackbarKey => (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
          <CloseIcon />
        </ IconButton>
      )} />
    </>
  );
}
