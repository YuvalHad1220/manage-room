import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    createDroppable,
    DragEventHandler,
  } from "@thisbeyond/solid-dnd";
import { Show, createSignal } from "solid-js";

  
  const Draggable = ({id}: {id: string}) => {
    const draggable = createDraggable(id);
    return (<div use:draggable class="text-lg font-bold bg-white rounded-2xl p-3">יובל הדר</div>);
  };


  const Droppable = (props) => {
    const droppable = createDroppable(props.id);
    return (
        <div use:droppable class="flex flex-col gap-4 h-full w-full">
            <p class="text-lg font-bold text-white">שירותים</p>
            <div class="grow bg-white rounded-2xl"/>
            {props.children}
        </div>
    )
  };

  const Sandbox = () => {
    const [where, setWhere] = createSignal("outside");
    const onDragEnd: DragEventHandler = ({ droppable }) => {
        if (droppable) {
          setWhere("inside");
        } else {
          setWhere("outside");
        }
      };

    return (
        <DragDropProvider onDragEnd={onDragEnd}>
            <DragDropSensors>
                <Draggable id="draggable-1" />
                <Droppable id="droppable-1">
                <Show when={where() === "inside"}>
                    <Draggable id="draggble-1" />
                </Show>
                </Droppable>
            </DragDropSensors>
      </DragDropProvider>

    );
  };

  export default Sandbox;