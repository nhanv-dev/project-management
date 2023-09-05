import { UserService } from './../services/user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get('/username/:username')
    async getByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }


}