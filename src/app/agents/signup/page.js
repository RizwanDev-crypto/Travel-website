// src/app/agents/signup/page.js
'use client';

import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import SignupForm from '@/app/signUp/page';

export default function AgentsSignupPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            backgroundColor: '#f8f9fa',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2'
            }}
          >
            Agent Signup
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Register your travel agency to get started with exclusive benefits
          </Typography>
        </Paper>

        <SignupForm userType="agents" />
      </Box>
    </Container>
  );
}