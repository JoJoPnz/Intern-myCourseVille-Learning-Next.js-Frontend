import { useContainer } from "../services/containerProvider";

const Logout = () => {
    const {authService} = useContainer();
    return (
        <li className="nav-item">
          <a className="nav-link" onClick={authService.logout}>Logout</a>
         </li>
    );
    
}

export default Logout;