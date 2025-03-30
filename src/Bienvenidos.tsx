import { useState } from "react";
import { Menu } from "./Menu"

export const Bienvenidos = () =>{
    const [selectedOption, setSelectedOption] = useState<string>("Bienvenido");
    const handleMenuClick = (option: string) => {
        setSelectedOption(option); // Actualiza la opción seleccionada
      };
    
    return(
        <>
            <div>
                <Menu onOptionSelect={handleMenuClick} />
                {/* <Content selectedOption={selectedOption} /> */}
            </div>

        </>
    )
}