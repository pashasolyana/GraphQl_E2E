import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../graphql/models/User";
import { UserSetting } from "../graphql/models/UserSettings";
import { CreateUserInput } from "../graphql/utils/CreateUserInput";
import { Inject } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserSettingService } from "./UserSettingsService";

@Resolver(() => User)
export class UserResolver{

    constructor(
        @Inject(UserService) private userService: UserService,
        private userSettingService: UserSettingService
    ){}

    @Query(() => User, { nullable: true, name: 'userById'})
    getUserById(
        @Args('id', {type: () => Int}) id: number
    ){
      return this.userService.getUserById(id);
    }

    @Query(() => [User])
    async getUsers(){
        return this.userService.getUsers();
    }

    @ResolveField(() => UserSetting, { nullable: true, name: 'settings'})
    getUserSettings(@Parent() user: User){
        console.log(user)
        return this.userSettingService.getUsersSettingById(user.id);
    }

    @Mutation(() => User)
    createUser(
        @Args('createUserData') createUserData: CreateUserInput
    ){
        return this.userService.createUser(createUserData);
    }
}
