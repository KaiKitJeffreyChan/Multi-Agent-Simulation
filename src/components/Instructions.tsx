import React from "react";

interface InstructionsPropsI {
  setShowInstructions: (show: boolean) => void;
}

const Instructions: React.FC<InstructionsPropsI> = ({
  setShowInstructions,
}) => {
  return (
    <div className="absolute p-10 gap-y-2 flex flex-col justify-between text-secHighlight font-shareTechMono rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:h-3/5 md:w-3/5 h-3/4 w-3/4 opacity-1 bg-secondary flex z-50">
      <div
        className="absolute top-[-7px] right-[-7px] cursor-pointer bg-red-500 w-6 h-6 flex items-center justify-center hover:bg-red-400 rounded-full text-white"
        onClick={() => setShowInstructions(false)}
      >
        ×
      </div>
      <h1 className="text-lg">
        Instructions cause ik you gonna mess this up...
      </h1>
      <ol className="list-decimal pl-10 flex flex-col gap-y-2">
        <li>
          Fill in the name and descriptions of every agent you want. <br />
          Keep them appropriate or the simulation will fail. <br />
          You can have up to 5 agents, however it will work as long as you have
          two. Be imaginative with the names and descriptions,{" "}
          <span className="bg-secHighlight text-black">
            the better you prompt them, the better the solution will be.
          </span>
        </li>
        <li>
          Fill in a problem that you want the agents to solve. <br />
        </li>
        <li>Hit simulate and see the conversation unfold!!</li>
      </ol>

      <p className="text-xs">
        PS: Working on methods of communication which you will be able to toggle
        aswell, currently the way they converse is random, you dont know who is
        going to speek, just like how normal conversations work!
      </p>
    </div>
  );
};

export default Instructions;
