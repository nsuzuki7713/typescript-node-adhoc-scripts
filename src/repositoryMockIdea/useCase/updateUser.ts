import { UserRepository } from '../domain/repositoryInterface';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, updateParam: { name: string; email: string }): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('ユーザーが存在しません');
    }

    const updatedUser = user.changeName(updateParam.name).changeEmail(updateParam.email);

    await this.userRepository.update(updatedUser);
  }
}
