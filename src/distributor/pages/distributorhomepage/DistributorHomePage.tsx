import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  VStack,
  Spinner,
  Flex,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import SidebarDist from "../../components/sidebardis/SidebarDist";
import axios from "axios";
import DistributorMaps from "../../components/distributormaps/DistributorMaps";

// Define TypeScript types
export interface Distributor {
  _id: string;
  name: string;
  address: string;
  city: string;
  clientId: string;
  telephone: string;
  horaire: string[];
  __v: number;
}

export interface DistributorData {
  distributor: Distributor;
  coordinates: number[];
}

interface Pharmacy {
  _id: string;
  name: string;
  address: string;
  city: string;
  clientId: string;
  __v: number;
}

interface Distance {
  distance: string;
  duration: string;
}

export interface PharmacyData {
  pharmacy: Pharmacy;
  distance: Distance;
  coordinates: number[];
}

interface DistributorApiResponse {
  statusCode: number;
  message: string;
  data: {
    result: DistributorData;
  };
}

interface PharmacyApiResponse {
  statusCode: number;
  message: string;
  data: {
    result: PharmacyData[];
  };
}

const getToken = (): string | null => {
  return localStorage.getItem("tokenDistributor");
};

const DistributorHomePage: React.FC = () => {
  const [distributor, setDistributor] = useState<DistributorData | null>(null);
  const [pharmacies, setPharmacies] = useState<PharmacyData[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDistributor = async () => {
      const tokenDistributor = getToken();
      try {
        const response = await axios.get<DistributorApiResponse>(
          "http://172.201.204.133:3000/distributor",
          {
            headers: {
              Authorization: `Bearer ${tokenDistributor}`,
            },
          }
        );
        setDistributor(response.data.data.result);
        localStorage.setItem(
          "Distributor",
          JSON.stringify(response.data.data.result)
        );
      } catch (error) {
        console.error("Error fetching distributor data:", error);
      }
    };

    const fetchPharmacies = async () => {
      const tokenDistributor = getToken();
      try {
        const response = await axios.get<PharmacyApiResponse>(
          "http://172.201.204.133:3000/distributor/pharmacy",
          {
            headers: {
              Authorization: `Bearer ${tokenDistributor}`,
            },
          }
        );
        setPharmacies(response.data.data.result);
        localStorage.setItem(
          "Pharmacies",
          JSON.stringify(response.data.data.result)
        );
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
      }
    };

    const fetchData = async () => {
      await fetchDistributor();
      await fetchPharmacies();
      setLoading(false);
    };

    fetchData();

    const source = new EventSource("http://172.201.204.133:3000/order/sse");

    source.onmessage = function (event) {
      toast({
        title: "Success",
        description: "A new order has comming to you",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
    };

    source.onerror = function (error) {
      console.error("EventSource error:", error);
    };
  }, []);

  return (
    <Grid
      templateAreas={`
        "nav main"
      `}
      gridTemplateColumns="240px 1fr"
      h="100vh"
      w="98vw"
    >
      <GridItem area="nav">
        <SidebarDist children={undefined} />
      </GridItem>
      <GridItem area="main" ml="4" p="4">
        {!loading && distributor && pharmacies.length > 0 && (
          <DistributorMaps />
        )}
        <Box bg="white" p="6" rounded="md" shadow="md" mb="6">
          <Heading as="h2" size="lg">
            Distributor Information
          </Heading>
          {loading ? (
            <Flex justify="center" align="center" h="full">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack align="start" spacing="3">
              <br />
              <Text>
                <strong>Name:</strong> {distributor?.distributor.name}
              </Text>
              <Text>
                <strong>Address:</strong> {distributor?.distributor.address}
              </Text>
              <Text>
                <strong>City:</strong> {distributor?.distributor.city}
              </Text>
              <Text>
                <strong>Telephone:</strong> {distributor?.distributor.telephone}
              </Text>
              <Text>
                <strong>Working Hours:</strong>{" "}
                {distributor?.distributor.horaire.join(" - ")}
              </Text>
            </VStack>
          )}
        </Box>
        <Box bg="white" p="6" rounded="md" shadow="md">
          <Heading as="h3" size="lg" mb="4">
            Pharmacies
          </Heading>
          {loading ? (
            <Flex justify="center" align="center" h="full">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack align="start" spacing="4">
              {Array.isArray(pharmacies) &&
                pharmacies.map((pharmacyData) => (
                  <Box key={pharmacyData.pharmacy._id} w="full">
                    <HStack justify="space-between" w="full">
                      <VStack align="start" spacing="1">
                        <Text>
                          <strong>Name:</strong> {pharmacyData.pharmacy.name}
                        </Text>
                        <Text>
                          <strong>Address:</strong>{" "}
                          {pharmacyData.pharmacy.address}
                        </Text>
                        <Text>
                          <strong>City:</strong> {pharmacyData.pharmacy.city}
                        </Text>
                        <Text>
                          <strong>Distance:</strong>{" "}
                          {pharmacyData.distance.distance}
                        </Text>
                        <Text>
                          <strong>Duration:</strong>{" "}
                          {pharmacyData.distance.duration}
                        </Text>
                      </VStack>
                    </HStack>
                    <Divider my="4" />
                  </Box>
                ))}
            </VStack>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default DistributorHomePage;
