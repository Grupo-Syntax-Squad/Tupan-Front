import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 w-full h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-9xl tracking-tight font-extrabold lg:text-[10rem] text-indigo-700 dark:text-indigo-300">
            404
          </h1>
          <p className="mb-4 text-4xl tracking-tight font-bold text-gray-900 md:text-5xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-xl font-light text-gray-500 dark:text-gray-400">
            Ops, Essa página não existe. Enquanto isso, você pode:
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:focus:ring-indigo-900 my-4"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </section>
  );
}