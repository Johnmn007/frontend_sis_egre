import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {DataProvider} from './context/Context'
import PrivateRoute from "./components/PrivateRoute";
// import { AuthProvider } from "./components/Context/auth";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./components/Dashboard";

import Index from "./views";

// import ListEgresados from "./views/graduate/ListEgresados";
// import AddGraduate from "./views/graduate/AddNewGraduado";
// import AddStudent from "./components/Student/AddStudent";
// import EditStudent from "./components/Student/EditStudent";
// import EditGraduate from "./views/graduate/EditGraduado";

// import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import GraduateProfession from "./views/graduate/GraduateProfession";
import TitleProfession from "./views/title/TitleProfession";
import TecProfession from "./views/TecProfession";

import AddNewGraduate from "./views/graduate/AddNewGraduate";
import EditGraduate2 from "./views/graduate/EditGraduate2";
// import GestionManagement from "./views/GestionManagemente";
// import Graficos from "./views/Graficos";

// import AddTecProf from "./components/TecProf/addTecProf";
// import EditTecProf from "./components/TecProf/editTecProf";



// import Botones from "./components/botones";
import LoginPage from "./views/Login";
import RegisterForm from "./features/Login/RegisterForm";

import GraduateProfile from "./views/GraduateProfile";

import AddTitleForm from "./features/Graduate/add/AddTitleForm";
import EditTitleFrom from "./views/title/EditTitle";

import Modalidades from "./views/modalidades/Modalidades";

import AddProfession from "./views/addProfession/addProfession";
import EditTecProf from "./views/addProfession/editTecProf";

import addModalidades from "./views/addModalidades/addModalidades";
import AddModalidades from "./views/addModalidades/addModalidades";

import AddSeguimientoForm from "./views/seguimiento/AddSeguimiento";
import ListUsuarios from "./views/usuarios/ListUsuarios";
import EditUser from "./features/Login/EditLogin";
import ListRol from "./views/roles/RolesList";
import EditRol from "./views/roles/EditRol"

import List from "./views/seach/List";
import ViewStudent from "./views/seach/ViewStudent";
import EditModalidad from "./views/addModalidades/EditModalidad";

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    {/* <Route path="/Botones" element={<Botones />} /> */}

                    <Route path="/Home" element={<PrivateRoute><Index Content={GraduateProfile} /></PrivateRoute>} />
                    <Route path="/Dashboard" element={<PrivateRoute><Index Content={Dashboard} /></PrivateRoute>} />
                    


                    <Route path="/GraduateProfession/:id" element={<PrivateRoute><Index Content={GraduateProfession} /></PrivateRoute>} />
                    <Route path="/TitlesProfession/:id" element={<PrivateRoute><Index Content={TitleProfession} /></PrivateRoute>} />

                    <Route path="/GraduatesAdd" element={<PrivateRoute><Index Content={AddNewGraduate} /></PrivateRoute>} />
                    <Route path="/EditGraduate/:id" element={<PrivateRoute><Index Content={EditGraduate2} /></PrivateRoute>} />

                    <Route path="/TitlesAdd/:id" element={<PrivateRoute><Index Content={AddTitleForm} /></PrivateRoute>} />
                    <Route path="/TitlesEdit/:id" element={<PrivateRoute><Index Content={EditTitleFrom} /></PrivateRoute>} />

                    <Route path="/SeguimientoAdd/:id" element={<PrivateRoute><Index Content={AddSeguimientoForm} /></PrivateRoute>} />

                    <Route path="/TecProfession" element={<PrivateRoute><Index Content={TecProfession} /></PrivateRoute>} />
                    <Route path="/modalidades/Modalidades" element={<PrivateRoute><Index Content={Modalidades} /></PrivateRoute>} />

                    <Route path="/addProfession/addProfession" element={<PrivateRoute><Index Content={AddProfession} /></PrivateRoute>} />
                    <Route path="/TecProfession/editProfession/:id" element={<PrivateRoute><Index Content={EditTecProf} /></PrivateRoute>} />

                    <Route path="/addModalidades/addModalidades" element={<PrivateRoute><Index Content={AddModalidades} /></PrivateRoute>} />
                    <Route path="/modalidades/edit/:id" element={<PrivateRoute><Index Content={EditModalidad} /></PrivateRoute>} />

                    <Route path="/Administrador/userList" element={<Index Content={ListUsuarios} />} />
                    <Route path="/Administrador/usuarioAdd" element={<Index Content={RegisterForm} />} />
                    <Route path="/Administrador/userEdit/:id" element={<Index Content={EditUser} />} />

                    <Route path="/Administrador/RolesList" element={<Index Content={ListRol} />} />
                    <Route path="/Administrador/rolEdit/:id" element={<Index Content={EditRol} />} />

                    <Route path="/List" element={<Index Content={List} />} />
                    <Route path="/StudentView/:id" element={<Index Content={ViewStudent} />} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;