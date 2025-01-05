import { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IoSearchOutline } from 'react-icons/io5';
import NotificationMessage from '@/Components/NotificationMessage';
import { useMediaQuery } from 'react-responsive';
import { PiCaretLeft } from 'react-icons/pi';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { CommonIcon } from '@/Components/CommonIcon';
import clsx from 'clsx';

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '0',

  [theme.breakpoints.up('sm')]: {
    width: '0',
  },
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  [theme.breakpoints.up('lg')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 12,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Option {
  label: string;
  value: string;
}

export default function Authenticated({ children }: PageProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const auth: any = usePage().props.auth;
  const logo: any = usePage().props?.settings;

  const user = auth.user;
  const companyDetails = user.company_detail || [];
  const selectedCompanyId = auth.selectedCompany?.id?.toString() || '';
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const menuSideBar: any = usePage()?.props?.menuSideBar;

  const props: any = usePage().props;

  const baseUrl = window.location.origin;

  const options: Option[] = companyDetails.map((company: any) => ({
    label: company.company_name,
    value: company.id.toString(),
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedCompanyId
  );

  useEffect(() => {
    const selectedCompany = options.find(
      (option) => option.value === selectedCompanyId.toString()
    );
    if (selectedCompany) {
      setSearchTerm(selectedCompany.label);
      setSelectedOption(selectedCompany.value);
    } else {
      setSearchTerm('');
    }
  }, []);

  useEffect(() => {
    if (props?.flash?.message && props?.flash?.type) {
      setNotification({
        message: props?.flash?.message,
        type: props?.flash?.type,
      });
    }
  }, [props.flash]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(value);
    setSearchTerm(label);
    setIsOpen(false);
    router.get(route('set.company', { company: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setSelectedOption(null);
    }
    setIsOpen(true);
  };

  const [open, setOpen] = useState(isMobile ? false : true);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const impersonate = auth.imperonatedUser || null;

  const impersonateOut = () => {
    router.post(route('users.impersonate.exit'));
  };

  return (
    <Box
      component="div"
      className="mt-0"
      sx={{ display: 'flex', backgroundColor: '#f0f0f0' }}
    >
      <CssBaseline />
      {isMobile ? (
        <AppBar
          position="fixed"
          open={open}
          className="!bg-dusk !shadow-none border-b border-[#dee4ec] !w-full text-black "
        >
          <Toolbar>
            <img
              className="w-32"
              src={`${baseUrl}/storage/${logo?.mobile_logo_path}`}
              alt="Logo"
            />

            <Typography variant="h6" noWrap component="div" className="hidden">
              {user.roles?.some((role: any) => role.name === 'admin')
                ? 'Super Admin'
                : ''}
            </Typography>
            {options.length > 0 && (
              <div className="relative md:w-72 lg:w-96 hidden md:inline-block lg:inline-block ml-12">
                <div className="flex items-center">
                  <IoSearchOutline className="text-slate-400 text-lg w-5 h-5 absolute left-2" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search and select"
                    className="!border !border-gray-200 rounded bg-slate-100 text-slate-400	 py-2 pl-9 w-full"
                  />
                </div>

                {isOpen && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`p-2 hover:bg-gray-100 cursor-pointer text-black ${option.value === selectedOption ? 'bg-gray-200 text-black font-semibold' : ''}`}
                          onClick={() =>
                            handleOptionClick(option.value, option.label)
                          }
                        >
                          {option.label}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No options found</div>
                    )}
                  </div>
                )}
              </div>
            )}
            <Box sx={{ flexGrow: 1 }} />

            <Box
              display="flex"
              alignItems="center"
              className="min-h-16 px-1 md:px-2 lg:px-4"
            >
              <IconButton
                onClick={handleMenu}
                color="inherit"
                className="hover:!bg-transparent"
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={user.name}
                  src={user.profileImage || '/path/to/default/avatar.jpg'}
                >
                  {!user.profileImage && user.name.charAt(0)}
                </Avatar>
                <Typography
                  variant="body1"
                  className="text-white md:text-white lg:text-black"
                  sx={{
                    marginLeft: 1,
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.name}
                </Typography>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  style: {
                    marginTop: 15,
                    width: 180,
                    boxShadow: 'none',
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('profile.edit'));
                  }}
                >
                  <AccountCircleIcon sx={{ marginRight: 2 }} /> Account
                </MenuItem>

                {impersonate && (
                  <MenuItem onClick={impersonateOut}>
                    <ArrowLeftOnRectangleIcon /> Exit Impersonate
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                  <ReceiptIcon sx={{ marginRight: 2 }} /> Billing
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('logout'));
                  }}
                >
                  <ExitToAppIcon sx={{ marginRight: 2 }} /> Log out
                </MenuItem>
              </Menu>
            </Box>

            <IconButton
              className=" !ml-0 sm:!ml-3 "
              color="inherit"
              aria-label="toggle drawer"
              onClick={toggleDrawer}
              edge="start"
            >
              <MenuIcon className="text-white !w-8 !h-8 !text-xl" />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="fixed"
          open={open}
          className={
            open
              ? '!left-auto  !bg-white border-b border-[#dee4ec]  !shadow-none !w-full md:!w-[calc(100%-240px)] lg:!w-[calc(100%-240px)]'
              : ' md:pl-16 lg:pl-16  !bg-white  border-b border-[#dee4ec] !shadow-none '
          }
        >
          <Toolbar>
            <IconButton
              className="bg-gradient-org-red !ml-0 sm:!ml-3"
              color="inherit"
              aria-label="toggle drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ marginRight: 5 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              {user.roles?.some((role: any) => role.name === 'admin')
                ? 'Super Admin'
                : ''}
            </Typography>
            {options.length > 0 && (
              <div className="relative w-96">
                <div className="flex items-center">
                  <IoSearchOutline className="text-slate-400 text-lg w-5 h-5 absolute left-2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search and select"
                    className="!border !border-gray-200 rounded  text-slate-400	 py-2 pl-9 w-full"
                  />
                </div>
                {isOpen && (
                  <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded w-full max-h-40 overflow-auto">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`p-2 hover:bg-gray-100 cursor-pointer text-black ${option.value === selectedOption ? 'bg-gray-200 text-black font-semibold' : ''}`}
                          onClick={() =>
                            handleOptionClick(option.value, option.label)
                          }
                        >
                          {option.label}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No options found</div>
                    )}
                  </div>
                )}
              </div>
            )}
            <Box sx={{ flexGrow: 1 }} />

            <Box
              display="flex"
              alignItems="center"
              className="!bg-neutral-100 min-h-16 px-4"
            >
              <IconButton
                onClick={handleMenu}
                color="inherit"
                className="hover:!bg-transparent"
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={user.name}
                  src={user.profileImage || '/path/to/default/avatar.jpg'}
                >
                  {!user.profileImage && user.name.charAt(0)}
                </Avatar>
                <Typography
                  variant="body1"
                  className="text-black"
                  sx={{
                    marginLeft: 1,
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.name}
                </Typography>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  style: {
                    marginTop: 15,
                    width: 180,
                    boxShadow: 'none',
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('profile.edit'));
                  }}
                >
                  <AccountCircleIcon sx={{ marginRight: 2 }} /> Account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ReceiptIcon sx={{ marginRight: 2 }} /> Billing
                </MenuItem>
                {impersonate && (
                  <MenuItem onClick={impersonateOut}>
                    <ArrowLeftOnRectangleIcon /> Exit Impersonate
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('logout'));
                  }}
                >
                  <ExitToAppIcon sx={{ marginRight: 2 }} /> Log out
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant="permanent"
        open={open}
        className="left-sidebar fixed md:fixed lg:relative z-[999]"
      >
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: open ? 'flex-start' : 'center',
            alignItems: 'center',
            height: 'auto',
            minHeight: 64,
            boxSizing: 'border-box',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: open ? 'center' : 'center',
              alignItems: 'center',
              height: 'auto',
              width: '100%',
              minHeight: 64,
              boxSizing: 'border-box',
              borderBottom: '1px solid white',
              marginBottom: '0',
            }}
            variant="h5"
            gutterBottom
          >
            {open ? (
              <img
                className="w-32"
                src={`${baseUrl}/storage/${logo?.full_logo_path}`}
                alt="Logo"
              />
            ) : (
              <img
                className="w-32"
                src={`${baseUrl}/storage/${logo?.logo_path}`}
                alt="Only Logo"
              />
            )}
          </Typography>
          <div className="absolute left-[195px] z-[999] top-1/2 lg:hidden">
            <PiCaretLeft
              className="cursor-pointer  mx-4 !text-sm bg-white w-12 h-12 !pl-0 rounded-full p-2.5 text-black"
              onClick={toggleDrawer}
            />
          </div>
        </Box>

        <List className="grid grid-flow-col-1 gap-3 !pt-0">
          {menuSideBar.map((item: any, index: number) => {
            return (
              <ListItem key={index} disablePadding className="!block">
                <ListItemButton
                  onClick={() => router.get(item.path)}
                  className={`transition duration-300 ${item?.active ? 'active-button' : ''}`}
                  sx={{
                    background: item?.active
                      ? 'rgb(255 247 237) !important'
                      : 'transparent',
                    color: item?.active ? '#000' : 'inherit',
                  }}
                >
                  <CommonIcon
                    key={index}
                    icon={item?.icon}
                    className={clsx(open ? 'mr-3 ' : 'mr-auto ')}
                  />
                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />
      </Drawer>
      <Box
        component="main"
        className="!h-fit max-h-fit !min-h-screen  !pt-20 md:!pt-28 lg:!pt-28 !px-3 md:!px-6  "
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}
      >
        {children}
      </Box>

      {notification && (
        <NotificationMessage
          message={notification.message}
          onClose={() => setNotification(null)}
          type={notification.type}
        />
      )}
    </Box>
  );
}
