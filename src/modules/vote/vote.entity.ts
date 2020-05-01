import { BaseEntity } from '../common/base.entity';
import { Column, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from '../topic/topic.entity';

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
