import { User } from '../domain/user';
import { UserMySQLRepository } from './../infrastructure/userMySQLRepository';
import { UpdateUser } from './updateUser';

describe('UpdateUser', () => {
  it('`userId` に該当する User が存在しない場合、エラーになる', async () => {
    const userRepository = new UserMySQLRepository();
    jest.spyOn(userRepository, 'findById').mockImplementation(async (_user: string) => {
      return undefined;
    });
    const useCase = new UpdateUser(userRepository);

    await expect(useCase.execute('1', { name: '太郎', email: 'taro@example.com' })).rejects.toThrow(Error);
  });

  it('名前とメールアドレスを更新する', async () => {
    const userRepository = new UserMySQLRepository();
    jest.spyOn(userRepository, 'findById').mockImplementation(async (_user: string) => {
      return new User('1', '太郎', 'taro@example.com');
    });
    const updateSpy = jest.spyOn(userRepository, 'update').mockResolvedValue();
    const useCase = new UpdateUser(userRepository);

    await useCase.execute('1', { name: '太郎太郎', email: 'tarotaro@example.com' });

    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(new User('1', '太郎太郎', 'tarotaro@example.com'));
  });
});
