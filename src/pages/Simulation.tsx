import React, { useEffect, useState } from "react";
import ClientIO, { Socket } from "socket.io-client";
import ReactMarkdown from "react-markdown";

interface Message {
  speaker: string;
  message: string;
  intent: string;
  solution: string;
}

interface Data {
  model: string;
  communicationMethod: string;
  personalities: { name: string; description: string }[];
  problem: string;
}

const Simulation: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageStream, setMessages] = useState<Message[]>([]);
  const [solution, setSolution] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const messageContainer = document.getElementById("messageContainer");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messageStream]);

  useEffect(() => {
    const newSocket = ClientIO();
    setSocket(newSocket);

    newSocket.on("message", (response: Message) => {
      setMessages((prev) => [...prev, response]);
    });

    newSocket.on("solution", (finalSolution: string) => {
      setSolution(finalSolution);
    });

    newSocket.on("disconnect", () => {
      setIsComplete(true);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); // No dependencies needed here

  return (
    <div className="h-full bg-primary font-shareTechMono text-white ">
      <div className="grid grid-cols-[50%_50%]">
        <div className="h-screen col-span-1 overflow-hidden p-10">
          <div
            className="overflow-y-auto no-scrollbar bg-secondary h-full rounded"
            id="messageContainer"
          >
            <div className="p-5">
              {messageStream.map((msg: Message, index: number) => (
                <div className="mb-5" key={index}>
                  <strong>{msg.speaker}:</strong>
                  <div className="text-xs">
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isComplete ? null : (
                <div className="loading">Loading Messages</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 p-10">
          <h2>Solution:</h2>
          <div className="overflow-auto no-scrollbar text-wrap my-5">
            <p className="text-xs">
              {solution && <ReactMarkdown>{solution}</ReactMarkdown>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
