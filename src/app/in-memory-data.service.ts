import { InMemoryDbService } from "angular-in-memory-web-api";


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      
      const actors = [
        {id:1,name:'Shakib Khan',popularity:'high'},
        {id:2,name:'Bappi',popularity:'medium'},
        {id:3,name:'Ononto Jolil',popularity:'high'},
        {id:4,name:'Emon',popularity:'low'},
        {id:5,name:'Maroof',popularity:'medium'}
      ];
      
      return {actors};
    }
  }