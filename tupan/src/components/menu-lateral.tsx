import Link from "next/link";
import Image from "next/image";
import LOGO from "../../public/tupan-logo1.svg";
export default function MenuLateral() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div className="min-h-screen flex flex-row bg-gray-100">
        <div className="flex flex-col w-56 bg-indigo-500/10 overflow-hidden">

          {/* Logo */}
          <div className="flex items-center justify-center h-20 shadow-md">
            <Image src={LOGO} alt="Logo" width={150} height={100} />
          </div>

          {/* Menu */}
          <ul className="flex flex-col py-4">
            {/* Estações */}
            <li>
              <Link href="estacoes"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Estações</span>
              </Link>
            </li>

            {/* Parâmetros */}
            <li>
              <Link href="parametros"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bxs-thermometer"></i>
                </span>
                <span className="text-sm font-medium">Parâmetros</span>
              </Link>
            </li>

            {/* Alertas */}
            <li>
              <Link href="alertas"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-alarm-exclamation"></i>
                </span>
                <span className="text-sm font-medium">Alertas</span>
              </Link>
            </li>

            {/* Usuários */}
            <li>
              <Link href="usuarios"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-user"></i>
                </span>
                <span className="text-sm font-medium">Usuários</span>
              </Link>
            </li>

            {/* Educacional */}
            <li>
              <Link href="educacional"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-book"></i>
                </span>
                <span className="text-sm font-medium">Educacional</span>
              </Link>
            </li>

            <br></br>

            {/* Logout */}
            <li>
              <Link href="/"
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-indigo-500 hover:text-indigo-800"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
