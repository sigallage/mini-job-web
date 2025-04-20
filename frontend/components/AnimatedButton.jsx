export default function AnimatedButton({ text = 'Submit' }) {
    return (
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
      >
        {text}
      </button>
    );
  }
  