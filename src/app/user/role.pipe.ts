import { AuthService } from 'src/app/shared/components/auth/auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
// Chỉ hiển phần select roles nếu đó là administrator
export class RolePipe implements PipeTransform {
  constructor(private AuthService: AuthService){}

  transform(): boolean {
    const currentUser = this.AuthService.getCurrentUser();
    if(currentUser){
      return currentUser.role === 'admin';
    }else{
      return false;
    }

  }

}
