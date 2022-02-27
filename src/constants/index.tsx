type dataType = string | ArrayBufferLike | Blob | ArrayBufferView;

type sendFunction = (data: dataType) => void;

export type { dataType, sendFunction };
