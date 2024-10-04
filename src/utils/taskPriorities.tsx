// src/types/taskStatuses.ts
import { Item } from "@/components/common/drop_down_pill";
import Image from 'next/image';

export const priorities: Item[] = [
  {id: 1, title: "Priority", image: <Image src={"/assets/icons/Priority.webp"} alt="Priority" width={16} height={16} />},
  {id: 1, title: "Urgent", image: <Image src={"/assets/icons/Urgent.webp"} alt="Urgent" width={16} height={16} />},
  {id: 2, title: "High", image: <Image src={"/assets/icons/High.webp"} alt="High" width={16} height={16} />},
  {id: 3, title: "Medium", image: <Image src={"/assets/icons/Medium.webp"} alt="Medium" width={16} height={16} />},
  {id: 4, title: "Low", image: <Image src={"/assets/icons/Low.webp"} alt="Low" width={16} height={16} />}
];