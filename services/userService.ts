import { authService } from './container';
import { AuthService } from './authService';
export class UserService {
    private authService : AuthService;
    
    constructor(authService : AuthService){
        this.authService = authService;
    }
    public get getUserInfo() : any {
        return {name : 'JoJo'}
    }
}