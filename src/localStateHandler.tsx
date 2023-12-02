const localStorageKey = "pizonKtanton"; // Replace with a unique key for your app

export const addPeople = (peopleNames: string[]) => {
    const existingPeople = getPeople();
    const updatedPeople = [...existingPeople, ...peopleNames];
    localStorage.setItem(localStorageKey + "_people", JSON.stringify(updatedPeople));
};

export const getPeople = (): string[] => {
    const storedPeople = localStorage.getItem(localStorageKey + "_people");
    return storedPeople ? JSON.parse(storedPeople) : [];
};

export const removePerson = (personName: string) => {
    const existingPeople = getPeople();
    const updatedPeople = existingPeople.filter(person => person !== personName);
    localStorage.setItem(localStorageKey + "_people", JSON.stringify(updatedPeople));

    // Remove person from all places in the currentPlaceAndPeople dictionary
    const currentPlaceAndPeople = getCurrentPeopleAndPlaces();
    for (const place in currentPlaceAndPeople) {
        const updatedPeopleForPlace = currentPlaceAndPeople[place].filter(person => person !== personName);
        localStorage.setItem(localStorageKey + "_" + place, JSON.stringify(updatedPeopleForPlace));
    }
};

export const removeAllPeople = () => {
    localStorage.setItem(localStorageKey + "_people", JSON.stringify([]));
    const currentPlaceAndPeople = getCurrentPeopleAndPlaces();
    for (const place in currentPlaceAndPeople) {
        currentPlaceAndPeople[place] = [];
        localStorage.setItem(localStorageKey + "_" + place, JSON.stringify([]));
    };
}

export const removeAllPlaces = () => {
    localStorage.setItem(localStorageKey + "_places", JSON.stringify([]));
    const currentPlaceAndPeople = getCurrentPeopleAndPlaces();
    for (const place in currentPlaceAndPeople) {
        localStorage.removeItem(localStorageKey + "_" + place);
    }
}

export const addPlaces = (placeNames: string[]) => {
    placeNames.forEach(place => {
        localStorage.setItem(localStorageKey + "_" + place, JSON.stringify([]));
    });

    const existingPlaces = getPlaces();
    const updatedPlaces = [...existingPlaces, ...placeNames];
    localStorage.setItem(localStorageKey + "_places", JSON.stringify(updatedPlaces));
};

export const getPlaces = (): string[] => {
    const storedPlaces = localStorage.getItem(localStorageKey + "_places");
    return storedPlaces ? JSON.parse(storedPlaces) : [];
};

export const removePlace = (placeName: string) => {
    const existingPlaces = getPlaces();
    const updatedPlaces = existingPlaces.filter(place => place !== placeName);
    localStorage.setItem(localStorageKey + "_places", JSON.stringify(updatedPlaces));

    // Remove the place from the currentPlaceAndPeople dictionary
    const currentPlaceAndPeople = getCurrentPeopleAndPlaces();
    delete currentPlaceAndPeople[placeName];

    // Update the modified dictionary in localStorage
    for (const place in currentPlaceAndPeople) {
        localStorage.setItem(localStorageKey + "_" + place, JSON.stringify(currentPlaceAndPeople[place]));
    }
};

export const getCurrentPeopleAndPlaces = () => {
    const places = getPlaces();
    const result: { [key: string]: string[] } = {};

    places.forEach(place => {
        const peopleForPlace = JSON.parse(localStorage.getItem(localStorageKey + "_" + place) || "[]");
        result[place] = peopleForPlace;
    });

    return result;
};
export const resetPeopleAndPlaces = () => {
    const places = getPlaces();
    const result: { [key: string]: string[] } = {};

    places.forEach(place => {
        localStorage.setItem(localStorageKey + "_" + place, "[]");
        result[place] = [];
    });

    return result;
};
export const addPersonToPlace = (person: string, place: string) => {
    const currentPeopleForPlace = JSON.parse(localStorage.getItem(localStorageKey + "_" + place) || "[]");
    const updatedPeopleForPlace = [...currentPeopleForPlace, person];
    localStorage.setItem(localStorageKey + "_" + place, JSON.stringify(updatedPeopleForPlace));
};
export const removePersonFromPlace = (person: string, place: string) => {
    const currentPeopleForPlace = JSON.parse(localStorage.getItem(localStorageKey + "_" + place) || "[]");
    const updatedPeopleForPlace = currentPeopleForPlace.filter((existingPerson: string) => existingPerson !== person);
    localStorage.setItem(localStorageKey + "_" + place, JSON.stringify(updatedPeopleForPlace));
  };
  