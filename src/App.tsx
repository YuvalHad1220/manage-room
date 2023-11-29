import { createSignal, type Component } from "solid-js";

const App: Component = () => {
  type display = "MAIN" | "MODIFY_PEOPLE" | "MODIFY_PLACES";
  const [currentDisplayed, setCurrentDisplayed] = createSignal<display>("MAIN");


  const AddPeople = (
    <>
    <p class="text-lg">פיץ תוסיף רשימה של אנשים כשכל שם הוא שורה</p>
    </>
  )

  return (
    <div class="h-screen flex flex-col gap-3 p-3">
      <div class="grow bg-gray-700 rounded-2xl">
        {currentDisplayed() === "MODIFY_PEOPLE" && (
          AddPeople
        )}
      </div>
      <div class="flex gap-3 p-3 rounded-2xl bg-gray-700">
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MAIN" }}>מסך ראשי</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PLACES" }}>עריכת מקומות</button>
            <button classList={{grow: true, btn: true, "btn-primary": currentDisplayed() === "MODIFY_PEOPLE" }} onClick={() => setCurrentDisplayed("MODIFY_PEOPLE")}>עריכת סד"כ</button>
        </div>
    </div>
  );
};

export default App;
