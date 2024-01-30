import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  followedId: number;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.follows, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => User, (user) => user.followed, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  followed: User[];
}
