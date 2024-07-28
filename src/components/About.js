import React from 'react';
import portrait from '../assets/portrait.jpg';
import { Box, Typography, Link as MuiLink, Container, Paper } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <Container className="about-container">
      <Paper elevation={3} className="about-box">
        <Box className="about-content">
          <img src={portrait} alt="Omer Ahmed" className="profile-photo" />
          <Box className="text-content">
            <Typography variant="h4">Omer Ahmed</Typography>
            <Typography variant="subtitle1">Computer Science Student @ Virginia Tech | Software Engineer Intern @ Xylem Inc.</Typography>
            <Typography variant="body2" className="location">📍 Chantilly, VA</Typography>
            <Box className="nav-links">
              <MuiLink href="https://x.com/OmerAhmedib" target="_blank" rel="noopener" mr={1}>X</MuiLink>
              <MuiLink href="https://linkedin.com/in/omah" target="_blank" rel="noopener" mr={1}>LinkedIn</MuiLink>
              <MuiLink href="https://github.com/omerahmed05" target="_blank" rel="noopener" mr={1}>GitHub</MuiLink>
              <MuiLink href="https://drive.google.com/file/d/1WuWRYXChH67tTzXLIrI1XIebCSBIZopy/view?usp=sharing" target="_blank" rel="noopener" mr={1}>Resume</MuiLink>
              <MuiLink href="https://www.kaggle.com/remodemha" target="_blank" rel="noopener" mr={1}>Kaggle</MuiLink>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3} className="description-box">
        <Box className="description">
          <Typography variant="body1" paragraph>
            I'm currently a full-time undergraduate student at Virginia Tech, pursuing a degree in Computer Science. Alongside my studies, I'm gaining valuable experience as a Software Engineer Intern at Xylem Inc. My passion lies in the broader field of artificial intelligence, particularly in exploring how advanced algorithms can be inspired by and integrated with insights from neuroscience. This drive fuels both my academic pursuits and personal projects, where I leverage technology to tackle complex challenges.
          </Typography>
          <Typography variant="body1" paragraph>
            In my free time, I like to indulge in activities that stimulate my mind and body, such as playing chess, soccer, and engaging in continuous learning and research. For the upcoming year, I'm eager to embark on an independent study focusing on the research question: "How can reinforcement learning algorithms be adapted to incorporate strategies used by the human brain for decision-making and learning from experience?" I'm always looking for opportunities, so feel free to reach out!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;

