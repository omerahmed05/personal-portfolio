import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import '../styles.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Append the hCaptcha token to the form data
    formData.append('h-captcha-response', hcaptchaToken);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setName('');
          setMessage('');
          setHcaptchaToken(''); 
          setOpenPopup(true); 
        } else {
          setStatus('Failed to send message. Please try again.');
        }
      })
      .catch((error) => setStatus('Failed to send message. Please try again.'));
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Container className="contact-container">
      <Box mb={4} display="flex" justifyContent="center">
        <Card className="intro-card">
          <CardContent>
            <Typography variant="h6" component="div">
              I would love to hear from you! Please use the form below to contact me or provide any feedback you have regarding this website. Your thoughts and inquiries are greatly appreciated.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <form 
        name="contact" 
        method="POST" 
        onSubmit={handleSubmit} 
        className="contact-form"
      >
        <input type="hidden" name="access_key" value="0ef72a93-e8ea-473f-bafb-7c396b379992" />
        <input type="hidden" name="subject" value="New Contact Form Submission" />

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          name="message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <HCaptcha
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          onVerify={(token) => setHcaptchaToken(token)}
        />
        <Button type="submit" variant="contained" color="primary" className="submit-button">Send</Button>
        {status && <Typography variant="body1" color="textSecondary">{status}</Typography>}
      </form>

      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="thank-you-dialog"
      >
        <DialogTitle id="thank-you-dialog">Thank You!</DialogTitle>
        <DialogContent>
          <Typography>
            Your message has been sent successfully. Thank you for reaching out!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contact;
