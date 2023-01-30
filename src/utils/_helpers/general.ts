import { EActions, IError, IHistory, ILocation } from "../../models";

export function generateError(message: string): IError {
  return {
    error: true,
    message,
  };
}

export function createAction(actionType: EActions, payload: any) {
  return { type: actionType, payload };
}

export function createLocationQuery(item: IHistory) {
  const { place_id, q } = item;
  return `/location/?place_id=${place_id}&q=${q}`;
}
export function createLocationQueryFromLocationItem(item: ILocation) {
  const { place_id, display_name } = item;
  const q = display_name.split(" ").join("+");
  return `/location/?place_id=${place_id}&q=${q}`;
}

export function createHistoryItem(item: ILocation): IHistory {
  const { place_id, display_name } = item;
  const q = display_name.split(" ").join("+");
  return {
    place_id: place_id.toString(),
    q,
    date_selected: new Date(),
  };
}

export function copyToClipBoard(text: string) {
  navigator.clipboard.writeText(text);
  return true;
}

export function share(link: string) {
  if (navigator.share) {
    navigator
      .share({
        title: "Location Stats",
        text: "",
        url: link,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
}
