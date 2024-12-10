import { Message } from "../../types/ModelTypes";

abstract class Model {
  constructor() {}

  abstract create({
    messages,
    temperature,
  }: {
    messages: Message[];
    temperature?: number;
  }): Promise<string>;
}

export default Model;
