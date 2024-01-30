import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Thread } from "./threadsEntity";
import { Reply } from "./repliesEntity";
import { Like } from "./likeEntity";
import { Follows } from "./followsEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  postedAt: Date;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  thread: Thread[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  reply: Reply;

  @OneToMany(() => Like, (like) => like.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  like: Like;

  @OneToMany(() => Follows, (follows) => follows.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  follows: User[];

  @OneToMany(() => Follows, (follows) => follows.followed, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  followed: User[];
}
