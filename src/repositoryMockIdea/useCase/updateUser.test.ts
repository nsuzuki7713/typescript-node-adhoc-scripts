import { UserRepository } from '../domain/repositoryInterface';
import { User } from '../domain/user';
import { UpdateUser } from './updateUser';

describe('UpdateUser', () => {
  it('`userId` に該当する User が存在しない場合、エラーになる', async () => {
    const userRepository = new UserMockRepository([
      new User('1', '太郎', 'taro@example.com'),
      new User('2', '二郎', 'ziro@example.com'),
    ]);
    const useCase = new UpdateUser(userRepository);

    await expect(useCase.execute('3', { name: '三郎', email: 'saro@example.com' })).rejects.toThrow(Error);
  });

  it('名前とメールアドレスを更新する', async () => {
    const userRepository = new UserMockRepository([
      new User('1', '太郎', 'taro@example.com'),
      new User('2', '二郎', 'ziro@example.com'),
    ]);
    const userId = '2';
    const name = '二郎';
    const email = 'ziroziro@example.com';
    const useCase = new UpdateUser(userRepository);

    await useCase.execute(userId, { name, email });

    const updateUser = await userRepository.findById(userId);
    expect(updateUser?.name).toBe(name);
    expect(updateUser?.email).toBe(email);
  });
});

class UserMockRepository implements UserRepository {
  constructor(private users: User[]) {}

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async update(user: User): Promise<void> {
    this.users = this.users.reduce((acc, cur) => [...acc, cur.id === user.id ? user : cur], [] as User[]);
    return;
  }
}
