import { useEffect, useState } from "react";
import Agent from "./components/Agent";
import useForm from "./hooks/useForm";
import Instructions from "./components/Instructions";

const FormComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  // Custom hook initialization with form state
  const {
    agents,
    problem,
    loading,
    error,
    name,
    description,
    submitAgent,
    removeAgent,
    setProblem,
    handleSubmit,
    setName,
    setDescription,
  } = useForm();

  // Clear message after 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessage("");
    }, 3000);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="relative min-h-screen bg-primary">
      {showInstructions ? (
        <Instructions setShowInstructions={setShowInstructions} />
      ) : null}
      <div
        className={`sm:p-32 min-h-screen px-10 py-24 flex flex-col text-secHighlight font-shareTechMono ${
          showInstructions ? "opacity-60" : ""
        }`}
      >
        <div className="flex items-center flex-wrap cursor-default gap-y-1">
          <p className="text-secHighlight text-lg mr-2">Current Cast:</p>
          {agents.map((agent) => (
            <Agent
              key={`${agent.name}-${agent.description}`}
              name={agent.name}
              description={agent.description}
              removeAgent={removeAgent}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-secHighlight">
            {agents.length >= 5 ? (
              <p className="my-6">
                We do not allow more agents at the time, sorry!
              </p>
            ) : (
              <div>
                <div className="flex flex-col mb-4">
                  <label className="my-1">Name:</label>
                  <input
                    className="bg-secHighlight outline-none rounded-sm p-2 text-black"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="my-1">Description:</label>
                  <textarea
                    className="bg-secHighlight p-2 h-32 resize-none text-black rounded-sm outline-none"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs bg-red-500 px-2">{message}</div>
                  <button
                    type="button"
                    onClick={() => {
                      if (name && description) {
                        submitAgent(name, description);
                        setName("");
                        setDescription("");
                      } else {
                        setMessage("Please fill out all fields!!!");
                      }
                    }}
                    className="my-3 px-3 py-1 rounded bg-secondary hover:bg-primHighlight hover:text-white"
                  >
                    Add Agent
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <label className="my-1">Problem Statement:</label>
              <textarea
                className="bg-secHighlight p-2 h-32 resize-none text-black rounded-sm outline-none"
                id="problem"
                name="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="button my-3 bg-secondary px-3 py-1 w-full rounded hover:bg-primHighlight hover:text-white"
          >
            RUN IT{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
