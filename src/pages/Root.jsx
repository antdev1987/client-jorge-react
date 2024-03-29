import { Link, Outlet, useNavigate } from "react-router-dom";
import UserAvatar from "../images/user-avatar.png";
import AppContext from "../context/AppProvider";
import { HiDotsVertical } from "react-icons/hi";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const Root = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
    setUserInfo({});
    localStorage.removeItem("userInfo");
    toast.success("Cerrado sesión exitosamente!");
  };

  return (
    <div className="flex flex-col h-[100vh]">
      {/* Navbar / Menu */}
      <nav className="bg-[#3a7fc2] text-white sm:py-2 py-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center md:px-0 px-4">
            {/* Logo */}
            <Link to={"/"}>
              <h2 className="roboto-bold sm:text-start text-center italic uppercase text-lg tracking-widest">
                {/* Actualización de Información */}
                COLEGIADOS
              </h2>
            </Link>

            {/* Dropdown */}
            <div className="flex justify-center items-center">
              {userInfo.token && (
                <>
                  <div className="relative">
                    <button
                      id="dropdownInformationButton"
                      data-dropdown-toggle="dropdownInformation"
                      className="text-white font-medium rounded-lg text-sm px-5 py-2 text-center bg-transparent items-center"
                      type="button"
                      onClick={() => setShowDropDown(!showDropDown)}
                    >
                      {/* <img
                        className="w-[3rem] h-[3rem] rounded-full object-cover"
                        src={userInfo?.perfilImagen || UserAvatar}
                      /> */}
                      <HiDotsVertical className="text-[1.6rem]" />
                    </button>

                    {showDropDown && (
                      <>
                        {createPortal(
                          <div
                            onClick={() => setShowDropDown(!showDropDown)}
                            className="h-[100vh] fixed top-0 w-full"
                          ></div>,
                          document.body
                        )}
                        <div
                          onClick={() => setShowDropDown(false)}
                          id="dropdownInformation"
                          className="z-10 absolute top-[100%] right-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="capitalize">
                              {userInfo?.primerNombre}
                            </div>
                            <div className="font-medium truncate">
                              {userInfo?.email}
                            </div>
                          </div>

                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownInformationButton"
                          >
                            <li>
                              <Link
                                to={"/perfil"}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Perfil
                              </Link>
                            </li>

                            <li>
                              <Link
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                to={`/consulta-publica`}
                              >
                                Consulta
                              </Link>
                            </li>

                            {userInfo.isAdmin && (
                              <>
                                <li>
                                  <Link
                                    to={"/gestionar-usuarios"}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Gestionar Usuarios
                                  </Link>
                                </li>
                              </>
                            )}
                          </ul>

                          <div className="py-2">
                            <Link
                              onClick={handleLogOut}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Cerrar Sesión
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Interchangeable content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#3a7fc2] text-white">
        <div className="container mx-auto">
          <p className="text-center font-bold py-4">
            Todos los derechos reservados &copy; 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Root;
