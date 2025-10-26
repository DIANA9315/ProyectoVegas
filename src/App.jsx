import React from 'react';
import './App.css'; // Importa los estilos base y de componentes
import { HomePage } from './pages/homePage'; // Importa tu página de inicio

function App() {
  return (
    <main>
      {/* HEADER: Placeholder con estilo fuerte (Moto & Rosa) */}
      <header style={{ 
          padding: '20px 0', 
          borderBottom: '3px solid var(--color-rojo-sangre)', 
          textAlign: 'center',
          // Asegúrate de usar las variables aquí
          background: 'var(--color-gris-asfalto)'
      }}>
          <h1 style={{ fontSize: '2.5em', margin: 0, textShadow: '2px 2px 0px var(--color-rojo-sangre)' }}>RIDE & ROSES</h1>
      </header>
      
      {/* Renderiza la página de inicio con los productos */}
      <HomePage /> 
      
      {/* FOOTER: Pie de página oscuro con detalles metálicos */}
      <footer style={{ padding: '30px 0', background: 'var(--color-gris-asfalto)', textAlign: 'center', marginTop: '50px', color: 'var(--color-plata-metal)' }}>
        <p>© 2025 - Derechos de la Calle. Políticas & Contacto.</p>
      </footer>
    </main>
  );
}

export default App;
