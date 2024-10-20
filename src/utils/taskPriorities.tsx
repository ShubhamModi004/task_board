// src/types/taskStatuses.ts
import { Item } from "@/components/common/drop_down_pill";
import Image from 'next/image';

export const priorities: Item[] = [
  {id: 1, title: "Priority", image: <Image src={"/assets/icons/Priority.svg"} alt="Priority" width={16} height={16} />},
  {id: 1, title: "Urgent", image: <Image src={"/assets/icons/Urgent.svg"} alt="Urgent" width={16} height={16} />},
  {id: 2, title: "High", image: <Image src={"/assets/icons/High.svg"} alt="High" width={16} height={16} />},
  {id: 3, title: "Medium", image: <Image src={"/assets/icons/Medium.svg"} alt="Medium" width={16} height={16} />},
  {id: 4, title: "Low", image: <Image src={"/assets/icons/Low.svg"} alt="Low" width={16} height={16} />}
];