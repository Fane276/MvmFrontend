import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiGasPump, BiWrench } from 'react-icons/bi'
import { FiCalendar, FiFileText, FiHome } from 'react-icons/fi'
import { Flex } from '@chakra-ui/react'
import NavItem from './NavItem'

const MenuItems = [
{
  title: "Home",
  icon: FiHome,
},
{
  title: "DocumentsManagement",
  icon: FiFileText,
},
{
  title: "FuelEconomy",
  icon: BiGasPump,
},
{
  title: "ServiceHistory",
  icon: BiWrench,
},

]


const SidebarContent = ({navSize}) => {
  const { t } = useTranslation();

  return (
    <Flex
      w="100%"
      mt={6}
      flexDir="column"
    >
      {
        MenuItems.map((menuItem)=>{
          return <NavItem key={menuItem.title} navSize={navSize} title={t(menuItem.title)} icon={menuItem.icon}/>
        })
      }
      <NavItem navSize={navSize} title="Active menu item" icon={FiCalendar} active/>
    </Flex>
  )
}

export default SidebarContent