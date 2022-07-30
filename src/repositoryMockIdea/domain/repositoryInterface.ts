import { User } from './user';

export interface UserRepository {
  findById(id: string): Promise<User | undefined>;
  update(user: User): Promise<void>;
}
