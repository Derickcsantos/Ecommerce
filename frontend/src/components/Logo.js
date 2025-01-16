import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ w = 60, h = 12 }) => {
  return (
    <img
      src="/logoDCS.png" // Caminho relativo da imagem na pasta public
      alt="Logo"
      width={w}
      height={h}
      style={{ display: 'block' }} // Adicione estilos se necessário
    />
  );
};

Logo.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number,
};

export default Logo;
