import { useEffect, useState, useContext } from 'react';
import { Button, styled, Typography } from '@mui/material';
import { VideoLabel, ListAlt } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import { logout } from '../context/actions/authentication';

const links = [{ to: '/', text: 'Offres', icon: <VideoLabel /> }];

const protectedLinks = [
  ...links,
  { to: '/demandes', text: 'Demandes', icon: <ListAlt /> },
  { to: '/mes-offres', text: 'Mes offres', icon: <ListAlt /> },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const [navLinks, setNavLinks] = useState(links);
  const { state, dispatch } = useContext(Store);
  const {
    auth: { user },
  } = state;

  const handleLogout = () => {
    logout(dispatch);
    navigate('/se-connecter');
  };

  useEffect(() => {
    if (!user) {
      setNavLinks(links);
      return;
    }
    setNavLinks(protectedLinks);
  }, [user]);

  return (
    <Nav>
      <NavLink to="/">
        <Typography variant="h6">Associations Hub</Typography>
      </NavLink>
      <NavMenu>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.icon}
            <Typography variant="body1">{link.text}</Typography>
          </Link>
        ))}
      </NavMenu>
      <Account>
        {user ? (
          <>
            <Typography variant="body1">{user.name}</Typography>
            <Button size="small" variant="contained" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <Link to="/se-connecter">Se connecter</Link>
        )}
      </Account>
    </Nav>
  );
};

const Nav = styled('nav')`
  z-index: 100;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  overflow: auto;
  width: 200px;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 1rem;
`;

const NavMenu = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
`;

const Link = styled(NavLink)`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
  overflow: hidden;
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.light};
  }
  &.active {
    background: ${({ theme }) => theme.palette.secondary.light};
  }
`;

const Account = styled('div')`
  background: ${({ theme }) => theme.palette.secondary.light};
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;
