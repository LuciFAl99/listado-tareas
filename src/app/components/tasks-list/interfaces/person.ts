export interface Person {
    userId: number;
    fullName: string;
    age: number;
    skills: Skills[];
  }
  
  export interface Skills {
    name: string;
    level: string;
    yearsExperience: number;
  }
  
