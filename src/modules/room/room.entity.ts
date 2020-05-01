import { BaseEntity } from '../common/base.entity';
import { Column, OneToMany, Entity } from 'typeorm';
import { Topic } from '../topic/topic.entity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(
    () => Topic,
    topic => topic.room,
  )
  topics: Topic[];
}
