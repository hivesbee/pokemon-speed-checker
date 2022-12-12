import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // TODO: テーマ設定を行います
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: 'rgba(0, 0, 0, 0.23)'
        }),
        groupedText: ({ theme }) => ({
          color: 'rgba(0, 0, 0, 0.54)'
        })
      }
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       color: 'rgba(0, 0, 0, 0.54)'
    //     })
    //   }
    // }
  }
})

export default theme
