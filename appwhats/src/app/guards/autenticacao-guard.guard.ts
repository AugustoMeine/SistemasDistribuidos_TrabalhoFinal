import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';

export const autenticacaoGuardGuard: CanActivateFn = (route, state) => {
  const autenticacao = inject(AutenticacaoService);
  const router = inject(Router);
  
  if (!autenticacao.autenticar()) {    
    router.navigate(['/login']);
    return(false);
  }

  return(true);
};