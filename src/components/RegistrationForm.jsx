import React, { useState } from 'react';
import { userRegistrationSchema } from '../lib/validationSchemas';
import ErrorMessage from './ErrorMessage';

// Función de ejemplo para simular una petición al backend
// Simula un error de backend si el usuario es 'admin'
const simulateBackendRequest = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'admin') {
        // Simulación de error de backend (ej: usuario ya existe)
        reject({ message: 'El usuario "admin" ya está registrado en el sistema.' });
      } else {
        // Simulación de respuesta exitosa
        resolve({ success: true, user: data.username });
      }
    }, 1000); // Retraso de 1 segundo para simular latencia
  });
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({}); // Errores de Zod (validación local)
  const [backendError, setBackendError] = useState(null); // Errores de la API/Backend
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar errores locales al empezar a escribir
    setFormErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({}); // Limpiar errores previos
    setBackendError(null); // Limpiar error de backend previo
    setLoading(true);

    try {
      // 1. VALIDACIÓN LOCAL CON ZOD
      // El método .parse() lanzará un error si falla la validación.
      // Puedes usar .safeParse() si quieres manejar el resultado sin try/catch.
      userRegistrationSchema.parse(formData);

      // Si la validación local pasa, procedemos al backend

      // 2. PETICIÓN AL BACKEND (MANEJO DE ERRORES DE API)
      await simulateBackendRequest(formData);

      alert(`¡Registro exitoso para el usuario: ${formData.username}!`);
      setFormData({ username: '', email: '', password: '' }); // Limpiar formulario

    } catch (error) {
      // Manejo de Errores
      
      if (error instanceof z.ZodError) {
        // ERROR DE ZOD (Validación Local)
        console.error("Zod Validation Error:", error.issues);
        
        // Mapear los errores de Zod al estado de errores del formulario
        const newErrors = {};
        error.issues.forEach(issue => {
          // El 'path' es el nombre del campo (ej: ['username'])
          newErrors[issue.path[0]] = issue.message;
        });
        setFormErrors(newErrors);
        
      } else if (error && error.message) {
        // ERROR DEL BACKEND/API (Ejemplo: Usuario duplicado, 401, 500)
        console.error("Backend Error:", error.message);
        setBackendError(error.message);

      } else {
        // Otros Errores Inesperados
        setBackendError("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registro de Usuario</h2>
      
      {/* Muestra el error general del Backend si existe */}
      <ErrorMessage message={backendError} />

      {/* Campo Username */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {/* Muestra el error específico del campo de Zod */}
        {formErrors.username && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 0' }}>{formErrors.username}</p>
        )}
      </div>

      {/* Campo Email */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {formErrors.email && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 0' }}>{formErrors.email}</p>
        )}
      </div>

      {/* Campo Password */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {formErrors.password && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 0' }}>{formErrors.password}</p>
        )}
      </div>

      <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {loading ? 'Cargando...' : 'Registrar'}
      </button>
    </form>
  );
}