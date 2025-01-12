import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const submitAgent = (name: string, description: string) => {
    // this needs to be formatted to be used as a key in the backend Open ai fails with spaces in names
    const formattedName = name.replace(/\s+/g, "_");
    setAgents([...agents, { name: formattedName, description }]);
  };

  // Remove an agent from the list
  const removeAgent = (name: string, description: string) => {
    setAgents(
      agents.filter(
        (agent) => agent.name !== name || agent.description !== description
      )
    );
  };

  // Submit form with dynamic extra data
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

    router.push("/Simulation");

    try {
      const response = await axios.post("/api/simulation", data);
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
  };
};

export default useForm;
