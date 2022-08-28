import {
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";

import {
  View,
  Text,
  Box,
  Button,
  AspectRatio,
  Center,
  HStack,
  VStack,
  Stack,
  Heading,
} from "native-base";

import { XCircle } from "phosphor-react-native";

import { useEffect, useState } from "react";

import Api from "../../services/Api";

import { ICharacter } from "../types";

const EmptyCharacter = {
  id: 0,
  episode: [],
  gender: "",
  image: "",
  location: {
    name: "",
  },
  name: "",
  species: "",
  status: "",
};

function RickComponent() {
  const [character, setCharacter] = useState<ICharacter[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacter>(EmptyCharacter);

  useEffect(() => {
    Api.get("character").then((res) => {
      setCharacter(res.data.results);
    });
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>
        <View
          mt={16}
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          {character?.map((item, index) => (
            <Pressable
              onPress={() => {
                setSelectedCharacter(item);
                setShowModal(true);
              }}
            >
              <Box alignItems="center" mb={8}>
                <Box
                  maxW={"92%"}
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                  }}
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                  key={index}
                >
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: item.image }}
                      />
                    </AspectRatio>
                    <Center
                      bg="primary.700"
                      _dark={{
                        bg: "primary.700",
                      }}
                      _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5"
                    >
                      {item.species}
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading
                        size="md"
                        ml="-1"
                        _dark={{
                          color: "primary.700",
                        }}
                      >
                        {item.name}
                      </Heading>
                    </Stack>

                    <HStack
                      alignItems="center"
                      space={4}
                      justifyContent="space-between"
                    >
                      <HStack alignItems="center">
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          fontWeight="400"
                        >
                          {item.gender}
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Modal animationType="fade" visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <HStack>
              <Button
                variant="unstyled"
                onPress={() => setShowModal(!showModal)}
              >
                <XCircle color="#C4C4CC" size={48} />
              </Button>
            </HStack>
            <View style={styles.contentContainer}>
              <Image
                style={{ width: "100%", height: 200, borderRadius: 4 }}
                source={{ uri: selectedCharacter.image }}
              />
              <Heading mt={8}>{selectedCharacter.name}</Heading>
              <HStack mt={8}>
                <Text fontSize="lg" bold>
                  Gender:
                </Text>
                <Text fontSize="lg">{selectedCharacter.gender}</Text>
              </HStack>
              <HStack>
                <Text fontSize="lg" bold>
                  Specie:
                </Text>
                <Text fontSize="lg">{selectedCharacter.species}</Text>
              </HStack>
              <HStack>
                <Text fontSize="lg" bold>
                  Status:
                </Text>
                <Text fontSize="lg">{selectedCharacter.status}</Text>
              </HStack>
              <HStack>
                <Text fontSize="lg" bold>
                  Location:
                </Text>
                <Text fontSize="lg">{selectedCharacter.location.name}</Text>
              </HStack>
              <HStack>
                <Text fontSize="lg" bold>
                  Quantity of Episodes:
                </Text>
                <Text fontSize="lg">{selectedCharacter.episode.length}</Text>
              </HStack>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  modal: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height - 100,
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 8,
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
});

export default RickComponent;
