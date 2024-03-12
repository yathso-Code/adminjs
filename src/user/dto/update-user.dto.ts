import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    userid: number;
    name: string;
    email: string;
    age: number;
    password: string;
    addToCardId: string[]; // Specify the type argument for Array
}
