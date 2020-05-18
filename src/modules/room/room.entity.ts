import { BaseEntity } from '../common/entities/base.entity';
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

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @OneToMany(
    () => Topic,
    topic => topic.room,
    {
      lazy: true,
    },
  )
  topics: Promise<Topic[]>;
}
