import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Type } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  priority: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE', nullable: false })
  @Type(() => User) 
  assignedToId: User;
}