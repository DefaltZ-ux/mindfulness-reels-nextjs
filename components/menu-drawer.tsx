import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
import { EllipsisVertical } from "lucide-react";
import {
  BellIcon,
  PaletteIcon,
  ShareIcon,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { handleShareWebsite } from "@/lib/share";

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: PaletteIcon,
      label: "Theme",
      href: "/theme",
      description: "Customize your experience",
    },
    {
      icon: BellIcon,
      label: "Notifications",
      href: "#",
      description: "Coming soon",
      disabled: true,
    },
    {
      icon: ShareIcon,
      label: "Share Us",
      href: "#",
      description: "Share our website",
      action: "share-website",
    },
  ];

  const handleMenuItemClick = (item: (typeof menuItems)[0]) => {
    if (item.action === "share-website") {
      handleShareWebsite()
    } else if (!item.disabled) {
      setOpen(false)
    }
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <EllipsisVertical className="text-white -mb-1.5" />
        </DrawerTrigger>

        <DrawerContent className="max-w-3xl mx-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isClickable =
                !item.disabled && (item.href !== "#" || item.action);

              return (
                <li key={item.label}>
                  {item.href !== "#" ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        "hover:bg-accent/50 group",
                        isActive && "bg-primary/10 text-primary",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      disabled={item.disabled}
                      onClick={() => handleMenuItemClick(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                        isClickable && "hover:bg-accent/50 group",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <DrawerFooter className="border-t">
            <p className="text-gray-400 text-sm text-center">
              <span>Made by </span>
              <Link href={"https://www.iamdipankarpaul.com/"}>Dipankar Paul</Link>
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
