import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
    <Box sx={{ 
      height: '100%', 
      overflow: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      p: 4,
      maxWidth: 700,
      mx: 'auto',
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Contact Me
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
          I'd love to hear from you! Send me a message below.
        </Typography>
      </Box>

      {/* Contact Form */}
      <Paper elevation={2} sx={{ p: 5, borderRadius: 3 }}>
        <form 
          name="contact" 
          method="POST" 
          onSubmit={handleSubmit} 
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
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
            required
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1.1rem'
              },
              '& .MuiOutlinedInput-input': {
                fontSize: '1.1rem',
                padding: '16px 14px'
              }
            }}
          />
          
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            name="message"
            multiline
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message here..."
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1.1rem'
              },
              '& .MuiOutlinedInput-input': {
                fontSize: '1.1rem',
                padding: '16px 14px'
              }
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Box sx={{ transform: 'scale(1.1)' }}>
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                onVerify={(token) => setHcaptchaToken(token)}
              />
            </Box>
            
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={!hcaptchaToken}
              sx={{ 
                mt: 2, 
                px: 6, 
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              Send Message
            </Button>
          </Box>

          {status && (
            <Typography 
              variant="body1" 
              color="error" 
              sx={{ textAlign: 'center', mt: 3, fontSize: '1.1rem' }}
            >
              {status}
            </Typography>
          )}
        </form>
      </Paper>

      {/* Success Dialog */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="thank-you-dialog"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2
          }
        }}
      >
        <DialogTitle id="thank-you-dialog" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          Thank You!
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '1.1rem', py: 1 }}>
            Your message has been sent successfully. I'll get back to you soon!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClosePopup} 
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contact;
