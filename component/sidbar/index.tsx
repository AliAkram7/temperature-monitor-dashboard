"use client";

import { ScrollArea, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
  IconGauge,
  IconLogout,
  IconDeviceWatch,
} from "@tabler/icons-react";
import { LinksGroup } from "../linkGroups";
import classes from "./navbarnestd.module.css";
import { ColorSchemeButton } from "../colorSchemeButton";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  { label: "Devices", icon: IconDeviceWatch, link: "/devices" },

];

export function NavbarNested() {

  const router = useRouter();

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: "Sign-out",
      centered: true,
      children: <Text size="sm">Are you sure you want to sign-out?</Text>,
      labels: { confirm: "Sign-out", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        // await supabase.auth.signOut();
        router.refresh();
      },
    });




    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
      getInitialValueInEffect: true,
    });

  return (
    <>
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {links}
            <div onClick={openLogoutModal}>
              <LinksGroup {...{ label: "Logout", icon: IconLogout }} />
            </div>

            <div 
               onClick={() =>
                setColorScheme(computedColorScheme === "light" ? "dark" : "light")
              }
            >
              <LinksGroup {...{ label: "Theme", icon: ColorSchemeButton }} />
            </div>
          </div>
        </ScrollArea>

        <div className={classes.footer}></div>
      </nav>
    </>
  );
}
