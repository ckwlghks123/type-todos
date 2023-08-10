declare interface Props {
  id: MutableRefObject<number>;
  todo: string;
}

declare interface handleProps extends Props {
  onDelete?: (id: number) => void;
  onModify?: (id: number, todoText: string) => void;
}
