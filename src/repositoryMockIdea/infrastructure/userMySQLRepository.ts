import { UserRepository } from '../domain/repositoryInterface';
import { User } from '../domain/user';

export class UserMySQLRepository implements UserRepository {
  findById(_id: string): Promise<User | undefined> {
    // MySQLのデータベースからユーザを取得する
    throw new Error('Method not implemented.');
  }
  update(_user: User): Promise<void> {
    // MySQLのデータベースにユーザを更新する
    throw new Error('Method not implemented.');
  }
}
