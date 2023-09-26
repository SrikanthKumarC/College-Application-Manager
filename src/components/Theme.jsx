import { Theme } from "@radix-ui/themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import App from "./App.jsx";
import '@radix-ui/themes/styles.css';

export default function () {
  return (
    <html>
      <body>
        <Theme accentColor="mint">
          <App />
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
