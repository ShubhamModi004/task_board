import { Item } from "@/components/common/drop_down_pill";
import Image from "next/image";

export const projects: Item[] = [
  {
    id: 1,
    title: "Frontend",
    image: (
      <Image
        src={"/assets/icons/Frontend.svg"}
        alt="Frontend"
        width={16}
        height={16}
      />
    ),
  },
  {
    id: 2,
    title: "Cloud",
    image: (
      <Image
        src={"/assets/icons/Cloud.svg"}
        alt="Cloud"
        width={16}
        height={16}
      />
    ),
  },
  {
    id: 3,
    title: "Performance",
    image: (
      <Image
        src={"/assets/icons/Performance.svg"}
        alt="Performance"
        width={16}
        height={16}
      />
    ),
  },
  {
    id: 3,
    title: "Backend",
    image: (
      <Image
        src={"/assets/icons/Backend.svg"}
        alt="Backend"
        width={16}
        height={16}
      />
    ),
  },
  {
    id: 3,
    title: "Qa",
    image: (
      <Image src={"/assets/icons/Qa.webp"} alt="Qa" width={16} height={16} />
    ),
  },
];
