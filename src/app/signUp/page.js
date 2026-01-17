"use client";
// components/StyledSignupForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Divider,
  styled,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.3)',
  },
}));

const countries = [
  'Select Country',
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
];

const StyledSignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    isHuman: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#1a237e',
            mb: 1
          }}
        >
          Signup
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: 'text.secondary',
            mb: 4
          }}
        >
          Create your account to get started
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <StyledTextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              variant="outlined"
            />
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Country</InputLabel>
            <Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              label="Select Country"
              required
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <StyledTextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            variant="outlined"
            type="tel"
            sx={{ mb: 2 }}
          />

          <StyledTextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            variant="outlined"
            type="email"
            sx={{ mb: 2 }}
          />

          <StyledTextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
            variant="outlined"
            type="password"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isHuman"
                checked={formData.isHuman}
                onChange={handleChange}
                color="primary"
              />
            }
            label="I am human"
            sx={{ mb: 3 }}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </StyledButton>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or continue with
            </Typography>
          </Divider>

          <StyledButton
            fullWidth
            variant="outlined"
            sx={{
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'grey.600',
                backgroundColor: 'grey.50',
              },
            }}
          >
            Koshiba
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default StyledSignupForm;