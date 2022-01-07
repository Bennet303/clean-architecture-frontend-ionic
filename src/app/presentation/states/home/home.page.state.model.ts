import { UserEntity } from '../../../features/manage-users/entities/user.entity';

export interface HomePageStateModel {
  user: UserEntity;
  isLoading: boolean;
  error: Error;
}

export const defaultHomePageStateModel: HomePageStateModel = {
  user: undefined,
  isLoading: false,
  error: undefined,
};
