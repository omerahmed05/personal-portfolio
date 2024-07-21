import React from 'react';
import { Box, Card, CardContent, Typography, Container, Link as MuiLink } from '@mui/material';
import './Projects.css';
import codeWorldLogo from '../assets/codeWorldLogo.png';  // Ensure the path is correct
import vtHaxLogo from '../assets/vtHaxLogo.png';  // Ensure the path is correct

const projects = [
  {
    title: 'AutoPrint: Automatic Print Statement Insertion Tool',
    logo: codeWorldLogo,
    logoLink: 'https://codeworld.example.com',  // Replace with the actual URL
    description: (
      <>
        <Typography variant="body2" paragraph>
          AutoPrint was developed as part of my research internship at Code World, No Blanket Lab, where I assisted PhD student Minhyuk Ko and advisor Dr. Chris Brown with this project. Our goal was to enhance the efficiency of debugging in Java programming by automating the insertion and removal of print statements.
        </Typography>
        <Typography variant="body2" paragraph>
          We faced a significant challenge with the previous method of using regular expressions (Regex) to locate code segments for debugging, which was tedious and error-prone. To overcome this, I researched frameworks that could simplify this process, and that's how I stumbled upon <strong>JavaParser</strong>, a robust framework for parsing Java code. JavaParser not only streamlined the process of identifying and manipulating code segments but also improved collaboration among team members by providing a structured and reliable approach to debugging.
        </Typography>
        <Typography variant="body2" paragraph>
          During the implementation phase, I conducted extensive testing to validate JavaParser's capabilities, including:
          <ul>
            <li>Evaluating its accuracy in identifying potential bug locations</li>
            <li>Assessing its performance in handling complex Java constructs</li>
          </ul>
          The transition from Regex to JavaParser marked a significant improvement in the tool's usability and effectiveness, making debugging tasks more efficient and collaborative-friendly.
        </Typography>
        <Typography variant="body2" paragraph>
          This project not only advanced my skills in Java development and software engineering methodologies but also highlighted the importance of adopting appropriate tools to enhance productivity and teamwork in software projects.
        </Typography>
      </>
    ),
    links: [
      { label: 'View Paper', href: 'link-to-your-PDF' },
      { label: 'GitHub', href: 'link-to-your-GitHub' }
    ]
  },
  {
    title: 'ATS Resume Checker Bot',
    logo: vtHaxLogo,
    logoLink: 'https://vthax.example.com',  // Replace with the actual URL
    description: (
      <>
        <Typography variant="body2" paragraph>
          For the Virginia Tech 2023 Hackathon, I undertook the development of a Discord bot designed to analyze candidates' resumes and provide comprehensive feedback. The project stemmed from a recognized lack of effective resume review resources, with many reviews merely guiding job-seekers to switch templates. My primary focus was on the backend, where I tackled the implementation of the resume parser.
        </Typography>
        <Typography variant="body2" paragraph>
          One of the significant challenges was the tight deadline of just two days, amidst ongoing school assignments. Despite these constraints, I successfully engineered the bot to:
          <ul>
            <li>Accept PDF resumes</li>
            <li>Convert them into text files</li>
            <li>Parse them using a Python Natural Language Processing (NLP) API called <strong>Natural Language Processing Toolkit (NLTK)</strong></li>
          </ul>
          This process allowed the bot to extract and evaluate key skills.
        </Typography>
        <Typography variant="body2" paragraph>
          After parsing the text, the bot extracts skills mentioned in the resume and scores them based on three criteria:
          <ul>
            <li><strong>Technical Skills:</strong> Proficiency in programming languages, tools, and technologies</li>
            <li><strong>Social Skills:</strong> Interpersonal skills, communication, and teamwork</li>
            <li><strong>Academic Capabilities:</strong> GPA and skills that demonstrate academic prowess, such as time-management and research abilities</li>
          </ul>
          In addition, the extracted text was cross-referenced with a JSON file that contains an extensive list of skills for each criteria. For example, text that would increase the score of the Academic Capabilities category would be words like time-management and research.
        </Typography>
        <Typography variant="body2" paragraph>
          This project not only demonstrated my technical skills in backend development and ability to use ML APIs but also showcased my ability to pick up new skills quickly and manage time effectively under pressure. It was a valuable learning experience in rapid prototyping and iterative development, resulting in a functional tool that addressed a genuine need in the job application process.
        </Typography>
      </>
    ),
    links: [
      { label: 'GitHub', href: 'link-to-your-GitHub' }
    ]
  }
];

const Projects = () => {
  return (
    <Container className="projects-container">
      {projects.map((project, index) => (
        <Card key={index} className="project-card">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" component="div">{project.title}</Typography>
              <MuiLink href={project.logoLink} target="_blank" rel="noopener">
                <img src={project.logo} alt={`${project.title} logo`} style={{ width: '50px', height: 'auto' }} />
              </MuiLink>
            </Box>
            <Box className="project-description">{project.description}</Box>
            {project.links && project.links.map((link, idx) => (
              <MuiLink key={idx} href={link.href} target="_blank" rel="noopener" style={{ marginRight: '1rem' }}>
                {link.label}
              </MuiLink>
            ))}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Projects;
