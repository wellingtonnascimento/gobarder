import React from 'react';
import api from '../../services/api';

import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size="36" color="#fff" />
        </button>
        <strong>06 de Outubro</strong>
        <button type="button">
          <MdChevronRight size="36" color="#fff" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Wellington</span>
        </Time>
        <Time>
          <strong available>09:00</strong>
          <span>Em aberto</span>
        </Time>
      </ul>
    </Container>
  );
}
