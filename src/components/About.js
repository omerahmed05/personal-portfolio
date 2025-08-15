import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        mb: 4
      }}>
        About Me
      </Typography>
      
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h6" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, mb: 3 }}>
          I'm a senior at Virginia Tech pursuing a degree in Computer Science. I'm currently expanding my skills in C++ and high-performance computing (HPC), while also bringing hands-on experience with full-stack development, including Spring Boot and Angular, gained through previous internship projects. I'm passionate about building efficient, scalable solutions and exploring innovative technologies.
        </Typography>
        <Typography variant="h6" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
          My guiding philosophy is to give my absolute best in every endeavor. This mindset informs everything I do, from academics and entrepreneurial pursuits to athletics and personal projects. I believe that by constantly challenging myself and pushing my limits, I not only grow into the best version of myself but also inspire others and shape the world around me.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;

