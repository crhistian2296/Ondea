import { THEME_STORAGE_KEY } from "@/lib";

export function ThemeScript() {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var key=${key};var raw=localStorage.getItem(key);var theme="light";if(raw){if(raw==="light"||raw==="dark"){theme=raw;}else{var parsed=JSON.parse(raw);if(parsed&&parsed.state&&parsed.state.theme){theme=parsed.state.theme;}}}document.documentElement.classList.toggle("dark",theme==="dark");}catch(e){}})();`,
      }}
    />
  );
}
