
import './App.css';

import { NavBar } from './components/nav-bar';
import {BrowserRouter,Route,Routes} from "react-router-dom"

import { UnauthorizedPage } from './pages/unauthorized/unauthorized.pages';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.pages';
import { ProfilePage } from './pages/profile/profile.pages';
import { AdminPage } from './pages/admin/admin.pages';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { HomePage } from './pages/home/home.pages';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <div className='container'>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>


      <Route path="/profile" element={
      
      <AuthGuard roles = {[Role.ADMIN,Role.USER]}>
      <ProfilePage/>
      </AuthGuard>
      
      }/>
      
      
      <Route path="/admin" element={
      
      <AuthGuard roles = {[Role.ADMIN]}>
      <AdminPage/>
      </AuthGuard>
      
      }/>
     
     
     
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/404" element={<NotFoundPage/>}/>
      <Route path="/401" element={<UnauthorizedPage/>}/>
      </Routes>
    
    </div>
    </BrowserRouter>
      
    
  );
}

export default App;
