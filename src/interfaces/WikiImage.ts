// interface for WikiImage
export default interface WikiImage {
  batchcomplete: string;
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        original: {
          source: string;
          width: number;
          height: number;
        };
        pageimage: string;
      };
    };
  };
}
