import { BaseEntity } from '../common/entities/base.entity';
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Topic } from '../topic/topic.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Vote extends BaseEntity {
  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  vote: number;

  @ApiProperty({ nullable: false })
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    nullable: false,
    description:
      'Id de identificação do usuário. Este valor deve ser gerenciado pelo client',
  })
  @IsNotEmpty()
  @Column()
  clientId: string;

  @ApiProperty({ nullable: false, description: 'Id do tópico' })
  @IsNotEmpty()
  @ManyToOne(
    () => Topic,
    topic => topic.votes,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  topic: string;
}
