import {
  CommonException,
  ExceptionErrorClass,
} from '../common/commonException';

enum TopicExceptionCodes {
  TOPIC_DOESNT_EXISTS = 'TC-001',
}

export class TopicDoesntExists extends CommonException {
  constructor(topicId: string) {
    super(
      `Topic of id ${topicId} does not exists`,
      new ExceptionErrorClass(TopicExceptionCodes.TOPIC_DOESNT_EXISTS, 404),
    );
  }
}
