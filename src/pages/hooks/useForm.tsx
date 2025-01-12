import { useState } from "react";
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitAgent = (name: string, description: string) => {
    const formattedName = name.replace(/\s+/g, "_");
    setAgents([...agents, { name: formattedName, description }]);
  };

  const removeAgent = (name: string, description: string) => {
    setAgents(
      agents.filter(
        (agent) => agent.name !== name || agent.description !== description
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      model: "GeminiAIChat",
      agents,
      communicationMethod: "",
      problem,
    };

    try {
      const response = await axios.post("/api/simulation", data);
      setIsSubmitted(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    agents,
    problem,
    loading,
    error,
    handleSubmit,
    submitAgent,
    removeAgent,
    setProblem,
    setAgents,
    name,
    setName,
    description,
    setDescription,
    isSubmitted,
  };
};

export default useForm;
