export interface Persona {
    userId: number;
    nombreCompleto: string;
    edad: number;
    habilidades: Habilidad[];
  }
  
  export interface Habilidad {
    nombre: string;
    nivel: string;
    añosExperiencia: number;
  }
  
