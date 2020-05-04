import { BaseEntity } from '../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Topic } from '../topic/topic.entity';

@Entity()
export class Room extends BaseEntity {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(
    () => Topic,
    topic => topic.room,
  )
  topics: Topic[];
}
