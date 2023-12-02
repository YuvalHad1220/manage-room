import { DragDropProvider, DragDropSensors, createDraggable, createDroppable } from "@thisbeyond/solid-dnd";
import { createSignal } from "solid-js";
import { addPersonToPlace, getCurrentPeopleAndPlaces, getPeople, getPlaces, removePersonFromPlace } from "./localStateHandler";


type tUsage = "PERSON" | "PLACE";

const DraggableView = () => {
  let peopleList = getPeople();
  const peopleOnTheBeginning = peopleList.length;
  const placesList = getPlaces();
  const initialOptions = getCurrentPeopleAndPlaces();

  peopleList = peopleList.filter(person => {
    // Filter out people present in the initialOptions
    return !Object.values(initialOptions).flat().includes(person);
  });


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

      removePersonFromPlace(name, key);
  };


    const DraggableMain = ({fieldId} : {fieldId: string}) => {
        const droppable = createDroppable(fieldId);
        const totalCount = peopleOnTheBeginning;
        return (
        <div use:droppable class="join join-vertical rounded-2xl flex flex-col p-1">
          <p class="join-item font-bold text-white text-xl bg-base-300 p-3">{fieldId} <span class="text-secondary">{(availableOptions()[fieldId].length/totalCount * 100).toFixed(1)}% -- {availableOptions()[fieldId].length}/{totalCount}</span></p>
          <div class="join-item bg-base-300">
            <div class="flex gap-5 m-3">
            {availableOptions()[fieldId].map(name => (
              <button class="btn  btn-outline btn-primary" onClick={() => removeName(fieldId, name)}>
                {name}
              </button>
            ))}
            </div>
          </div>
        </div>
      )
    };


      const DraggableBottom = () => (
        <div class="flex gap-2 flex-wrap bg-base-300 p-2 rounded-2xl justify-center">
        {
        totalPeople().map(name => {
        const draggable = createDraggable(name);
        return <div use:draggable class="btn  btn-outline btn-primary">{name}</div>
          })}
        
        <button class="btn  btn-primary" onClick={() => copyToClipboard()}>העתקה ללוח</button>
        </div>
    );

    const copyToClipboard = () => {
      const text = Object.keys(availableOptions()).map(item => `*${item}*: ${availableOptions()[item].join(", ")}`).join("\n")
      navigator.clipboard.writeText(text);
    };

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
            addPersonToPlace(draggable.id, droppable.id);
            setTotalPeople(prev => prev.filter(name => name !== draggable.id));
        }
    }
    return (
        <DragDropProvider onDragEnd={onDragEnd}>
            <DragDropSensors>
              <div class="touch-none flex flex-col gap-1">
                {placesList.map(placeName => <DraggableMain fieldId={placeName}/>)}
                <DraggableBottom />
              </div>
            </DragDropSensors>
        </DragDropProvider>
    )
    

};

export default DraggableView;