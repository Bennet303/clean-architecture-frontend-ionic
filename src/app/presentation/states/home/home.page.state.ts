import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CreateUserUseCase } from '../../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../../features/manage-users/use-cases/get.user.use.case';
import { HomePageCreateUserAction, HomePageDeleteUserAction, HomePageGetUserAction } from './home.page.state.actions';
import { defaultHomePageStateModel, HomePageStateModel } from './home.page.state.model';

@State<HomePageStateModel>({
  name: 'home',
  defaults: defaultHomePageStateModel,
})
@Injectable()
export class HomePageState {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) { }

  @Action(HomePageCreateUserAction)
  async createUser({ patchState }: StateContext<HomePageStateModel>, { user }: HomePageCreateUserAction) {
    patchState({ isLoading: true });

    const res = await this.createUserUseCase.execute(user);

    if (res instanceof Error) {
      patchState({
        error: res,
        isLoading: false,
        user: undefined
      });
    } else {
      patchState({
        error: undefined,
        isLoading: false,
        user
      });
    }
  }

  @Action(HomePageGetUserAction)
  async getUser({ patchState }: StateContext<HomePageStateModel>) {
    patchState({ isLoading: true });

    const res = await this.getUserUseCase.execute();

    if (res instanceof Error) {
      patchState({
        error: res,
        isLoading: false,
        user: undefined
      });
    } else {
      patchState({
        error: undefined,
        isLoading: false,
        user: res
      });
    }
  }

  @Action(HomePageDeleteUserAction)
  async deleteUser({ patchState }: StateContext<HomePageStateModel>, { user }: HomePageDeleteUserAction) {
    patchState({ isLoading: true });

    const res = await this.deleteUserUseCase.execute(user);

    if (res instanceof Error) {
      patchState({
        error: res,
        isLoading: false,
      });
    } else {
      patchState({
        error: undefined,
        isLoading: false,
        user: undefined
      });
    }
  }
}
