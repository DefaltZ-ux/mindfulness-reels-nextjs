// import useIsMobile from "@/hooks/use-mobile";
import React from "react";

import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { EllipsisVertical } from "lucide-react";

export default function MenuDrawer() {
  // const isMobile = useIsMobile();

  return (
    <>
      <Drawer>
        <DrawerTrigger >
          <EllipsisVertical className="text-white -mb-1" />
        </DrawerTrigger>
        <DrawerContent className="max-w-3xl mx-auto">
          <DrawerHeader>
            <DrawerTitle>Mindfulness</DrawerTitle>
            <DrawerDescription>Find your inner peace</DrawerDescription>
          </DrawerHeader>
          <div className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa est
            iste aspernatur enim suscipit obcaecati totam repellendus quas et
            aliquid molestiae, iure amet libero debitis corrupti, illo corporis,
            ut natus impedit! Tempore quas fugiat nemo rerum corporis nisi
            incidunt provident accusamus! Ad fugit dicta vero quod placeat in
            distinctio consequatur?
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
