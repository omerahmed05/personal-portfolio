import React, { useState } from 'react';
import { Box, Typography, Container, Paper, IconButton, Button, Drawer, useTheme, useMediaQuery } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import AboutIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ContactIcon from '@mui/icons-material/ContactMail';
import portrait from './assets/portrait.jpg';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import './styles.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const getSectionTitle = (section) => {
    switch (section) {
      case 'experience':
        return 'Experience';
      case 'projects':
        return 'Projects';
      case 'contact':
        return 'Contact';
      default:
        return 'About';
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  const navigationItems = [
    { id: 'about', label: 'About', icon: <AboutIcon /> },
    { id: 'experience', label: 'Experience', icon: <WorkIcon /> },
    { id: 'projects', label: 'Projects', icon: <CodeIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactIcon /> },
  ];

  const sidebarContent = (
    <Box sx={{ 
      width: 320, 
      height: '100vh', 
      bgcolor: 'background.paper',
      borderRight: 1,
      borderColor: 'divider',
      display: 'flex',
      flexDirection: 'column',
      p: 0,
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Profile Section */}
      <Box sx={{ 
        textAlign: 'center', 
        p: 4, 
        pb: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.1)',
          zIndex: 1
        }} />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.3)',
            margin: '0 auto 20px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <img 
              src={portrait} 
              alt="Omer Ahmed" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }} 
            />
          </Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            mb: 1.5,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            Omer Ahmed
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 1.5,
            opacity: 0.9,
            fontWeight: 500,
            fontSize: '1.1rem'
          }}>
            Software Engineer
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 2.5,
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            fontSize: '1.1rem'
          }}>
            📍 Chantilly, VA
          </Typography>
          
          {/* Social Links */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1.5, 
            mb: 1 
          }}>
            <IconButton 
              href="https://linkedin.com/in/omah" 
              target="_blank" 
              rel="noopener"
              size="large"
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: 48,
                height: 48,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease'
                }
              }}
            >
              <LinkedInIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <IconButton 
              href="https://github.com/omerahmed05" 
              target="_blank" 
              rel="noopener"
              size="large"
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: 48,
                height: 48,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease'
                }
              }}
            >
              <GitHubIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <IconButton 
              href="https://drive.google.com/file/d/19C37Ri9FHsCTsEhyFSpBNBqlHdcu0xZw/view?usp=sharing" 
              target="_blank" 
              rel="noopener"
              size="large"
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: 48,
                height: 48,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease'
                }
              }}
            >
              <DescriptionIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            fullWidth
            variant={currentSection === item.id ? "contained" : "text"}
            startIcon={item.icon}
            onClick={() => {
              setCurrentSection(item.id);
              if (isMobile) {
                setDrawerOpen(false);
              }
            }}
            sx={{ 
              justifyContent: 'flex-start', 
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: currentSection === item.id ? 600 : 500,
              borderRadius: 2,
              py: 2,
              px: 3,
              mb: 1,
              transition: 'all 0.2s ease',
              '& .MuiButton-startIcon': {
                marginRight: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: 28
                }
              },
              ...(currentSection === item.id ? {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)'
                }
              } : {
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateX(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              })
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Sidebar */}
      {!isMobile && sidebarContent}
      
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer 
          anchor="left" 
          open={drawerOpen} 
          onClose={toggleDrawer(false)}
          sx={{ '& .MuiDrawer-paper': { width: 320 } }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Mobile Header */}
        {isMobile && (
          <Box sx={{ 
            p: 3, 
            borderBottom: 1, 
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0
          }}>
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              onClick={toggleDrawer(true)}
              size="large"
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {getSectionTitle(currentSection)}
            </Typography>
          </Box>
        )}

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
          {renderSection()}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
