// src/components/SignInScreen.js
export default function SignInScreen({ onSignUp }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={onSignUp}
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Sign In With Google
      </button>
    </div>
  );
}
