import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import emailjs from 'emailjs-com';
import '../styles.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('Message sent successfully!');
      }, (error) => {
        console.log('FAILED...', error);
        setStatus('Failed to send message. Please try again.');
      });
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
      <form onSubmit={handleSubmit} className="contact-form">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" className="submit-button">Send</Button>
        {status && <Typography variant="body1" color="textSecondary">{status}</Typography>}
      </form>
    </Container>
  );
};

export default Contact;
