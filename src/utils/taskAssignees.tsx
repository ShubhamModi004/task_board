import { Item } from "@/components/common/drop_down_pill";
import Image from 'next/image';

export const assignees: Item[] = [
  {id: 1, title: "Shubham", imageLink: "https://i.pravatar.cc/150?img=66", image: <Image src={"https://i.pravatar.cc/150?img=66"} alt="Shubham" width={16} height={16} className="avatar" />},
  {id: 2, title: "Tejas", imageLink: "https://i.pravatar.cc/150?img=67", image: <Image src={"https://i.pravatar.cc/150?img=67"} alt="Tejas" width={16} height={16} className="avatar" />},
  {id: 3, title: "Tanya", imageLink: "https://i.pravatar.cc/150?img=57", image: <Image src={"https://i.pravatar.cc/150?img=57"} alt="Tanya" width={16} height={16} className="avatar" />},
  {id: 4, title: "John", imageLink: "https://i.pravatar.cc/150?img=59", image: <Image src={"https://i.pravatar.cc/150?img=57"} alt="John" width={16} height={16} className="avatar" />},
  {id: 5, title: "Marry", imageLink: "https://i.pravatar.cc/150?img=59", image: <Image src={"https://i.pravatar.cc/150?img=48"} alt="Marry" width={16} height={16} className="avatar" />},
];