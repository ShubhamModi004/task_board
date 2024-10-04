import { Item } from "@/components/common/drop_down_pill";
import Image from 'next/image';

export const assignees: Item[] = [
  {id: 1, title: "Shubham", image: <Image src={"https://i.pravatar.cc/150?img=66"} alt="Shubham" width={16} height={16} className="avatar" />},
  {id: 2, title: "Tejas", image: <Image src={"https://i.pravatar.cc/150?img=67"} alt="Tejas" width={16} height={16} className="avatar" />},
  {id: 3, title: "Tanya", image: <Image src={"https://i.pravatar.cc/150?img=57"} alt="Tanya" width={16} height={16} className="avatar" />},
];