import React from 'react';
import { Link } from 'react-router-dom';

import Notification from '../Notifications';
import logo from '../../assets/logoheader.svg';

import { Container, Content, Profile } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Notification />
          <Profile>
            <div>
              <strong>Wellington Nacimento</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/56/abott@adorable.png"
              alt="Wellington Nascimento"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
