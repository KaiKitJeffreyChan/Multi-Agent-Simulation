import { useState, useCallback } from "react";
import axios from "axios";

export interface AgentI {
  name: string;
  description: string;
}

const useForm = () => {
  const [agents, setAgents] = useState<AgentI[]>([]);
  const [problem, setProblem] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  /**
   * Adds a new agent to the list.
   * Name is formatted to remove spaces.
   */
  const submitAgent = useCallback((name: string, description: string) => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description cannot be empty.");
      return;
    }
    const formattedName = name.replace(/\s+/g, "_");
    setAgents((prevAgents) => [
      ...prevAgents,
      { name: formattedName, description },
    ]);
    setName("");
    setDescription("");
  }, []);

  /**
   * Removes an agent from the list.
   */
  const removeAgent = useCallback((name: string, description: string) => {
    setAgents((prevAgents) =>
      prevAgents.filter(
        (agent) => agent.name !== name || agent.description !== description
      )
    );
  }, []);

  /**
   * Submits the form with agent data and problem statement.
   * Handles errors and loading states properly.
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setError(null);

      if (agents.length < 2) {
        setError("Please add at least two agents.");
        setLoading(false);
        return;
      }

      if (!problem.trim()) {
        setError("Problem statement cannot be empty.");
        setLoading(false);
        return;
      }

      const data = {
        model: "GeminiAIChat",
        agents,
        communicationMethod: "",
        problem,
      };

      try {
        const response = await axios.post("/api/simulation", data);
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [agents, problem]
  );

  return {
    agents,
    problem,
    loading,
    error,
    name,
    description,
    handleSubmit,
    submitAgent,
    removeAgent,
    setProblem,
    setName,
    setDescription,
  };
};

export default useForm;
