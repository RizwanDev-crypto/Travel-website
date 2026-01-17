'use client';
import Header from '@/component/Header';
import AppStore from '@/component/FeaturedSection/AppStore';
import Footer from '@/component/Footer';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,

} from '@mui/material';

import { useRouter } from 'next/navigation';

export default function AgentsLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    
  
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    router.push('/dashboard');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
    
      <Container maxWidth="xs">
      <Box 
        sx={{ 
         
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
        

        }}
      >
        {/* YEH EK HI BOX HAI - SAB KUCH ISKE ANDAR */}
        <Paper 
          elevation={6}
          sx={{ 
            p: 2,
            width: '100%',
            borderRadius: 3,
            boxShadow: ' 1px 1px 5px 2px rgba(0,0,0,0.1)',
          
          }}
        >
          {/* HEADER - Welcome text */}
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                color: '#1F2937',
                mb: 1
              }}
            >
              Login
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Welcome back! Please sign in to your account
            </Typography>
          </Box>

          {/* LOGIN FORM - Yahan se aapka form shuru */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Email Field */}
            <Typography sx={{ fontSize: '0.8rem',mb: 1, fontWeight: 700 , color:"#1F2937"}}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 3 ,   fontSize: '0.4rem'}}
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                  '& input::placeholder': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            />

            {/* Password Field */}
            <Typography sx={{ fontSize: '0.8rem',mb: 1, fontWeight: 700 , color:"#1F2937" }}>
              Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{

                sx: {
                  borderRadius: "12px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                  },
                  '& input::placeholder': {
                    fontSize: '0.8rem',
                  },
                },
              }}
            />

            {/* Remember Me & Reset Password */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: '#1976d2',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Remember Me
                  </Typography>
                }
              />
              <Link 
                href="/forgot-password" 
                variant="body2" 
                sx={{ 
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Reset Password
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 1,
                py: 1,
                borderRadius: 1,
                backgroundColor: '#2563eb',
                borderRadius: 4,
                textTransform: 'none',
                 
                fontSize: '0.8rem',
                fontWeight:600,
                '&:hover': {
                  backgroundColor: '#2563eb',
                },
              }}
            >
              Login
            </Button>

  <Button
              type="submit"
              fullWidth
           
              sx={{
                mb: 1,
                py: 1,
               color:"#2563eb",
               
               border:"1px solid #2563eb",
                textTransform: 'none',
                fontSize: '0.8rem',
               fontWeight:600,
                borderRadius: 4,
                '&:hover': {
                  backgroundColor: '#1565c0',
                  color:"white"
                },
              }}
            >
            Signup
            </Button>
          
      
          </Box>
          {/* FORM ENDS HERE */}
        </Paper>
      </Box>
    </Container>

    <AppStore />
  
    </>
  );
}