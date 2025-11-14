import { z } from 'zod';

// Esquema de ejemplo para un formulario de registro de usuario
export const userRegistrationSchema = z.object({
  // Campo 'username'
  username: z
    .string({
      required_error: "El nombre de usuario es obligatorio." // Mensaje si falta
    })
    .min(3, { message: "El usuario debe tener al menos 3 caracteres." })
    .max(20, { message: "El usuario no puede exceder los 20 caracteres." }),
    
  // Campo 'email'
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio."
    })
    .email({ message: "Formato de correo electrónico inválido." }),
    
  // Campo 'password'
  password: z
    .string({
      required_error: "La contraseña es obligatoria."
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});