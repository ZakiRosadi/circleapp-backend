import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Thread } from "./threadsEntity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  threadId: number;

  @ManyToOne(() => User, (user) => user.like,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  //   @OneToOne(() => Thread)
  //   @JoinColumn()
  //   thread: Thread;

  @ManyToOne(() => Thread, (thread) => thread.like,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: Thread;
}
