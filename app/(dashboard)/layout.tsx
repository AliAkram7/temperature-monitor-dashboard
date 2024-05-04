import React, { ReactNode } from "react";
import { Header } from "../../component/navbar";
import { Container,  Flex,  } from "@mantine/core";
import { NavbarNested } from "../../component/sidbar";
import { redirect, usePathname } from "next/navigation";

import classes from "./layout.module.css";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {


  return (
    <>
      <div
        style={{
          zIndex : 'calc(var(--mantine-z-index-max) + 1)',
          position: "sticky",
          top: 0,
          backgroundColor : 'var(--mantine-color-default)'
        }}
      >
        <Header />
      </div>

      <Flex w={"100%"} justify={"space-between"}  >
        <div className={classes.sidbar}>
          <NavbarNested />
          
        </div>

        <Container fluid className={classes.pages}>
          <div style={{ marginTop: "40px" }}>
            {children}
          </div>
        </Container>
      </Flex>
    </>
  );
}
