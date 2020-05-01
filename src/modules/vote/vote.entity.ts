import { BaseEntity } from '../common/base.entity';
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { Topic } from '../topic/topic.entity';

@Entity()
export class Vote extends BaseEntity {
  @Column()
  vote: number;

  @Column()
  name: string;

  @ManyToOne(
    () => Topic,
    topic => topic.votes,
  )
  @JoinColumn()
  topic: Topic;
}
