import React from 'react';

// Este componente recibe el mensaje de error y lo muestra en un estilo de alerta.
export default function ErrorMessage({ message }) {
  if (!message) return null; // No renderizar si no hay mensaje

  return (
    <div
      style={{
        padding: '10px',
        margin: '10px 0',
        color: '#721c24', // Color de texto oscuro
        backgroundColor: '#f8d7da', // Fondo rojo claro
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
      }}
      role="alert"
    >
      <strong>Error:</strong> {message}
    </div>
  );
}