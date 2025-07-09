import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create your account
            </h3>
          </div>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
              formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            },
          }}
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </main>
  )
}
