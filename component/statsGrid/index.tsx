import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./statsGrid.module.css";
import { Sparkline } from "@mantine/charts";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};



type Props = {
  title: string;
  icon: React.ElementType;
  value: string;
  diff: number;
  data : number[]
};

export function StatsGrid({ diff, icon: IconComponent, data, title, value }: Props) {
  const stats = data.map((stat) => {});

  return (
    <Paper withBorder p="md" radius="md" key={title}>
      <Group justify="start">
        <IconComponent className={classes.icon} size="1.4rem" stroke={1.5} />

        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>
      </Group>

      <Group align="flex-end" justify="space-between" gap="xs" mt={8}>
        <Text className={classes.value}>{value}</Text>
        <Sparkline
          w={150}
          h={60}
          data={data}
          curveType="monotone"
          color="blue"
          fillOpacity={0.6}
          strokeWidth={2}
        />
      </Group>
    </Paper>
  );
}
