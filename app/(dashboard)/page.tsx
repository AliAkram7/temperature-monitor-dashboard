import React from "react";
import { StatsGrid } from "../../component/statsGrid";
import {
  Container,
  Grid,
  GridCol,
  SimpleGrid,
  Skeleton,
  rem,
} from "@mantine/core";
import { IconCoin, IconDiscount, IconReceipt } from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import { StatsControls } from "../../component/stateControle";

const data = [
  {
    title: "Revenue",
    icon: IconReceipt,
    value: "13,456",
    diff: 34,
    data: [10, 20, 40, 20, 40, 10, 50],
  },
  {
    title: "Profit",
    icon: IconCoin,
    value: "4,145",
    diff: -13,
    data: [10, 40, 40, 40, 70, 40, 50],
  },
  {
    title: "Coupons usage",
    icon: IconDiscount,
    value: "775",
    diff: 48,
    data: [40, 40, 70, 40, 70, 40, 50],
  },
];

const PRIMARY_COL_HEIGHT = rem(300);

export default async function DashboardPage() {
  const stats = data.map((stat) => {
    return (
      <StatsGrid
        key={stat.title}
        data={stat.data}
        diff={stat.diff}
        icon={stat.icon}
        title={stat.title}
        value={stat.value}
      />
    );
  });

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <div>
      <Container my={"lg"}>
        <SimpleGrid my={"lg"} cols={{ base: 1, xs: 2, md: 3 }}>
          {stats}
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <StatsControls />

          <LineChart
            h={350}
            data={Mockdata}
            dataKey="date"
            series={[
              { name: "Apples", color: "indigo.6" },
              { name: "Oranges", color: "blue.6" },
              { name: "Tomatoes", color: "teal.6" },
            ]}
            curveType="linear"
          />

          {/* <Skeleton height={PRIMARY_COL_HEIGHT}  animate={false} /> */}
        </SimpleGrid>
      </Container>
    </div>
  );
}

const Mockdata = [
  {
    date: "Mar 22",
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: "Mar 23",
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: "Mar 24",
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: "Mar 25",
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: "Mar 26",
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
