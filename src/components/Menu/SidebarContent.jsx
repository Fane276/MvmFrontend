import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiGasPump, BiWrench } from 'react-icons/bi'
import { FiFileText, FiHome } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router'
import { Flex } from '@chakra-ui/react'
import NavItem from './NavItem'

const MenuItems = [
{
  title: "Home",
  icon: FiHome,
  path: '/dashboard'
},
{
  title: "DocumentsManagement",
  icon: FiFileText,
  path: '/Documents'
},
{
  title: "FuelEconomy",
  icon: BiGasPump,
  path: '/GasEconomy'
},
{
  title: "ServiceHistory",
  icon: BiWrench,
  path: '/Service'
},

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