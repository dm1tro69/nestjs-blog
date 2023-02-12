import { BeforeInsert, Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { classToPlain, Exclude } from "class-transformer";
import * as bcrypt from 'bcryptjs'

@Entity('users')
export class UserEntity extends AbstractEntity{

  @Column()
  email: string

  @Column({unique: true})
  username: string

  @Column({default: ''})
  bio: string

  @Column({default: null, nullable: true})
  image: string | null

  @Column()
  @Exclude()
  password: string

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10)
  }
  toJSON(){
    return classToPlain(this)
  }
}
