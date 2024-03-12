import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}


  // =========================create user============================================
  @Post('/add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  //  ========================get user================================================
  @Get('/get-all')
  findAll() {
    return this.userService.findAll();
  }
  // =======================get one user===============================================
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  // ============================update profile========================================
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  // ================================delete profile===================================
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  };
  //===============================add to card ========================================
  @Patch('add-to-card/:id/Card-id/:cardID')
  addToCard(@Param('id') id: string, @Param('cardID') cardID: string) {
    return this.userService.addToCard(+id, +cardID); 
}
  // =============================remove add to card====================================
  @Delete('/remove/add-to-card/:id/card-id/:cardID')
  removeAddToCard(@Param('id') id: string, @Param('cardID') cardID: string){
    return this.userService.removeAddToCard(+id, +cardID)
  }

}
