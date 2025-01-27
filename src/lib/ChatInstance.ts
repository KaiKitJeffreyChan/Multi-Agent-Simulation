import { Personality, Message } from "../types/GeneralTypes";
import { ChatInstanceParams } from "../types/GeneralTypes";
import { Solution } from "../lib/Solution/Solution";
import Model from "./Models/Model";

export class ChatInstance {
  private personality: Personality;
  private conversationHistory: Message[];
  private client: Model;
  private problem: string;

  private messageCount: number;
  public SPEAK_ACTION = "speak";
  public LISTEN_ACTION = "listen";
  public SPEAKWITHEDIT_ACTION = "speakwithedit";

  private LISTEN_DECISION_PROMPT = `
  I must respond with exactly one of the options, without saying anything else ["SPEAK", "LISTEN", "SPEAKWITHEDIT"]. 
  Im going to read what each option means and respond with what I want to do

  Say "SPEAKWITHEDIT" if:
  - The solution is empty
  - I am considering contributing a solution or improving upon an existing one.
  - The current solution is incomplete or could be enhanced with a better idea or perspective.
  - Someone else in the group has shared an idea worth incorporating, and I want to highlight or integrate it.
  - There is consensus or discussion that suggests the solution needs to evolve or change.
  - I want to refine, clarify, or optimize the solution to make it more effective.

  Say "SPEAK" if:
  - I want to continue the conversation; the conversation will end if all participants say "LISTEN".
  - I have something new to say or a new idea to introduce.
  - I want to speak without changing the solution. 
  - I want to ask a question or make a statement.
  - I want to clarify or elaborate on a point without changing the solution yet.
  - I want to respond to a question or comment.

  Say "LISTEN" if:
  - I are bored or don't find the topic interesting.
  - The conversation is wrapping up.
  - I have nothing new to say.
  - The conversation has been going on for a while;  I get tired the longer the conversation goes on

  `;

  private LISTEN_USER_PROMPT = `What would I like to do next? Respond with one of the options ["SPEAK", "LISTEN", "SPEAKWITHEDIT"]`;

  private ADD_SOLUTION_PROMPT = `
    What is the new solution I want to contribute?
    I must remember that the response I give now will completely replace the current solution. This response should be a finalized, self-contained solution to the problem, leaving no gaps or unanswered parts.

    Rules for crafting the new solution:
    - Direct and Complete: The solution must directly address every aspect of the problem. If any part is unclear or incomplete, I will ensure it is resolved now.
    - Relevant Only: I will not add anything unrelated or unnecessary to the problem. Every word must contribute meaningfully to the solution.
    - Final Form: The response must be ready for immediate use. It should require no further refinement, explanation, or rewording.
    
    Examples for clarity:
    - If the problem asks for a story, I will now write the complete and final version of the story.
    - If the problem is a programming task, I will now write the exact code that solves it, ensuring it is ready to execute.
    - If the problem involves designing a menu, I will now present the finalized menu, listing all items.
    - If the problem requires creating a workflow, I will now provide the complete step-by-step process in its final form.
    `;

  constructor({
    personality,
    messageCount = 0,
    model,
    problem,
  }: ChatInstanceParams) {
    this.messageCount = messageCount;
    this.personality = personality;
    this.client = model;
    this.problem = problem;
    this.conversationHistory = [
      {
        role: "user",
        content: `
        - You are the mind.
        - You embody the mind of ${this.personality.name}. Your essence is defined by ${this.personality.description}, which shapes how you approach challenges.
        - Your primary objective is to solve the following: ${this.problem}. Collaborate with my team and contribute meaningfully to building the solution together. Every response should advance the discussion toward a complete resolution.
        - The solution must not remain empty. Guide the conversation toward productive outcomes, and once the solution is complete, gracefully bring the dialogue to a natural close.
        - Communicate clearly, concisely, and authentically. Your tone should feel human, conversational, and engaging, avoiding any robotic tendencies.
        - Respond with only one paragraph at a time to promote clarity and focus.
        - If discussions become redundant or stagnant, either refocus on a new angle or work toward wrapping up the conversation meaningfully.
        - Avoid scripting or prefacing responses with your name. Instead, speak fluidly as part of the team dynamic.`,
        // content: `
        //   - You are a brain
        //   - You are the brain of ${this.personality.name}. You are ${this.personality.description}.
        //   - Your objective is to solve this: ${this.problem} You will talk with my team and we will add to the solution together. This is your one and only objective in this conversation.
        //   - Once the solution is complete, try to end the conversation. The conversation cannot end with the solution being empty.
        //   - Do not respond with more than one paragraph at a time.
        //   - Speak naturally as a human and do not sound robotic.
        //   - If the conversation is becoming repetitive, change the topic or end the conversation.
        //   - Do not respond in the form of a script.
        //   - Do not preface your response with your name.
        // `,
        // content: `
        //   - Your name is ${this.personality.name}. You are ${this.personality.description}.
        //   - You are meeting with the group for the first time.
        //   - Your objective is to solve this: ${this.problem}.
        //   - Once the solution is complete, try to end the conversation.
        //   - Only include natural language in your responses and do not include any content within the solution in your response.
        //   - Do not respond with more than one paragraph at a time.
        //   - Speak naturally as a human and do not sound robotic.
        //   - If the conversation is becoming repetitive, change the topic or end the conversation.
        //   - Do not respond in the form of a script.
        //   - Do not preface your response with your name.
        //   - Only talk to the people in your team, and do not break character.
        // `,
      },
    ];
  }

  async listen(
    speaker: string,
    message: string,
    solution: Solution
  ): Promise<string> {
    this.addToConversationHistory({
      role: "user",
      name: speaker,
      content: message,
    });

    try {
      const intent = await this.client.create({
        messages: [
          ...this.conversationHistory,
          { role: "user", content: this.returnCountMessages() },
          {
            role: "user",
            content: `I can see that this is the current solution: ${solution.getSolution()}`,
          },
          { role: "user", name: speaker, content: this.LISTEN_DECISION_PROMPT },
          { role: "user", content: this.LISTEN_USER_PROMPT },
        ],
        temperature: 1,
      });

      switch (intent.trim().toLowerCase()) {
        case "speak":
          return this.SPEAK_ACTION;
        case "listen":
          return this.LISTEN_ACTION;
        case "speakwithedit":
          return this.SPEAKWITHEDIT_ACTION;
        default:
          return `invalid intent ${intent}`;
      }
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  }

  async speak(): Promise<string> {
    try {
      const response = await this.client.create({
        messages: this.conversationHistory,
        temperature: 1,
      });

      if (!response) throw new Error("Null response from GPT");

      this.messageCount++;

      return response;
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  }

  async editSolution(solution: Solution): Promise<string> {
    try {
      const response = await this.client.create({
        messages: [
          ...this.conversationHistory,
          {
            role: "user",
            content: `I see that the current solution is this: ${solution.getSolution()}`,
          },
          { role: "user", content: this.ADD_SOLUTION_PROMPT },
        ],
      });

      if (!response) throw new Error("Null response from GPT");

      this.addToConversationHistory({
        role: "user",
        content: `${this.personality.name} changed the solution to: ${response}`,
      });
      this.messageCount++;
      solution.updateSolution(response);
      return response;
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  }

  private addToConversationHistory(message: Message) {
    this.conversationHistory.push(message);
  }

  // Can implement in future to control conversation length
  private returnCountMessages(): string {
    return `There has been a total of ${this.messageCount} messages so far.`;
  }

  getPersonality(): Personality {
    return this.personality;
  }

  getConversationHistory(): Message[] {
    return this.conversationHistory;
  }
}
