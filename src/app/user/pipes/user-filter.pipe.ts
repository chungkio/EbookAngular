import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../shared/components/auth/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: UserModel[], selectedRole: string): UserModel[] {
    if (!users || !selectedRole || selectedRole === 'all') {
      return users;
    }

    return users.filter(user => user.role === selectedRole);
  }
}
