import { Routes } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
import { autenticacaoGuardGuard } from './guards/autenticacao-guard.guard';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';

export const routes: Routes = [   
    {path:'',component:LoginComponent},
    {path:'Cadastro',component:CadastroComponent},
    {path:'Menu',component:MenuComponent,canActivate: [autenticacaoGuardGuard]}
];