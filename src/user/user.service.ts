  import { Injectable } from '@nestjs/common';
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
    async create(createUserDto: CreateUserDto): Promise<User | undefined> {
      try {
        let user: User = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
      } catch (error) {
        console.error('Error creating user:', error);
        return undefined;
      }
    }
  // =========================find all data===============================================
    async findAll(): Promise<User[]> {
      try {
        return await this.userRepository.find();
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    }
  // ====================================fetch single data====================================
  async findOne(id: number): Promise<User | undefined | any> {
    try {
      const options: FindOneOptions<any> = {
        where: { userid: id },
      };
      return await this.userRepository.findOne(options);
      
    } catch (error) {
      return undefined;
    }
  }
  // =======================================update profile======================================
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
      try {
        let user: User = await this.findOne(id);
        if (!user) {
          return undefined;
        }
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;
        return await this.userRepository.save(user);
      } catch (error) {
        console.error('Error updating user:', error);
        return undefined;
      }
    }
  // =======================================remove=========================================
    async remove(id: number): Promise<string> {
      try {
        const result = await this.userRepository.delete({ userid: id });
        if (result.affected === 0) {
          throw new Error('User not found');
        }
        return 'User deleted successfully';
      } catch (error) {
        console.error('Error deleting user:', error);
        return 'Failed to delete user';
      }
    }
    // ===============================add to card===================================
    async addToCard(id: number, cardID: number): Promise<string> {
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
        return `Failed to add to cart, ${error}`;
      }
    }    
   // ======================================remove add to card =============================================
   async removeAddToCard(id: number, cardID: number): Promise<string> {
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
      return `Failed to remove from cart, ${error}`;
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
