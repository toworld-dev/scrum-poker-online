import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Column, ManyToOne, JoinColumn, OneToMany, Entity } from 'typeorm';

import { BaseEntity } from '../common/entities/base.entity';
import { Room } from '../room/room.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class Topic extends BaseEntity {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @ManyToOne(
    () => Room,
    room => room.topics,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
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
