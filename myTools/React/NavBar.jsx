import { Box, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const links = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Agregar',
            link: '/agregar'
        },
        {
            name: 'Contacto',
            link: '/contacto'
        },
        {
            name: 'Acerca',
            link: '/acerca'
        }
    ]
    const [show, setshow] = useState(false);
    return (
        <Box boxShadow={4} className="h-[6vh] flex justify-between w-[100vw] sticky ">
            <Box className=" w-[20%] flex justify-center items-center " >
                <Typography variant="h4" className="text-md" >Logo</Typography>
            </Box>

            <Box className={`md:w-[70%]  flex justify-center items-center md:opacity-100
                            md:static absolute top-0 w-[100vw] h-[100vh]
                            md:h-auto bg-rose-800 md:bg-white md:text-black
                            text-white flex-col md:flex-row duration-700 ease-in-out ${show ? 'top-15' : 'top-[-100vh]'}`}>
                {
                    links.map((item) => (
                        <Link to={item.link} onClick={() => { setshow(!show) }}
                            className="md:px-4 md:py-2 md:mr-8 focus:bg-rose-400
                                focus:text-white rounded-3xl
                                hover:bg-rose-400 ease-in-out duration-500
                                hover:text-white w-[90%]  flex justify-center 
                                md:w-auto my-8 py-2" >
                            {item.name}
                        </Link>
                    ))

                }

            </Box>


            <Box className="md:hidden cursor-pointer flex justify-center items-center">
                <Button onClick={() => { setshow(!show) }} ><MenuIcon className={`font-medium ${show ? 'text-white' : 'text-black'}`} /></Button>
            </Box>
        </Box>
    )
};
