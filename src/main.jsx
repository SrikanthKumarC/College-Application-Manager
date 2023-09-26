import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "../src/components/App";
import { ThemeProvider } from "../src/ThemeProvider";
import { Theme } from "@radix-ui/themes";
import CollegeProvider from "../src/providers/CollegeProvider";
import "@radix-ui/themes/styles.css";
// import { Theme, ThemePanel } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CollegeProvider>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Theme accentColor="mint" grayColor="sand" radius="medium" scaling="100%">
        {/* <Theme appearance="dark" accentColor="yellow" grayColor="sand" scaling="105%"> */}
        <App />
      </Theme>
    </ThemeProvider>
  </CollegeProvider>
  </React.StrictMode>,
)
