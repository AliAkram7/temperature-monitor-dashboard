"use client";
import { Group, Burger, Title, Drawer, Text, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./navbar.module.css";
import { ScrollArea } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconUser,
  IconUsersGroup,
  IconCalendarMonth,
  IconSettings,
  IconLogout,
  IconDeviceWatch,
} from "@tabler/icons-react";
import { LinksGroup } from "../linkGroups";
import { ColorSchemeButton } from "../colorSchemeButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const pathname = usePathname();

  const leading =
    pathname.split("/")[1] !== "login" ? (
      <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
    ) : (
      <ColorSchemeButton />
    );

  return (
    <>
      <div className={classes.header}>
        <div className={classes.inner}>
          <Group align="center">
            {leading}
            <Title order={4}>Admin DashBoard</Title>
          </Group>
        </div>
      </div>

      {pathname.split("/")[1] !== "login" && (
        <Drawer withCloseButton={false} opened={opened} onClose={toggle}>
          <NavbarNested toggle={toggle} />
        </Drawer>
      )}
    </>
  );
}

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  { label: "Devices", icon: IconDeviceWatch, link: "/devices" },

];

export function NavbarNested({ toggle }: { toggle: () => void }) {

  const router = useRouter();

  const links = mockdata.map((item) => (
    <div
      key={item.label}
      onClick={() => {
        toggle();
      }}
    >
      <LinksGroup {...item} key={item.label} />
    </div>
  ));


    
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });


  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: "Sign-out",
      centered: true,
      children: <Text size="sm">Are you sure you want to sign-out?</Text>,
      labels: { confirm: "Sign-out", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm:  async () => {
        // await supabase.auth.signOut();
        router.refresh();
      },
    });

  return (
    <nav>
      <ScrollArea pt={"40px"}>
        <div>
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
    </nav>
  );
}
