import { Button } from "./ui/button";

// components/Popup.tsx
type PopupProps = {
    onClose: () => void;
    totalQuestion : number | string
    correctAnswer : number | string
  };
  
  export default function Popup({ onClose ,totalQuestion,correctAnswer}: PopupProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <div className=" rounded-xl shadow-lg p-6 w-[90%] max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Custom Popup</h2>
          <p>{correctAnswer}/{totalQuestion}</p>
  
          <Button
            onClick={onClose}
            className="mt-6 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
  