"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

// Helper function for FlagCDN API
const getFlagUrl = (countryCode, size = 40) =>
  `https://flagcdn.com/w${size}/${countryCode.toLowerCase()}.png`;

// Languages using FlagCDN API
const languages = [
  { code: "US", label: "English", flag: getFlagUrl("us", 40) },
  { code: "AE", label: "Arabic", flag: getFlagUrl("ae", 40) },
  { code: "TR", label: "Turkish", flag: getFlagUrl("tr", 40) },
  { code: "RU", label: "Russian", flag: getFlagUrl("ru", 40) },
  { code: "FR", label: "French", flag: getFlagUrl("fr", 40) },
  { code: "DE", label: "German", flag: getFlagUrl("de", 40) },
];

const navLinks = [
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Tours", href: "/tours" },
  { label: "Cars", href: "/cars" },
  { label: "Visa", href: "/visa" },
  { label: "Blog", href: "/blog" },
];

// Currencies using FlagCDN API
const currencies = [
  {
    code: "USD",
    country: " - United States ",
    flag: getFlagUrl("us", 40),
    symbol: "$",
  },
  {
    code: "GBP",
    country: " - United Kingdom",
    flag: getFlagUrl("gb", 40),
    symbol: "£",
  },
  {
    code: "SAR",
    country: " - Saudi Arabia",
    flag: getFlagUrl("sa", 40),
    symbol: "ر.س",
  },
  {
    code: "EUR",
    country: " - Germany",
    flag: getFlagUrl("de", 40),
    symbol: "€",
  },
  {
    code: "PHP",
    country: " - Philippines",
    flag: getFlagUrl("ph", 40),
    symbol: "₱",
  },
];

const agentLinks = [
  { name: "Login", path: "/agents/login" },
  { name: "Signup", path: "/agents/signup" },
];

const customerLinks = [
  { name: "Login", path: "/customer/login" },
  { name: "Signup", path: "/customer/signup" },
];

// Language Dropdown
const LanguageDropdown = ({
  languages,
  open,
  anchorEl,
  onClose,
  onOpen,
  selected,
  onSelect,
}) => (
  <>
    <Button
      variant="outlined"
      size="small"
      onClick={onOpen}
      sx={{
        borderRadius: 20,
        borderColor: "grey.300",
        color: "#212529",
        fontWeight: 300,
        textTransform: "none",
        fontSize: "11px",
        fontFamily: "Inter, sans-serif",
        "&:hover": { borderColor: "#28a8e2", backgroundColor: "#EEF4FB" },
        minWidth: "auto",
      }}
    >
      <Box
        component="img"
        src={selected.flag}
        alt={selected.label}
        sx={{ width: 16, height: 12, mr: 1, borderRadius: 0.5 }}
      />
      {selected.label}
      <ExpandMoreIcon sx={{ fontSize: 12, ml: 0.5 }} />
    </Button>

    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 160,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 2,
          fontFamily: "Inter, sans-serif",
          p: 0.5,
        },
      }}
    >
      {languages.map((lang, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            onSelect(lang);
            onClose();
          }}
          sx={{
            py: 1,
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            borderBottom: i < languages.length - 1 ? "1px solid" : "none",
            borderColor: "grey.100",
            "&:hover": { backgroundColor: "#EEF4FB", borderRadius: "20px" },
          }}
        >
          <Box
            component="img"
            src={lang.flag}
            alt={lang.label}
            sx={{ width: 15, height: 12, mr: 1.5, borderRadius: 0.5 }}
          />
          {lang.label}
        </MenuItem>
      ))}
    </Menu>
  </>
);

// Currency Dropdown
const CurrencyDropdown = ({
  currencies,
  open,
  anchorEl,
  onClose,
  onOpen,
  selected,
  onSelect,
}) => (
  <>
    <Button
      variant="outlined"
      size="small"
      onClick={onOpen}
      sx={{
        borderRadius: 20,
        borderColor: "grey.300",
        color: "#212529",
        fontWeight: 300,
        textTransform: "none",
        fontSize: "11px",
        fontFamily: "Inter, sans-serif",
        "&:hover": { borderColor: "#28a8e2", backgroundColor: "#EEF4FB" },
        minWidth: "auto",
      }}
    >
      <Box
        component="img"
        src={selected.flag}
        alt={selected.country}
        sx={{
          width: 16,
          height: 12,
          mr: 1,
          borderRadius: 0.5,
          fontSize: "12px",
        }}
      />
      {selected.code}
      <ExpandMoreIcon sx={{ fontSize: 12, ml: 0.5 }} />
    </Button>

    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 180,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 4,
          fontFamily: "Inter, sans-serif",
          p: 0.5,
        },
      }}
    >
      {currencies.map((currency, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            onSelect(currency);
            onClose();
          }}
          sx={{
            py: 1,
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            borderBottom: i < currencies.length - 1 ? "1px solid" : "none",
            borderColor: "grey.100",
            "&:hover": { backgroundColor: "#EEF4FB", borderRadius: "20px" },
          }}
        >
          <Box
            component="img"
            src={currency.flag}
            alt={currency.country}
            sx={{ width: 15, height: 12, mr: 1.5, borderRadius: 0.5 }}
          />
          <Box>
            <Typography
              variant="body4"
              fontWeight={500}
              fontFamily="Inter, sans-serif"
            >
              {currency.code}
            </Typography>
            <Typography
              variant="caption"
              color="#212529"
              fontFamily="Inter, sans-serif"
            >
              {currency.country}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  </>
);

// User Dropdown
const UserDropdown = ({
  title,
  items,
  open,
  anchorEl,
  onClose,
  onOpen,
  icon,
  sx = {},
}) => (
  <>
    <Button
      variant="outlined"
      size="small"
      onClick={onOpen}
      startIcon={icon}
      sx={{
        borderRadius: 20,
        borderColor: "grey.300",
        color: "#212529",
        fontWeight: 300,
        textTransform: "none",
        fontSize: "11px",
        fontFamily: "Inter, sans-serif",
        "&:hover": { borderColor: "#28a8e2", backgroundColor: "white" },
        minWidth: "auto",
        ...sx,
      }}
    >
      {title}
      <ExpandMoreIcon sx={{ fontSize: 12, ml: 0.5 }} />
    </Button>

    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 140,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 2,
          fontFamily: "Inter, sans-serif",
          p: 0.5,
        },
      }}
    >
      {items.map((item, i) => (
        <MenuItem
          key={i}
          component={Link}
          href={item.path}
          onClick={onClose}
          sx={{
            py: 1,
            fontSize: "0.75rem",
            fontFamily: "Inter, sans-serif",
            borderBottom: i < items.length - 1 ? "1px solid" : "none",
            borderColor: "grey.100",
            "&:hover": { backgroundColor: "#EEF4FB", borderRadius: "20px" },
          }}
        >
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  </>
);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState(null);
  const [agentsAnchorEl, setAgentsAnchorEl] = useState(null);
  const [customerAnchorEl, setCustomerAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

   const pathname = usePathname();
  // Mobile submenu states
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const handleLangOpen = (e) => {
    setLangAnchorEl(e.currentTarget);
    setCurrencyAnchorEl(null);
    setAgentsAnchorEl(null);
    setCustomerAnchorEl(null);
  };
  const handleCurrencyOpen = (e) => {
    setCurrencyAnchorEl(e.currentTarget);
    setLangAnchorEl(null);
    setAgentsAnchorEl(null);
    setCustomerAnchorEl(null);
  };
  const handleAgentsOpen = (e) => {
    setAgentsAnchorEl(e.currentTarget);
    setLangAnchorEl(null);
    setCurrencyAnchorEl(null);
    setCustomerAnchorEl(null);
  };
  const handleCustomerOpen = (e) => {
    setCustomerAnchorEl(e.currentTarget);
    setLangAnchorEl(null);
    setCurrencyAnchorEl(null);
    setAgentsAnchorEl(null);
  };
  const handleClose = () => {
    setLangAnchorEl(null);
    setCurrencyAnchorEl(null);
    setAgentsAnchorEl(null);
    setCustomerAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          color: "#212529",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          borderBottom: "1px solid",
          borderColor: "grey.200",
          fontFamily: "Inter, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          maxWidth={false} // Yeh change kiya - fixed width remove kardi
          sx={{
            px: { xs: 2, md: 12 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0",
            padding: "0",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 56, md: 64 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "910px", 
            }}
          >
            {/* Logo aur Navigation */}
           <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Puri box ko center
  }}
>
  {/* Logo aur Navigation ka combined container */}
  <Box sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px", // Logo aur links ke darmiyan space
  }}>
    {/* Logo */}
    <Box 
      component={Link} 
      href="/" 
      sx={{ 
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src="/image/logo.png"
        alt="Logo"
        sx={{ 
          width: 100, 
          height: "auto",
        }}
      />
    </Box>

    {/* Navigation Links - Logo ke right side */}
    <Box
      sx={{
        display: { xs: "none",md:"flex", lg: "flex" },
      }}
    >
      {navLinks.map((link, i) => (
        <Button
          key={i}
          component={Link}
          href={link.href}
          disableRipple={false}
   sx={{
  color: "#212529",
  minWidth: "auto",
  margin: 0,
  textTransform: "none",
  borderBottom: pathname.startsWith(link.href) ? "3px solid #0b66f9" : "3px solid transparent", // ✅ active logic
  borderRadius: 0,
  fontFamily: "Inter, sans-serif",
  fontWeight: pathname.startsWith(link.href) ? 500 : 300, // bold for active
  fontSize: "11px",
   py: "21px",
  "&:hover": {
    color: "#0b66f9",
    borderBottom: "3px solid #0b66f9",
    py: "21px",
    backgroundColor: "transparent",
  },
}}

        >
          {link.label}
        </Button>
      ))}
    </Box>
  </Box>
</Box>
            
            {/* Right Navigation */}
            <Box
              sx={{
                display: { xs: "none",md:"flex", lg: "flex" },
                alignItems: "center",
                gap: "4px",
                flex: 1, // Yeh add kiya
                justifyContent: "flex-end", // Yeh add kiya
              }}
            >
              <LanguageDropdown
                languages={languages}
                open={Boolean(langAnchorEl)}
                anchorEl={langAnchorEl}
                onClose={handleClose}
                onOpen={handleLangOpen}
                selected={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
              <CurrencyDropdown
                currencies={currencies}
                open={Boolean(currencyAnchorEl)}
                anchorEl={currencyAnchorEl}
                onClose={handleClose}
                onOpen={handleCurrencyOpen}
                selected={selectedCurrency}
                onSelect={setSelectedCurrency}
              />
              <UserDropdown
                title="Agents"
                items={agentLinks}
                open={Boolean(agentsAnchorEl)}
                anchorEl={agentsAnchorEl}
                onClose={handleClose}
                onOpen={handleAgentsOpen}
                icon={<PersonIcon sx={{ fontSize: 12, minWidth: "auto" }} />}
                sx={{
                  "&:hover": {
                    borderColor: "#28a8e2",
                    backgroundColor: "#EEF4FB",
                  },
                }}
              />
              <UserDropdown
                title="Customer"
                items={customerLinks}
                open={Boolean(customerAnchorEl)}
                anchorEl={customerAnchorEl}
                onClose={handleClose}
                onOpen={handleCustomerOpen}
                icon={<PersonIcon sx={{ fontSize: 12 }} />}
                sx={{
                  backgroundColor: "#EEF4FB",
                }}
              />
            </Box>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { lg: "none", md:"none" }, color: "#212529" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer - No changes */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { lg: "none", md:"none" },
        }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontFamily="Inter, sans-serif">
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Links */}
          <List>
            {navLinks.map((link, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    py: 1.5,
                    "&:hover": { backgroundColor: "#EEF4FB" },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Language & Currency */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <LanguageDropdown
              languages={languages}
              open={Boolean(langAnchorEl)}
              anchorEl={langAnchorEl}
              onClose={handleClose}
              onOpen={handleLangOpen}
              selected={selectedLanguage}
              onSelect={setSelectedLanguage}
            />
            <CurrencyDropdown
              currencies={currencies}
              open={Boolean(currencyAnchorEl)}
              anchorEl={currencyAnchorEl}
              onClose={handleClose}
              onOpen={handleCurrencyOpen}
              selected={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
          </Box>

          {/* Agents Section */}
          <ListItemButton
            onClick={() => setAgentsOpen(!agentsOpen)}
            sx={{
              borderRadius: 1,
              mb: 1,
              "&:hover": { backgroundColor: "#EEF4FB" },
            }}
          >
            <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
            <ListItemText
              primary="Agents"
              primaryTypographyProps={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
              }}
            />
            {agentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={agentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {agentLinks.map((item, i) => (
                <ListItemButton
                  key={i}
                  component={Link}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* Customer Section */}
          <ListItemButton
            onClick={() => setCustomerOpen(!customerOpen)}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "#EEF4FB" },
            }}
          >
            <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
            <ListItemText
              primary="Customer"
              primaryTypographyProps={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
              }}
            />
            {customerOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={customerOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {customerLinks.map((item, i) => (
                <ListItemButton
                  key={i}
                  component={Link}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;