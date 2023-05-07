export const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

export interface LocationReference {
  [key: string]: {
    name: string;
    des: string;
  };
}

export const locationReference: LocationReference = {
  AR: {
    name: "Adventure Ridge",
    des: "Thrilling rides and attractions for the adventurous at heart.",
  },
  FC: {
    name: "Fantasy Cove",
    des: "Immerse yourself in a world of fantasy and magic with enchanting rides and attractions.",
  },
  SF: {
    name: "Sci-Fi Frontier",
    des: "Blast off into the future with high-tech rides and attractions that will transport you to other worlds.",
  },
  WK: {
    name: "Wild Kingdom",
    des: "Get up close and personal with amazing animals and explore the wonders of nature with exciting rides and attractions.",
  },
};

type sourceTypeProp = {
    [key: string]: string;
};
export const typeReference: sourceTypeProp = {
  Att: "Attraction",
  Par: "Attraction",
  Shw: "Show",
  Sto: "Store",
  Tic: "Ticket",
};
