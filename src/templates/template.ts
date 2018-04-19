interface Colors {
  primary: string;
  foreground: string;
  background: string;
}

interface Rating {
  rating: number;
  url: string;
}

export type Template = (
  options: {
    intro: string;
    outro: string;
    question: string;
    colors: Colors;
    direction: string;
    left: 'left' | 'right';
    right: 'left' | 'right';
    unlikely: string;
    likely: string;
    ratings: Rating[];
    unsubscribeUrl: string;
    preview: boolean;
    showPoweredBy: boolean;
  }
) => string;
