import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Notes from './components/Notes'; // Import Notes component
import './styles.css';

function App() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const getPageTitle = (path) => {
    switch (path) {
      case '/experience':
        return 'Experience';
      case '/projects':
        return 'Projects';
      case '/contact':
        return 'Contact';
      case '/notes':
        return 'Notes';
      default:
        return 'About';
    }
  };

  const drawerItems = (
    <div>
      <List>
        <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/experience" onClick={toggleDrawer(false)}>
          <ListItemText primary="Experience" />
        </ListItem>
        <ListItem button component={Link} to="/projects" onClick={toggleDrawer(false)}>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} to="/contact" onClick={toggleDrawer(false)}>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component={Link} to="/notes" onClick={toggleDrawer(false)}>
          <ListItemText primary="Notes" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="App">
      <AppBar position="static" className="MuiAppBar-root">
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {getPageTitle(location.pathname)}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {getPageTitle(location.pathname)}
            </Typography>
            <Button color="inherit" component={Link} to="/">About</Button>
            <Button color="inherit" component={Link} to="/experience">Experience</Button>
            <Button color="inherit" component={Link} to="/projects">Projects</Button>
            <Button color="inherit" component={Link} to="/notes">Notes</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} className="MuiDrawer-root">
        {drawerItems}
      </Drawer>
      <main className={`App-content ${drawerOpen ? 'App-content-drawer-open' : ''}`}>
        <Container component="main">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/notes" element={<Notes />} /> {/* Add Notes route */}
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
