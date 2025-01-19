import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-800 to-teal-600 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20 blur-xl animate-pulse bg-gradient-to-r from-green-400 via-teal-300 to-emerald-500"></div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <Loader className="animate-spin w-16 h-16 text-white" />
        <p className="text-lg font-semibold text-white">Please wait...</p>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-30 top-10 left-10 animate-bounce"></div>
      <div className="absolute w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-bounce delay-75"></div>
    </div>
  );
};

export default Loading;
