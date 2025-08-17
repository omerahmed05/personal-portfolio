import React from 'react';
import { Box, Card, CardContent, Typography, Container, Link as MuiLink } from '@mui/material';
import './Projects.css';
import codeWorldLogo from '../assets/codeWorldLogo.png';  
import vtHaxLogo from '../assets/vtHaxLogo.png'; 
import personalPortfolioLogo from "../assets/personalPortfolioLogo.png";
import optionPricingLogo from "../assets/optionPricingLogo.jpg";
import autotrielogo from  "../assets/autotrielogo.png";

const projects = [
  {
    title: 'AutoTrie',
    logo: autotrielogo,
    logoLink: 'https://github.com/omerahmed05/AutoTrie',
    description: (
      <>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
        I built AutoTrie as a C++ program that provides autocomplete suggestions using a Trie (prefix tree) data structure. The idea was to load a large word list and make prefix lookups fast and memory efficient.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
        At startup, the program reads a <code>dictionary.txt</code> file and inserts each word into the Trie. Each node contains pointers to its children, and words are reconstructed by traversing the path from the root. When a user enters a prefix, the program locates the node that matches the prefix and then runs a depth-first search to collect all possible completions.
      </Typography>
      </>
    ),
    links: [
      { label: 'GitHub', href: 'https://github.com/omerahmed05/AutoTrie' },
    ]
  },
  {
    title: 'Parallelized Option Pricing Simulator',
    logo: optionPricingLogo,
    logoLink: 'https://github.com/omerahmed05/Parallelized-Option-Pricing-Simulator',
    description: (
      <>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I built this C++ application to simulate financial option pricing using Monte Carlo methods. It's a tool that helps predict how much financial options are worth by running thousands of simulations of possible market scenarios.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          The core idea is straightforward. Instead of trying to calculate exact option values with complex formulas, the program simulates thousands of different ways the market could move and then averages out the results. It uses the Black-Scholes model as the foundation, which one of the standard way financial professionals think about option pricing.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          However, running thousands of simulations can take forever, so I used OpenMP to parallelize the computations. This means the program can use multiple CPU cores simultaneously, making it much faster for large-scale simulations.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          The program handles both call and put options, and you can input things like current stock price, strike price, time until expiration, and volatility. I also added some Python integration for visualizing the results, which makes it easier to understand what's happening with the simulations.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I tested the accuracy by comparing my simulation results against the standard Black-Scholes formulas, and I tested the performance of the parallelization by comparing it to the single threaded version. The multi-threading implementation gave significant speed improvements (up to 7x). Lastly, I containerized the whole application to make it easier to run.
        </Typography>
      </>
    ),
    links: [
      { label: 'GitHub', href: 'https://github.com/omerahmed05/Parallelized-Option-Pricing-Simulator' },
    ]
  },
  {
    title: 'Personal Portfolio Website',
    logo: personalPortfolioLogo,
    logoLink: 'https://www.omerahmed.net', 
    description: (
      <>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          This is the website you're looking at right now! I built it to showcase my work and experience and to also learn about web development.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I used React for the frontend and Material-UI components for a lot of the visuals, such as the panels and icons.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          For the contact form, I simply used Web3Forms API which handles all the form submissions and sends them directly to my email while filtering out spam. Since I deployed this app with Netlify, GitHub Actions is automatically set up for continuous deployment, so whenever I update the code, the latest branch automatically gets deployed to Netlify. As a result, the site is always up-to-date with the latest changes.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          This project helped me understand how React compares to Angular (which I worked with during my internships). After trying to build this website with just JavaScript/HTML/CSS, I developed a deep gratitude for component based architecture.
        </Typography>
      </>
    ),
    links: [
      { label: 'GitHub', href: 'https://github.com/omerahmed05/personal-portfolio' },
    ]
  },  
  {
    title: 'AutoPrint: Automatic Print Statement Insertion Tool',
    logo: codeWorldLogo,
    logoLink: 'https://code-world-no-blanket.github.io/',  
    description: (
      <>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          This was my research project during an internship at Code World, No Blanket Lab. I worked with PhD student Minhyuk Ko and advisor Dr. Chris Brown to help build a tool that makes debugging Java code much easier by automatically adding and removing print statements.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          The main problem we were solving was that the old method used regular expressions (Regex) to find code that needed debugging, which was both tedious and error-prone. I spent time researching better solutions and discovered JavaParser, which is a much more robust framework for working with Java code.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          It works by parsing Java code into an Abstract Syntax Tree (AST) which is essentially a tree structure that represents the code's logical structure rather than just text. Instead of trying to match patterns in raw text with regex, we could now navigate through the AST to find specific code elements like method calls, variable declarations, or control flow statements. This made the whole debugging process much more efficient and reduced errors significantly. 
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I did a lot of testing to make sure JavaParser could handle complex Java code structures and accurately identify where bugs might be located. In addition to expediting the development process, the switch from regex to JavaParser made the tool much more user-friendly and collaborative.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          This project taught me a ton about Java development and software engineering best practices. More importantly, it showed me how choosing the right tools can dramatically improve both productivity and code quality.
        </Typography>
      </>
    ),
    links: [
      { label: 'View Paper', href: 'https://drive.google.com/file/d/1Y5YX_jI149vjMSPKd0X6e_wP9vH7lWfu/view?usp=sharing' },
      { label: 'GitHub', href: 'https://github.com/minhyukko/AutoPrint' }
    ]
  },
  {
    title: 'ATS Resume Checker Bot',
    logo: vtHaxLogo,
    logoLink: 'https://vthacks.com/',  
    description: (
      <>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I built this Discord bot during the Virginia Tech 2023 Hackathon to help people get better feedback on their resumes. The idea came from noticing that most resume review tools just tell you to change your template, but don't actually analyze the content.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          The biggest challenge was the time constraint because we only had two days to build everything, and I was juggling school assignments at the same time. I focused on the backend, specifically building the resume parser that could take PDF resumes and convert them into text that the bot could analyze using pyPDF.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          I used Python's Natural Language Processing Toolkit (NLTK) to parse the text and extract skills from the resumes. The bot then scores each resume based on three categories: technical skills (like programming languages and tools), social skills (communication, teamwork), and academic capabilities (GPA, research abilities, time management).
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          The scoring system works by cross-referencing the extracted text against a comprehensive JSON file containing lists of skills for each category. For example, words like "time-management" and "research" would boost the academic capabilities score.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          This project was a great test of my ability to learn new technologies quickly and work under pressure. It taught me a lot about rapid prototyping and how to build something useful in a very short timeframe. 
        </Typography>
      </>
    ),
    links: [
      { label: 'GitHub', href: 'https://github.com/Nexoogha/ResumeChecker' }
    ]
  }
];

const Projects = () => {
  return (
    <Container className="projects-container" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        My Projects
      </Typography>
      {projects.map((project, index) => (
        <Card key={index} className="project-card" sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                {project.title}
              </Typography>
              <MuiLink href={project.logoLink} target="_blank" rel="noopener">
                <img src={project.logo} alt={`${project.title} logo`} style={{ width: '60px', height: 'auto' }} />
              </MuiLink>
            </Box>
            <Box className="project-description" sx={{ mb: 3 }}>{project.description}</Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {project.links && project.links.map((link, idx) => (
                <MuiLink 
                  key={idx} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener" 
                  sx={{ 
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Projects;
