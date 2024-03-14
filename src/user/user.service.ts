  import { BadRequestException, Injectable } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { Repository } from 'typeorm';
  import { FindOneOptions } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './entities/user.entity';
  import { LoginUserDto } from './dto/login.user.dto';
import { promises } from 'dns';
import { emit } from 'process';

  @Injectable()
  export class UserService {

    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

  //  ===========create user=============================================================
    async create(createUserDto: CreateUserDto): Promise<User | undefined | any> {
        try {
             let {email} = createUserDto;
            // Check if a user with the provided email already exists
            const findOneOptions: FindOneOptions<User> = {
              where: { email } // Include both email and password conditions
            };
            const existingUser = await this.userRepository.findOne(findOneOptions);
            if (existingUser) {
                return new BadRequestException("user is alredy exit") // Return undefined to indicate that the user creation failed
            }

            // If user does not exist, create a new user entity and save it
            const newUser: User = this.userRepository.create(createUserDto);
            return await this.userRepository.save(newUser);
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }
  // =========================find all data===============================================
    async findAll(): Promise<User[]| any[] | any> {
      try {
        return await this.userRepository.find();
      } catch (error) {
        return new BadRequestException(error.message) ;
      }
    }
  // ====================================fetch single data====================================
  async findOne(id: number): Promise<User | undefined | any> {
    try {
      const options: FindOneOptions<any> = {
        where: { userid: id },
      };
      let x:any = await this.userRepository.findOne(options);
      if(!x){
         return new BadRequestException("user is not prasent")
      }
      return x;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
  // =======================================update profile======================================
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined | any> {
      try {
        let user: User = await this.findOne(id);
        if (!user) {
          return new BadRequestException("user is not prasent");
        }
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;
        return await this.userRepository.save(user);
      } catch (error) {
        console.error('Error updating user:', error);
        return new BadRequestException(error.message);
      }
    }
  // =======================================remove=========================================
    async remove(id: number): Promise<string | any > {
      try {
        const result = await this.userRepository.delete({ userid: id });
        if (result.affected === 0) {
          throw new Error('User not found');
        }
        return 'User deleted successfully';
      } catch (error) {
        console.error('Error deleting user:', error);
        return new BadRequestException(error.message);
      }
    }
    // ===============================add to card===================================
    async addToCard(id: number, cardID: number): Promise<string | any> {
      try {
        let user: User = await this.findOne(id);
        if (!user) {
          return "User does not exist";
        }
        console.log(id, cardID )
        // Ensure addToCard is an array in the User entity
        if (!user.addToCard) {
          console.log("is array")
          user.addToCard = []; // Initialize addToCard array if not exists
        }
          // Push cardID into addToCard array
          user.addToCard.push(cardID.toString());
          // Convert addToCard to a JSON string to ensure proper formatting
          const addToCardString = user.addToCard;
          console.log("this =>", user)
            // Save the updated user entity
          await this.userRepository.query(`UPDATE "user" SET "addToCard" = $1 WHERE "userid" = $2`, [addToCardString, id]);
          return "Item added to the card successfully";
    
      } catch (error) {
        console.error('Error adding to cart:', error);
        return new BadRequestException(error.message);
      }
    }    
   // ======================================remove add to card =============================================
   async removeAddToCard(id: number, cardID: number): Promise<string | any> {
    try {
      let user: User = await this.findOne(id);
      if (!user) return "User does not exist";
  
      if (!user.addToCard || !user.addToCard.length) return "addToCard array is empty";
  
      const index = user.addToCard.indexOf(cardID.toString());
      if (index === -1) return "Card not found in addToCard array";
  
      user.addToCard.splice(index, 1);
  
      await this.userRepository.query(`UPDATE "user" SET "addToCard" = $1 WHERE "userid" = $2`, [user.addToCard, id]);
  
      return "Item removed from the card successfully";
    } catch (error) {
      console.error('Error removing from cart:', error);
      return new BadRequestException(error.message);
    }
  }
  // =========================login==========================================

  async login(LoginUserDto: LoginUserDto): Promise<User | undefined> {
    const { email, password } = LoginUserDto;
    
    const findOneOptions: FindOneOptions<User> = {
      where: { email, password } // Include both email and password conditions
    };
  
    return await this.userRepository.findOne(findOneOptions);
  }
  
  

  }
