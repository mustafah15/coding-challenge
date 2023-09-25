import { Injectable } from '@nestjs/common';

import { SubscribeTo } from '../common/kafka/kafka.decorator';
import { KafkaPayload } from '../common/kafka/kafka.message';
import { CommunicationTopics } from '../communication-topics.enum';

@Injectable()
export class NotificationService {
  /**
   * When application or container scale up &
   * consumer group id is same for application
   * @param payload
   */
  @SubscribeTo(CommunicationTopics.ORDER_NOTIFICATIONS_TOPIC)
  helloSubscriberToFixedGroup(payload: KafkaPayload) {
    // handling of the notification maybe sending an email to the customer email
    // ...
    // emailService.send(payload.email)
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
