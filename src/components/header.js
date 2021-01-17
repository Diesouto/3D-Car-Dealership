import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>CHAIR.</div>
        <nav>
          <ul>
            <li>
              <a href='/'>Inicio</a>
            </li>
            <li>
              <a href='/products'>Productos</a>
            </li>
            <li>
              <a href='/contact'>Contacto</a>
            </li>
            <li className='btn'>
              <a href='/car'>Crea tu coche</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
