import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiCar, BiFile } from 'react-icons/bi'
import { GiHomeGarage } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router'
import { Flex } from '@chakra-ui/react'
import NavItem from './NavItem'

const MenuItems = [
{
  title: "Home",
  icon: GiHomeGarage,
  path: '/dashboard'
},
{
  title: "UserDocuments",
  icon: BiFile,
  path: '/UserDocuments'
},
{
  title: "Vehicles",
  icon: BiCar,
  path: '/Vehicles'
}

]


const SidebarContent = ({navSize}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      w="100%"
      mt={6}
      flexDir="column"
    >
      {
        MenuItems.map((menuItem)=>{
          return <NavItem key={menuItem.title} navSize={navSize} title={t(menuItem.title)} icon={menuItem.icon} onClick={()=>navigate(menuItem.path)} active={location.pathname === menuItem.path ? true:false}/>
        })
      }
    </Flex>
  )
}

export default SidebarContent