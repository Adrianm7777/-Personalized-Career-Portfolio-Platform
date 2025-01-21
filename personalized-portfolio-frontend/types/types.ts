export interface IPortfolioData {
  id: number;
  name: string;
  title: string;
  skills: string[];
  experience: number;
}

export interface IValidationData {
  username: string;
  email?: string;
  password: string;
}
