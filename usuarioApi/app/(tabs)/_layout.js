import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import alta from "./alta";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="alta" options={{ title: "alta", tabBarIcon: ({ color, size }) => <Ionicons name="person-add" size={size} color={color} /> }} />
            <Tabs.Screen name="consulta" options={{ title: "consulta", tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> }} />
            <Tabs.Screen name="index" options={{ title: "inicio", href: null, tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
        </Tabs>
    );
}