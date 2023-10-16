import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Flex,
  Metric,
  BadgeDelta,
  ProgressBar,
} from "@tremor/react";
import axios from "axios";
import { useEffect } from "react";


export default function DashboardExample() {
  useEffect(() => {
    axios.get("http://localhost:5000/employee", {
      withCredentials: true,
    },).then((response) => console.log(response))
}, [])

  return (
    <main className="p-12">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28">
                  <Flex alignItems="start">
        <div>
          <Text>Employees</Text>
          <Metric>Number</Metric>
        </div>
        <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">Median Salary ($ 149,940)</Text>
        <Text>$ 220,500</Text>
      </Flex>
      {/* <ProgressBar value={15.9} className="mt-2" /> */}
                </div>
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
