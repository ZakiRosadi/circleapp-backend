import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Reply } from "./repliesEntity";
import { Like } from "./likeEntity";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  postedAt: Date;

  @ManyToOne(() => User, (user) => user.thread, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @OneToMany(() => Reply, (reply) => reply.thread, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  reply: Reply;

  @OneToMany(() => Like, (like) => like.thread,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  like: Like;
}
