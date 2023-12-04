import * as React from "react"
import Routes from "./routes"
import { NextUIProvider } from "@nextui-org/react"
function App() {
  return (
    <>
      <NextUIProvider>
        <React.Fragment>
          <Routes></Routes>
        </React.Fragment>
      </NextUIProvider>
    </>
  )
}

export default App
