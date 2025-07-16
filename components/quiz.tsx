import { useRef } from "react";
import { Textarea } from "./ui/textarea";

export default function Quiz({ question }: { question: string[] }) {
  const answerRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const handleSubmit = () => {
    const answers = answerRefs.current.map(ref => ref?.value );
    console.log("Submitted Answers:", answers);
  };

  return (
    <div className="flex flex-col gap-4">
      {question.map((item, index) => (
        <div key={index}>
          <div className="font-semibold text-xl">
            Q.{index + 1} {item}
          </div>
          <Textarea
            className="h-24 mb-2 w-full"
            placeholder="Write your answer here..."
            ref={el => { answerRefs.current[index] = el; }}
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}
