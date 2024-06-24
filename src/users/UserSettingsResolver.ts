import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserSetting } from "../graphql/models/UserSettings";
import { CreateUserSettingsInput } from "../graphql/utils/CreateUserSettingsUnput";
import { UserSettingService } from "./UserSettingsService";

@Resolver()
export class UserSettingsResolver{

    constructor(private userSettingService: UserSettingService){}

    @Mutation(() => UserSetting)
    createUserSettings(
        @Args('createUserSettingsData') createUserSettings: CreateUserSettingsInput
    ){
        return this.userSettingService.createUserSettings(createUserSettings);
    }


}