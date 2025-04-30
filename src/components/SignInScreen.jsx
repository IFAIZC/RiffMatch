// src/components/SignInScreen.js
export default function SignInScreen({ onSignUp }) {
  return (
    <div className="flex items-center justify-center min-h-screen h-screen flex-wrap bg-gradient-to-bl from-grey-500 to-indigo-600">
      <div className="flex w-2/5 justify-center flex-col">
        <h1 className="text-9xl font-bold ">RIFF</h1>
        <h1 className="text-9xl font-bold">MATCH</h1>
      </div>


      <div className="w-100 flex justify-center items-center flex-row rounded-3xl bg-white/45 h-130 shadow-2xl">
        <button
          onClick={onSignUp}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
