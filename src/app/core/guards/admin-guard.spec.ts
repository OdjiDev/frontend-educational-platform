import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminGuard } from './admin-guard'; // 👈 FIX 1 : Modifié de './admin.guard' à './admin-guard' pour correspondre au nom réel de ton fichier
import { AuthService } from '../services/auth.service';
import { of, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { User } from '../../shared/models/user.model';

describe('adminGuard', () => {
  let mockAuthService: Partial<AuthService>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockAuthService = {
      getUserProfile: () => of({ id: 1, email: 'admin@test.com', role: 'admin', is_active: true } as User)
    };

    mockRouter = {
      navigate: () => Promise.resolve(true)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('devrait autoriser l accès si l utilisateur est un admin', async () => {
    await TestBed.runInInjectionContext(async () => {
      const result = adminGuard({} as any, {} as any);
      
      if (typeof result === 'boolean') {
        expect(result).toBe(true);
      } else if (result instanceof Observable) { // 👈 FIX 2 : On certifie à TypeScript que c'est bien un Observable avant de le passer à firstValueFrom
        const isAllowed = await firstValueFrom(result);
        expect(isAllowed).toBe(true);
      } else if (result instanceof Promise) {
        const isAllowed = await result;
        expect(isAllowed).toBe(true);
      }
    });
  });
});       