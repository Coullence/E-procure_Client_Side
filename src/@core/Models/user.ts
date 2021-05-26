import { Role } from "./role";

export class User {

       _id: string;
      Status:            string;     
      firstName:         string; 
      lastName:          string; 
      email:             string; 
      phone:             string; 
      National_Id:       string; 
      jobGroup:          string; 
      jobId:             string; 
      requestAs:         string; 
      requestStatus:     string; 
      acceptTerms:       string; 
      role:              Role; 
      password:          string; 
      confirmPassword:   string; 
      token?:            string; 

   
}

