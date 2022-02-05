import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const textStyle = {
  noAuthFormTitle:{
    fontSize: ['28px', '36px'],
    fontWeight: 'bold',
    lineHeight: '110%',
  }
}

const shadows={
  outline: "0 0 0 3px rgba(128, 90, 213, 0.6)"
}

const theme = extendTheme({ config,
  textStyles:{...textStyle},
  shadows:{...shadows}
 })

export default theme