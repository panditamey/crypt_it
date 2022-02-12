export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <h1 className="Error text-center text-white">
        {message}
      </h1>
    );
  }
  