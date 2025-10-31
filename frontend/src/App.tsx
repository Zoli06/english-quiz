import {Outlet} from "react-router-dom";
import {Artboard} from "react-daisyui";

function App() {
    return (
        <div className="flex justify-center items-start min-h-screen pt-[30vh]">
            <Artboard className="max-w-3xl relative p-4">
                <Outlet/>
            </Artboard>
        </div>
    );
}

export default App;
