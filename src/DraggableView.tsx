import { DragDropProvider, DragDropSensors, createDraggable, createDroppable } from "@thisbeyond/solid-dnd";
import { createSignal } from "solid-js";

const peopleList = ["יובל הדר", "אלירן שדה", "אלירן לוי"];
const placesList = ["מטבח", "שירותים", "אנא עארף"];


const DraggableView = () => {
    const initialOptions = Object.fromEntries(placesList.map(key => [key, []]));
    console.log("rerender");
    const [totalPeople, setTotalPeople] = createSignal<string[]>(peopleList);
    const [availableOptions, setAvailableOptions] = createSignal<{[key: string]: string[]}>(initialOptions);

    const removeName = (key: string, name: string) => {
        setTotalPeople(prev => [...prev, name]);
    
        setAvailableOptions(prev => {
            // Create a new object to avoid mutating the state directly
            const updatedOptions = { ...prev };
    
            // Check if the specified key exists
            if (updatedOptions.hasOwnProperty(key)) {
                // Filter out the specified name from the specified key
                updatedOptions[key] = updatedOptions[key].filter(prevName => prevName !== name);
            }
    
            return updatedOptions;
        });
    };


    const DraggableMain = ({fieldId} : {fieldId: string}) => {
        const droppable = createDroppable(fieldId);
        return (
        <div use:droppable class="join join-vertical w-full h-full flex flex-col p-3">
          <p class="join-item font-bold text-white bg-success p-3">{fieldId}</p>
          <div class="join-item bg-gray-600 grow">
            <div class="flex gap-5 m-3">
            {availableOptions()[fieldId].map(name => (
              <button class="btn bg-white p-3 text-black" onClick={() => removeName(fieldId, name)}>
                {name}
              </button>
            ))}
            </div>
          </div>
        </div>
      )
    };


      const DraggableBottom = () => (
        <div class="flex gap-5 bg-gray-700 p-2 rounded-2xl justify-center">
        {totalPeople().map(name => {
        const draggable = createDraggable(name);
          return <div use:draggable class="rounded-2xl bg-white p-2 text-black">{name}</div>
        })}
        </div>
    );


    const onDragEnd = ({draggable, droppable}: {draggable: any, droppable: any}) => {
        if (draggable && droppable){
            setAvailableOptions(prev => {
                // Create a new array to avoid mutating the state directly
                const updatedNames = { ...prev };
            
                // Check if the droppable.id exists in the array
                if (!updatedNames.hasOwnProperty(droppable.id)) {
                    // If it doesn't exist, create a new array for the droppable.id
                    updatedNames[droppable.id] = [];
                }
            
                // Add the draggable.id to the corresponding array
                updatedNames[droppable.id] = [...updatedNames[droppable.id], draggable.id];
            
                return updatedNames;
            });
            setTotalPeople(prev => prev.filter(name => name !== draggable.id))
        }
    }
    return (
        <DragDropProvider onDragEnd={onDragEnd}>
            <DragDropSensors>
            {placesList.map(placeName => <DraggableMain fieldId={placeName}/>)}
            <DraggableBottom />
            </DragDropSensors>
        </DragDropProvider>
    )
    

};

export default DraggableView;