import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../graphql/models/User";
import { UserSetting } from "../graphql/models/UserSettings";
import { CreateUserSettingsInput } from "src/graphql/utils/CreateUserSettingsUnput";
import { Repository } from "typeorm";

@Injectable()
export class UserSettingService{
    constructor(
        @InjectRepository(UserSetting) private userSettingRepository: Repository<UserSetting>,
        @InjectRepository(User) private usergRepository: Repository<User>
    ){}

    getUsersSettingById(userId: number){
        return this.userSettingRepository.findOneBy({userId});
    }

    async createUserSettings(createUserSettingsData: CreateUserSettingsInput){
        const findUser = await this.usergRepository.findOneBy({id: createUserSettingsData.userId})
        if(!findUser){
            throw new Error('User Not Found')
        }
        const newUserSetting = this.userSettingRepository.create(createUserSettingsData)
        const savedSettings = await this.userSettingRepository.save(newUserSetting);
        findUser.settings = savedSettings;
        await this.usergRepository.save(findUser)
        return savedSettings;
    }
}