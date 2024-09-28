export interface Person {
    userId: number;
    fullName: string;
    age: number;
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    level: string;
    yearsExperience: number;
  }
  
