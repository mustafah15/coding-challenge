export class KafkaPayload {
  public body: any;
  public messageId: string;
  public messageType: string;
  public createdTime?: string;

  create?(messageId, body, messageType): KafkaPayload {
    return {
      messageId,
      body,
      messageType,
      createdTime: new Date().toISOString(),
    };
  }
}

export declare class KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId: string;
}
