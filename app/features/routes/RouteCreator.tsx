// app/features/routes/RouteCreator.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Site, apiService, RouteRequest } from '@services/api';
import TimeSelector from '@components/ui/TimeSelector';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocation } from '@hooks/useLocation';

interface RouteCreatorProps {
    sites: Site[];
    onRouteCreated: (route: Site[]) => void;
}

export default function RouteCreator({ sites, onRouteCreated }: RouteCreatorProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [selectedSites, setSelectedSites] = useState<number[]>([]);
    const [isCreatingRoute, setIsCreatingRoute] = useState(false);
    const [showSiteSelector, setShowSiteSelector] = useState(false);
    const location = useLocation();

    const toggleSiteSelection = (siteId: number) => {
        if (selectedSites.includes(siteId)) {
            setSelectedSites(selectedSites.filter(id => id !== siteId));
        } else {
            setSelectedSites([...selectedSites, siteId]);
        }
    };

    const handleCreateRoute = async () => {
        if (selectedTime === null && selectedSites.length === 0) return;

        try {
            setIsCreatingRoute(true);

            const request: RouteRequest = {
                sites: selectedSites.length > 0 ? selectedSites : sites.map(site => site.id),
            };

            if (selectedTime) {
                request.availableTime = selectedTime;
            }

            if (location) {
                request.startingPoint = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
            }

            const routeSites = await apiService.generateRoute(request);
            onRouteCreated(routeSites);
            setShowModal(false);

        } catch (error) {
            console.error('Error creating route:', error);
        } finally {
            setIsCreatingRoute(false);
        }
    };

    return (
        <>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setShowModal(true)}
            >
                <FontAwesome5 name="route" size={24} color="white" />
            </TouchableOpacity>

            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Crea il tuo percorso</Text>

                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => setShowSiteSelector(!showSiteSelector)}
                        >
                            <Text style={styles.optionButtonText}>
                                {showSiteSelector ? 'Nascondi selezione luoghi' : 'Seleziona luoghi specifici'}
                            </Text>
                        </TouchableOpacity>

                        {showSiteSelector && (
                            <View style={styles.sitesContainer}>
                                {sites.map(site => (
                                    <TouchableOpacity
                                        key={site.id}
                                        style={[
                                            styles.siteItem,
                                            selectedSites.includes(site.id) && styles.selectedSiteItem
                                        ]}
                                        onPress={() => toggleSiteSelection(site.id)}
                                    >
                                        <Text style={[
                                            styles.siteItemText,
                                            selectedSites.includes(site.id) && styles.selectedSiteItemText
                                        ]}>
                                            {site.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <TimeSelector
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                        />

                        <TouchableOpacity
                            style={[
                                styles.createButton,
                                (selectedTime === null && selectedSites.length === 0) && styles.disabledButton
                            ]}
                            onPress={handleCreateRoute}
                            disabled={isCreatingRoute}
                        >
                            {isCreatingRoute ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.createButtonText}>Crea Percorso</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#2196F3',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    sitesContainer: {
        maxHeight: 200,
        marginBottom: 15,
        paddingVertical: 5,
    },
    siteItem: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        marginVertical: 5,
        borderRadius: 8,
    },
    selectedSiteItem: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196F3',
        borderWidth: 1,
    },
    siteItemText: {
        fontSize: 16,
    },
    selectedSiteItemText: {
        fontWeight: '500',
    },
    createButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});