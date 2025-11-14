import React, { useState, useCallback, useMemo } from 'react';
// ... las otras importaciones
import ErrorMessage from './ErrorMessage';
// ... el resto del código (simulateBackendRequest)

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ /* ... */ });
  const [formErrors, setFormErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [loading, setLoading] = useState(false);

  // La función handleChange es simple y generalmente no necesita useCallback,
  // pero lo incluiremos por práctica si se pasara a un hijo.
  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({ 
      ...prevData, 
      [e.target.name]: e.target.value 
    }));
    // Limpiar errores locales al empezar a escribir
    setFormErrors((prevErrors) => ({ 
        ...prevErrors, 
        [e.target.name]: undefined 
    }));
  }, []); // Dependencias vacías: esta función nunca cambia.

  // ⭐️ USO DE useCallBack para la función handleSubmit
  // Evita que handleSubmit se cree de nuevo en cada renderizado.
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormErrors({}); 
    setBackendError(null); 
    setLoading(true);

    try {
      userRegistrationSchema.parse(formData);
      await simulateBackendRequest(formData);

      alert(`¡Registro exitoso para el usuario: ${formData.username}!`);
      setFormData({ username: '', email: '', password: '' }); 

    } catch (error) {
      // ... (El manejo de errores Zod/Backend es el mismo)
      if (error instanceof z.ZodError) {
        // ...
      } else if (error && error.message) {
        // ...
      } else {
        // ...
      }

    } finally {
      setLoading(false);
    }
    // Dependencias: formData es la única dependencia que necesita actualizarse
    // para que la función tenga acceso a los datos más recientes.
  }, [formData]); 

  // ⭐️ USO DE useMemo para un Cálculo Costoso (o para evitar un Recálculo)
  // Calcula si hay errores en el formulario para deshabilitar el botón.
  const isFormInvalid = useMemo(() => {
    // Comprueba si hay alguna clave en formErrors con un valor (es decir, un error).
    return Object.values(formErrors).some(error => error);
  }, [formErrors]); // Dependencia: Solo se recalcula si el objeto formErrors cambia.

  return (
    <form onSubmit={handleSubmit} /* ... */>
      {/* ... (resto del formulario) */}
      
      <button 
        type="submit" 
        // 🚨 El botón estará deshabilitado si está cargando O si el formulario es inválido.
        disabled={loading || isFormInvalid} 
        /* ... */
      >
        {loading ? 'Cargando...' : 'Registrar'}
      </button>
    </form>
  );
}