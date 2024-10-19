// src/types/taskStatuses.ts
import { Item } from "@/components/common/drop_down_pill";
import Image from 'next/image';

export const statuses: Item[] = [
  {id: 1, title: "Backlog", image: <Image src={"/assets/icons/Backlog.svg"} alt="Backlog" width={14} height={14} />},
  {id: 2, title: "Todo", image: <Image src={"/assets/icons/Todo.svg"} alt="Todo" width={14} height={14} />},
  {id: 3, title: "InProgress", image: <Image src={"/assets/icons/InProgress.svg"} alt="InProgress" width={14} height={14} />},
  {id: 4, title: "Completed", image: <Image src={"/assets/icons/Completed.svg"} alt="Completed" width={14} height={14} />}
];