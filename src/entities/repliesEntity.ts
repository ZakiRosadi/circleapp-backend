import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  createConnection,
  getRepository,
} from "typeorm";
import { User } from "./User";
import { Thread } from "./threadsEntity";
import moment from "moment";

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  postedAt: Date;

  @Column()
  userId: number;

  @Column()
  threadId: number;

  @ManyToOne(() => User, (user) => user.reply, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.reply, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: Thread;
}
