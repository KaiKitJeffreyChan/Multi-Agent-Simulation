import React from "react";

interface AgentPropsI {
  name: string;
  description: string;
  removeAgent: (name: string, description: string) => void;
}

const Agent: React.FC<AgentPropsI> = ({ name, description, removeAgent }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <div
      key={name}
      className="flex relative flex-col text-secHighlight mr-2 px-2 bg-secondary rounded hover:bg-primHighlight"
      onMouseEnter={() => setTimeout(() => setShowPopup(true), 200)}
      onMouseLeave={() => setTimeout(() => setShowPopup(false), 200)}
    >
      <p>{name}</p>
      {showPopup && (
        <div
          className="absolute bottom-[-7px] right-[-8px] z-40 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => removeAgent(name, description)}
        >
          <span className="text-white text-xs">x</span>
        </div>
      )}

      {showPopup && (
        <div
          className="absolute bottom-7 overflow-y-scroll border no-scrollbar h-12 w-52 left-0 bg-secondary p-2 rounded text-xs"
          onMouseEnter={() => setTimeout(() => setShowPopup(true), 200)}
          onMouseLeave={() => setTimeout(() => setShowPopup(false), 200)}
        >
          <p>Description: {description}</p>
        </div>
      )}
    </div>
  );
};

export default Agent;
