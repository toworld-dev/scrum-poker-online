import { BaseEntity } from '../common/base.entity';
import { Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Room } from '../room/room.entity';
import { Vote } from '../vote/vote.entity';

export class Topic extends BaseEntity {
  @Column()
  description: string;

  @ManyToOne(
    () => Room,
    room => room.topics,
  )
  @JoinColumn()
  room: Room;

  @OneToMany(
    () => Vote,
    vote => vote.topic,
  )
  @JoinColumn()
  votes: Vote[];
}
