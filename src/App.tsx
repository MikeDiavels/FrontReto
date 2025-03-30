import { Principal } from "./Principal";
import { RetoProvider } from "./Reto";


function App() {
  
  return (
    <>
        <RetoProvider>
            <Principal></Principal>
        </RetoProvider>
    </>
  );
}

export default App;
