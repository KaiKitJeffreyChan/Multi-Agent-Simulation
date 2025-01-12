import React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

const Info: React.FC = () => {
  const router = useRouter();
  return (
    <div className="sm:p-32 bg-primary h-full p-12 font-shareTechMono text-white">
      <div className="flex justify-between items-center">
        <h1 className="my-4 text-2xl">
          Wow you were curious enough to press this!
        </h1>
        <button
          className="bg-secondary text-xs p-2 rounded"
          onClick={() => router.push("/Home")}
        >
          Back
        </button>
      </div>
      <div className="text-xs">
        TLDR (you&apos;re welcome): This is a multi-agent simulation where you
        can customize multiple agents (create personalized versions of chatGPT
        or any other LLM), assign them a communication method, and give them a
        problem. The agents will then communicate with each other to solve the
        problem! The simulation will end when the problem is solved or the
        agents are unable to solve the problem.
      </div>

      <h1 className="my-4">A more detailed dive</h1>
      <div className="text-xs">
        &quot;These LLMs are so powerful, but I wish I could customize them,
        better yet, get them to work on something together.&quot; After
        stumbling upon the idea of agents, I was really intrigued on the
        possibilities. If one agent could do so much, what could multiple agents
        do? This is where the idea of a multi-agent simulation came to be. The
        idea is simple, create multiple agents, give them a problem, and let
        them communicate with each other to solve the problem. The agents can be
        customized to use different models, communication methods, and
        personalities. The simulation will end when the problem is solved or the
        agents are unable to solve the problem.
      </div>
      <div className="text-xs py-3">
        As you could imagine, the possibilities are endless! You could create a
        team of engineers to solve a programming problem, a cast of screen
        writers to write a script, or even a group of chefs to create a recipe.
        The simulation is a great way to see how different agents can work
        together to solve a problem.
      </div>

      <h1 className="mb-4 mt-10 text-2xl ">How was this built?</h1>
      <div className="text-xs ">
        The main issue with customization of these prebuilt models comes down to
        the prompting (which was a pain). Initially I told each instance of the
        LLM that they were a brain; they would take on the personality and name
        provided to them by the user and then they would be given a problem to
        solve. I would then enter them into a communication method whether that
        be random or[ADD HERE]. I would then use prompts such as the following:
      </div>
      <ul className="list-disc pl-10 my-3 py-5 text-xs bg-secondary rounded text-secHighlight">
        <li>
          I must respond with exactly one of the options, without saying
          anything else [&quot;SPEAK&quot;, &quot;LISTEN&quot;,
          &quot;SPEAKWITHEDIT&quot;].
        </li>
        <li>What would I like to do next?</li>
        <li>I can see that this is the current solution:</li>
      </ul>
      <div className="text-xs ">
        By using prompts like this, I was able to avoid using system prompts
        during conversation which was a problem I was running into when using
        Gemini. Before this iteration I would say the lines above to direct the
        agents. &quot;You must respond with...&quot;, &quot;What would you like
        to do...&quot;. Nonetheless, the results seem to be similar and this was
        more of a personal preference in favor of it working for the free model
        haha.
      </div>
      <div className="text-xs py-3">
        The prompt to initiate the model was straightforward; however, the
        prompt used to facilitate conversation was the kicker. Here is the
        beautiful prompt:
      </div>
      <div className="bg-secondary p-8 text-xs rounded text-secHighlight">
        <span>
          <div className="mb-3">
            I must respond with exactly one of the options, without saying I
            must respond with exactly one of the options, without saying
            anything else [&quot;SPEAK&quot;, &quot;LISTEN&quot;,
            &quot;SPEAKWITHEDIT&quot;]. I&apos;m going to read what each option
            means and respond with what I want to do
          </div>
          <span>Say &quot;SPEAK&quot; if:</span>
          <ul className="list-disc pl-5 my-3">
            <li>
              I want to continue the conversation; the conversation will end if
              all participants say &quot;LISTEN&quot;.
            </li>
            <li>I have something new to say or a new idea to introduce.</li>
            <li> I want to speak without changing the solution. </li>
            <li> I want to ask a question or make a statement.</li>
            <li>
              I want to clarify or elaborate on a point without changing the
              solution yet.
            </li>
            <li>I want to respond to a question or comment.</li>
          </ul>
          <span>Say &quot;LISTEN&quot; if:</span>
          <ul className="list-disc pl-5 my-3">
            <li> I am bored or don&apos;t find the topic interesting.</li>
            <li> The conversation is wrapping up.</li>
            <li> I have nothing new to say.</li>
            <li>
              The conversation has been going on for a while; I get tired the
            </li>
          </ul>
          <span>Say &quot;SPEAKWITHEDIT&quot; if:</span>
          <ul className="list-disc pl-5 my-3">
            <li>
              I am considering contributing a solution or improving upon an
              existing one.
            </li>
            <li>
              The current solution is incomplete or could be enhanced with a
              better idea or perspective.
            </li>
            <li>
              Someone else in the group has shared an idea worth incorporating,
              and I want to highlight or integrate it.
            </li>
            <li>
              There is consensus or discussion that suggests the solution needs
              to evolve or change.
            </li>
            <li>
              I want to refine, clarify, or optimize the solution to make it
              more effective.
            </li>
          </ul>
        </span>
      </div>
      <div className="text-xs py-3">
        I called this the LISTEN prompt as it was given to each agent after
        feeding them the most recent message sent. This way each model was able
        to make a decision on what to do next (what I think is an unconscious
        decision we do when we have human conversations). Depending on the
        communication method, this prompt is used to direct the conversation in
        a way humans would have a conversation, in hopes the agents will work
        together in solving the problem at hand.
      </div>
      <div className="text-xs py-3">
        This project was built using Next.js, TypeScript, Tailwind CSS, and
        Socket.IO. The project is hosted on Vercel and the code is available on
        GitHub. The project currently uses gemini-1.5-flash API to generate
        responses for the agents. The project uses Socket.IO to create a
        real-time connection between the client and server. The project uses
        Tailwind CSS for styling and Next.js for routing.
      </div>
      <h1 className="mb-4 mt-10 text-2xl">How well does it do?</h1>
      <div className="text-xs py-3">
        So obviously this is a work in progress but the idea is to have the
        agents create something better than what a single instance of the given
        LLM can do. As a programmer myself, I of course had to get them to do
        some leetcode problems lmao. The results were interesting, the agents
        seemed to perform better on complicated problems. For the following two
        instances these were the agents I created:
      </div>
      <div className="bg-secondary p-8 text-xs rounded text-secHighlight">
        <span>
          <div className="mb-3">
            Steven: <br /> You are an expert software developer who can write
            robust code that meets all the requirements without going overboard
            with unnecessary details. You like to talk when the problem is
            unsolved but once the solution is established, you want to stop
            talking.
          </div>
          <div className="mb-3">
            Bob: <br />
            You are a senior software engineer and have done every single
            Leetcode problem ever, you know lots of algorithms and are
            comfortable with challenges. You like to talk when the problem is
            unsolved but once the solution is established, you want to stop
            talking.
          </div>
        </span>
        <div>
          Note: They are both built on gpt-4o-mini which is also the model used
          for the single instance tests.
        </div>
      </div>
      <div className="text-xs pt-3 pb-10">
        The problem I gave them was a leetcode problem that I had solved before
        (I am not that good at leetcode). The problem was one asked quite often
        by Google &quot;729. My Calendar I&quot;. I copied and pasted the entire
        question to the agents, and to a single instance of the unprompted
        gpt-4o-mini model. Here are the results:
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>
            <span className="bg-secondary">
              gpt-4o-mini Results (187ms; Beats 41.54%):
            </span>
          </h2>
          <ReactMarkdown className="text-xs overflow-auto no-scrollbar flex flex-col">
            {`
      class MyCalendar:
        def __init__(self):
            # This will store the list of events as (startTime, endTime) tuples
            self.events = []

        def book(self, startTime: int, endTime: int) -> bool:
            # Check if the new event overlaps with any existing event
            for event in self.events:
          existingStart, existingEnd = event
          if existingStart < endTime and startTime < existingEnd:
              return False
        
            self.events.append((startTime, endTime))
            return True
          `}
          </ReactMarkdown>
        </div>
        <div>
          <h2>
            {" "}
            <span className="bg-secondary">
              Agents Results (45ms; Beats 96.60%):
            </span>
          </h2>
          <ReactMarkdown className="text-xs overflow-auto no-scrollbar flex flex-col">
            {`
      import bisect

      class MyCalendar(object):
          def __init__(self):
              self.events = []

          def book(self, starttime, endtime):
              i = bisect.bisect_left(self.events, (starttime, endtime))
              if (i > 0 and self.events[i-1][1] > starttime) or (i < len(self.events) and self.events[i][0] < endtime):
                  return False
              self.events.insert(i, (starttime, endtime))
              return True
          `}
          </ReactMarkdown>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>
            <span className="bg-secondary">
              gpt-4o-mini Results (3948ms; Beats 36.00%):
            </span>
          </h2>
          <ReactMarkdown className="text-xs overflow-auto no-scrollbar flex flex-col">
            {`
from collections import deque

class Solution(object):
    def racecar(self, target):

        # BFS queue: stores (position, speed, steps)
        queue = deque([(0, 1, 0)])
        visited = set((0, 1))  # Set to track visited (position, speed) pairs

        while queue:
            position, speed, steps = queue.popleft()

            # If we have reached the target position, return the number of steps
            if position == target:
                return steps

            # 1. Try to accelerate (A): new position and speed
            new_position = position + speed
            new_speed = speed * 2
            if (new_position, new_speed) not in visited:
                visited.add((new_position, new_speed))
                queue.append((new_position, new_speed, steps + 1))

            # 2. Try to reverse (R): flip the direction of speed
            new_speed = -1 if speed > 0 else 1
            if (position, new_speed) not in visited:
                visited.add((position, new_speed))
                queue.append((position, new_speed, steps + 1))

          `}
          </ReactMarkdown>
        </div>
        <div>
          <h2>
            {" "}
            <span className="bg-secondary">
              Agents Results (1017ms; Beats 44.00%):
            </span>
          </h2>
          <ReactMarkdown className="text-xs overflow-auto no-scrollbar flex flex-col">
            {`
from collections import deque

class Solution(object):
    def racecar(self, target):

        # BFS queue: (position, speed, steps)
        queue = deque([(0, 1, 0)])
        visited = set()  # Set to track visited (position, speed) pairs
        max_position = 2 * target  # Limit the explored positions to avoid unnecessary computation

        while queue:
            position, speed, steps = queue.popleft()

            # If we have reached the target position, return the number of steps
            if position == target:
                return steps

            # Accelerate: move to a new position with double the speed
            new_position = position + speed
            new_speed = speed * 2
            if abs(new_position) <= max_position and (new_position, new_speed) not in visited:
                visited.add((new_position, new_speed))
                queue.append((new_position, new_speed, steps + 1))

            # Reverse: change direction of speed
            new_speed = -1 if speed > 0 else 1
            if (position, new_speed) not in visited:
                visited.add((position, new_speed))
                queue.append((position, new_speed, steps + 1))

          `}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Info;
