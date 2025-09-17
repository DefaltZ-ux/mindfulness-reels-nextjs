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
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { EllipsisVertical } from "lucide-react";

export default function MenuDrawer() {
  // const isMobile = useIsMobile();

  function handleTouch(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <EllipsisVertical className="text-white -mb-1" />
        </DrawerTrigger>
        <DrawerOverlay onTouchStart={handleTouch}>
          <DrawerContent className="max-w-3xl mx-auto">
            <DrawerHeader>
              <DrawerTitle>Mindfulness</DrawerTitle>
              <DrawerDescription>Find your inner peace</DrawerDescription>
            </DrawerHeader>
            <div className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              maxime deleniti consequatur, iste ut ipsum dicta, sequi illum
              aliquam quaerat mollitia reprehenderit aliquid est repellendus
              nihil ipsa alias consectetur quisquam possimus? Sunt animi vero
              dicta culpa officia tempora adipisci eaque laboriosam deserunt,
              fuga sapiente? Aut, quam necessitatibus praesentium repellendus
              recusandae explicabo soluta delectus dicta deserunt, fugit error
              animi, hic magni! Debitis placeat vero odit molestias dolor magni,
              sint, minima quas, laboriosam ut nulla iure quis. Atque, alias
              eaque inventore id quas odit vero sunt omnis maiores voluptatem
              officia consequatur exercitationem quaerat velit doloremque quos
              illo tenetur fuga dignissimos reprehenderit necessitatibus.
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
