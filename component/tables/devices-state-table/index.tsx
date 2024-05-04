"use client";
import { useEffect, useState, useTransition } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Flex,
  ActionIcon,
  Badge,
  MantineStyleProps,
  LoadingOverlay,
  Drawer,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconX,
  IconEye,
} from "@tabler/icons-react";
import classes from "../table.module.css";

import Link from "next/link";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { useDisclosure, useForceUpdate } from "@mantine/hooks";
import { LineChart, Sparkline } from "@mantine/charts";
// import { LineChart } from "recharts";

type RowData = {
  device_id: string;
  device_name: string;
  x: number[];
};

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
  style?: MantineStyleProps;
}

function Th({ style, children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th} {...style}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

type Props = {
  data: RowData[];
};

export function DevicesStateTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const [sortedData, setSortedData] = useState(data);

  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const router = useRouter();

  const forceUpdate = useForceUpdate();

  const [pending, setTransition] = useTransition();

  useEffect(() => {
    if (!pending) setSortedData(data);
  }, [pending]);
  const [opened, { toggle }] = useDisclosure();

  const rows = sortedData.map((row) => {

    return (
      <Table.Tr key={row.device_id}>
        <Table.Td>
          <ActionIcon onClick={()=>{toggle()}} >
            <IconEye />
          </ActionIcon>
        </Table.Td>
        <Table.Td>
          <Text truncate="end"> {row.device_id} </Text>{" "}
        </Table.Td>
        <Table.Td>{row.device_name}</Table.Td>
        <Table.Td>{<SensorSimulation  initialData={row.x}  />}</Table.Td>
      </Table.Tr>
    );
  });


  return (
    <>
      <Drawer
        size={"lg"}
        position="right"
        zIndex={"99999"}
        opened={opened}
        onClose={toggle}
      >
        <SensorSimulationDetails />
      </Drawer>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea>
        <LoadingOverlay visible={pending}></LoadingOverlay>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w={"10%"} />
              <Th
                sorted={sortBy === "device_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("device_id")}
                style={{ w: "20%" }}
              >
                ID
              </Th>
              <Th
                sorted={sortBy === "device_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("device_name")}
                style={{ w: "20%" }}
              >
                device Name
              </Th>
              <Th
                reversed={reverseSortDirection}
                onSort={() => setSorting("x")}
                sorted={sortBy === "x"}
              >
                Subjects
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

function SensorSimulation  (  {initialData}: {initialData: number[]}) {
  const [data, setData] = useState<number[]>(initialData); // State to hold the sensor data

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random value (for demonstration)
      const newValue = Math.floor(Math.random() * 100000);


      // Update the data array by adding the new value
      setData((prevData) => [...prevData.slice(1), newValue]);
    }, 1000); // Update data every 1 second

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      {/* Render your Sparkline component with the generated data */}
      <Sparkline
        // w={300}
        h={60}
        data={data}
        curveType="linear"
        color="blue"
        fillOpacity={0.8}
        trendColors={{
          positive: "teal.6",
          negative: "red.6",
          neutral: "gray.5",
        }}
        strokeWidth={2}
      />
    </div>
  );
};
const Mockdata = [
  {
    date: "1",
    x: 2890,
  },
  {
    date: "2",
    x: 2756,
  },
  {
    date: "3",
    x: 3322,
  },
  {
    date: "4",
    x: 3470,
  },
  {
    date: "5",
    x: 3129,
  },
  {
    date: "6",
    x: 2890,
  },
  {
    date: "7",
    x: 3323,
  },
  {
    date: "8",
    x: 9281,
  },
  {
    date: "9",
    x: 2031,
  },
  {
    date: "10",
    x: 4043,
  },
];

function SensorSimulationDetails()  {

  const [data, setData] = useState<any[]>(Mockdata);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random value (for demonstration)
      const newValue = Math.floor(Math.random() * 10000);

      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedTime = `${minutes}min${seconds}s`;

      // Update the data array by adding the new value
      setData((prevData) => [
        ...prevData.slice(1),
        { date: formattedTime, x: newValue },
      ]);
    }, 1000); // Update data every 1 second

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      {/* Render your Sparkline component with the generated data */}
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[
          { name: "x", color: "indigo.6" },
        
        ]}
        curveType="linear"
      />
    </div>
  );
};
